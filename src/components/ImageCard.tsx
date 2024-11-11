import React, { useState } from 'react';
import { Download, Trash2, Loader2, Settings } from 'lucide-react';
import { GeneratedImage } from '../types';
import { formatDate } from '../utils/dateUtils';
import { downloadImage } from '../utils/downloadUtils';
import { toast } from 'react-hot-toast';
import { STYLE_PRESETS } from '../constants';

interface ImageCardProps {
  image: GeneratedImage;
  onDelete: (id: string) => void;
}

export default function ImageCard({ image, onDelete }: ImageCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    const toastId = toast.loading('Preparing download...');
    
    try {
      const filename = `ai-image-${image.id}-${Date.now()}.png`;
      await downloadImage(image.url, filename);
      toast.success('Image downloaded successfully!', { id: toastId });
    } catch (error) {
      toast.error('Download failed. Please try again.', { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  const getStylePresetLabel = (value?: string) => {
    if (!value) return null;
    return STYLE_PRESETS.find(preset => preset.value === value)?.label;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}
        <img
          src={image.url}
          alt={image.prompt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsImageLoading(false)}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">{formatDate(image.timestamp)}</p>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 text-gray-500 hover:text-gray-700 rounded-full"
            title="Toggle settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-sm text-gray-800 line-clamp-2">{image.prompt}</p>
        
        {showSettings && image.settings && (
          <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs text-gray-600 space-y-1">
            {image.settings.stylePreset && (
              <p>Style: {getStylePresetLabel(image.settings.stylePreset)}</p>
            )}
            <p>CFG Scale: {image.settings.cfgScale}</p>
            <p>Steps: {image.settings.steps}</p>
            {image.settings.seed && <p>Seed: {image.settings.seed}</p>}
          </div>
        )}

        <div className="mt-3 flex justify-end space-x-2">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download image"
          >
            {isDownloading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => onDelete(image.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Delete image"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}