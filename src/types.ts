export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  settings?: ImageSettings;
}

export interface StoreState {
  version: number;
  images: GeneratedImage[];
}

export type UpscaleMode = 'fast' | 'creative' | 'conservative';

export interface ImageSettings {
  stylePreset?: string;
  cfgScale: number;
  steps: number;
  seed?: number;
  samples: number;
  imageStrength?: number;
  mode: 'text-to-image' | 'image-to-image' | 'upscale';
  upscaleMode?: UpscaleMode;
}

export interface TextPrompt {
  text: string;
  weight?: number;
}

export interface GenerateImageParams {
  prompts: TextPrompt[];
  settings: ImageSettings;
  initImage?: string;
}

export interface ApiResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}