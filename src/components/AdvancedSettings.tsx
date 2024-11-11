import React from 'react';
import { ImageSettings, UpscaleMode } from '../types';
import { STYLE_PRESETS, DEFAULT_SETTINGS, GENERATION_MODES, UPSCALE_MODES } from '../constants';

interface AdvancedSettingsProps {
  settings: ImageSettings;
  onSettingsChange: (settings: ImageSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
}) => {
  const handleReset = () => {
    onSettingsChange({ ...DEFAULT_SETTINGS });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onToggle}
        className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
      >
        {isOpen ? '- Hide' : '+ Show'} Advanced Settings
      </button>

      {isOpen && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Generation Mode
              </label>
              <select
                value={settings.mode}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    mode: e.target.value as ImageSettings['mode'],
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {GENERATION_MODES.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

            {settings.mode === 'upscale' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upscale Mode
                </label>
                <select
                  value={settings.upscaleMode || 'fast'}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      upscaleMode: e.target.value as UpscaleMode,
                    })
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {UPSCALE_MODES.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {settings.mode !== 'upscale' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Style Preset
                  </label>
                  <select
                    value={settings.stylePreset || ''}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        stylePreset: e.target.value || undefined,
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">None</option>
                    {STYLE_PRESETS.map((preset) => (
                      <option key={preset.value} value={preset.value}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CFG Scale ({settings.cfgScale})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="35"
                    value={settings.cfgScale}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        cfgScale: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Steps ({settings.steps})
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    value={settings.steps}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        steps: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                {settings.mode === 'image-to-image' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Strength ({settings.imageStrength || 0.35})
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={settings.imageStrength || 0.35}
                      onChange={(e) =>
                        onSettingsChange({
                          ...settings,
                          imageStrength: parseFloat(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seed (optional)
                  </label>
                  <input
                    type="number"
                    value={settings.seed || ''}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        seed: e.target.value ? parseInt(e.target.value) : undefined,
                      })
                    }
                    placeholder="Random"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;