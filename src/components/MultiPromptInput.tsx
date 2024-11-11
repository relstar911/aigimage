import React from 'react';
import { TextPrompt } from '../types';
import { Plus, Minus, AlertCircle } from 'lucide-react';

interface MultiPromptInputProps {
  prompts: TextPrompt[];
  onChange: (prompts: TextPrompt[]) => void;
  disabled?: boolean;
}

const MultiPromptInput: React.FC<MultiPromptInputProps> = ({
  prompts,
  onChange,
  disabled,
}) => {
  const addPrompt = () => {
    onChange([...prompts, { text: '', weight: 1 }]);
  };

  const removePrompt = (index: number) => {
    onChange(prompts.filter((_, i) => i !== index));
  };

  const updatePrompt = (index: number, text: string, weight?: number) => {
    const newPrompts = [...prompts];
    newPrompts[index] = { ...newPrompts[index], text, weight };
    onChange(newPrompts);
  };

  return (
    <div className="space-y-3">
      {prompts.map((prompt, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex-grow">
            <textarea
              value={prompt.text}
              onChange={(e) => updatePrompt(index, e.target.value, prompt.weight)}
              placeholder={index === 0 ? "Enter your main prompt here..." : `Additional prompt ${index + 1}`}
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none h-20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                type="number"
                value={prompt.weight}
                onChange={(e) =>
                  updatePrompt(index, prompt.text, parseFloat(e.target.value) || 1)
                }
                min="-10"
                max="10"
                step="0.1"
                disabled={disabled}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                title="Prompt weight (-10 to 10)"
              />
              <div className="absolute -top-8 left-0 w-full">
                <span className="text-xs text-gray-500">Weight</span>
              </div>
            </div>
            {prompts.length > 1 && (
              <button
                type="button"
                onClick={() => removePrompt(index)}
                disabled={disabled}
                className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Remove prompt"
              >
                <Minus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
      
      {prompts.length < 5 && (
        <button
          type="button"
          onClick={addPrompt}
          disabled={disabled}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Prompt
        </button>
      )}

      {prompts.length > 1 && (
        <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            Use weights to control the influence of each prompt. Positive values (0 to 10) enhance the prompt's presence, 
            while negative values (-10 to 0) reduce or avoid certain elements.
          </p>
        </div>
      )}
    </div>
  );
};

export default MultiPromptInput;