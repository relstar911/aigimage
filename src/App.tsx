import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGenerator } from './components/ImageGenerator';
import ImageGallery from './components/ImageGallery';
import { Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Image Generator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-12">
          <ImageGenerator />
          <ImageGallery />
        </div>
      </main>
    </div>
  );
}

export default App;