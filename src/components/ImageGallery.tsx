import React from 'react';
import { Trash2 } from 'lucide-react';
import { useImageStore } from '../store/useImageStore';
import { formatDate } from '../utils/dateUtils';

const ImageGallery: React.FC = () => {
  const { images, removeImage } = useImageStore();

  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>No images generated yet. Try creating one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative aspect-square">
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <button
              onClick={() => removeImage(image.id)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              title="Delete image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-2">
              {formatDate(image.timestamp)}
            </p>
            <p className="text-sm text-gray-800 line-clamp-2">{image.prompt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;