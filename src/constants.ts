import { ImageSettings } from './types';

export const STYLE_PRESETS = [
  { value: '3d-model', label: '3D Model' },
  { value: 'analog-film', label: 'Analog Film' },
  { value: 'anime', label: 'Anime' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'comic-book', label: 'Comic Book' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'enhance', label: 'Enhance' },
  { value: 'fantasy-art', label: 'Fantasy Art' },
  { value: 'isometric', label: 'Isometric' },
  { value: 'line-art', label: 'Line Art' },
  { value: 'low-poly', label: 'Low Poly' },
  { value: 'neon-punk', label: 'Neon Punk' },
  { value: 'origami', label: 'Origami' },
  { value: 'photographic', label: 'Photographic' },
  { value: 'pixel-art', label: 'Pixel Art' },
  { value: 'tile-texture', label: 'Tile Texture' },
];

export const UPSCALE_MODES = [
  { value: 'fast', label: 'Fast (2x)' },
  { value: 'creative', label: 'Creative (2x)' },
  { value: 'conservative', label: 'Conservative (2x)' }
];

export const DEFAULT_SETTINGS: ImageSettings = {
  cfgScale: 7,
  steps: 30,
  samples: 1,
  mode: 'text-to-image',
  upscaleMode: 'fast'
};

export const GENERATION_MODES = [
  { value: 'text-to-image', label: 'Text to Image' },
  { value: 'image-to-image', label: 'Image to Image' },
  { value: 'upscale', label: 'Upscale Image' },
];

export const PROMPT_SUGGESTIONS = [
  "A serene Japanese garden with cherry blossoms",
  "Futuristic cityscape at sunset",
  "Magical forest with glowing mushrooms",
  "Abstract geometric patterns in vibrant colors",
  "Underwater scene with bioluminescent creatures"
];