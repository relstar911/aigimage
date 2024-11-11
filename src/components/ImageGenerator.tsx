import React, { useState, useCallback } from 'react';
import { AlertCircle, Loader, Upload } from 'lucide-react';
import { generateImage } from '../services/api';
import { useImageStore } from '../store/useImageStore';
import { toast } from 'react-hot-toast';
import AdvancedSettings from './AdvancedSettings';
import MultiPromptInput from './MultiPromptInput';
import { DEFAULT_SETTINGS } from '../constants';
import { ImageSettings, TextPrompt } from '../types';

export function ImageGenerator() {
  const [prompts, setPrompts] = useState<TextPrompt[]>([{ text: '', weight: 1 }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<ImageSettings>({ ...DEFAULT_SETTINGS });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [initImage, setInitImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const addImage = useImageStore((state) => state.addImage);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024 * 10) { // 10MB limit
      toast.error('Image must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setInitImage(base64);
      // Reset file input
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompts[0].text.trim() && settings.mode === 'text-to-image') return;
    if ((settings.mode === 'image-to-image' || settings.mode === 'upscale') && !initImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateImage({
        prompts: settings.mode === 'upscale' ? [] : prompts.filter(p => p.text.trim()),
        settings,
        initImage
      });

      if (result.artifacts?.[0]?.base64) {
        const imageData = `data:image/png;base64,${result.artifacts[0].base64}`;
        setGeneratedImage(imageData);
        
        addImage({
          id: Date.now().toString(),
          url: imageData,
          prompt: prompts.map(p => `${p.text} (${p.weight})`).join(' | '),
          timestamp: Date.now(),
          settings
        });

        toast.success('Image generated successfully!');
        
        // Reset form for next generation
        if (settings.mode !== 'text-to-image') {
          setInitImage(null);
        }
      } else {
        throw new Error('No image was generated');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate image';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidInput = settings.mode === 'text-to-image' 
    ? prompts.some(p => p.text.trim())
    : !!initImage;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <AdvancedSettings
                settings={settings}
                onSettingsChange={setSettings}
                isOpen={showAdvanced}
                onToggle={() => setShowAdvanced(!showAdvanced)}
              />

              {settings.mode !== 'upscale' && (
                <MultiPromptInput
                  prompts={prompts}
                  onChange={setPrompts}
                  disabled={isLoading}
                />
              )}

              {(settings.mode === 'image-to-image' || settings.mode === 'upscale') && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {initImage ? 'Change Image' : 'Upload Image'}
                    </label>
                    {initImage && (
                      <div className="relative">
                        <img
                          src={initImage}
                          alt="Initial"
                          className="h-12 w-12 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => setInitImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !isValidInput}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Image'
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="aspect-square w-full relative bg-gray-50 rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Generated image will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}