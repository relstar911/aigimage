import { GenerationResponse } from '../types';

const API_KEY = import.meta.env.VITE_STABILITY_API_KEY;
const API_HOST = 'https://api.stability.ai';

export async function generateImage(params: {
  prompts: { text: string; weight: number }[];
  cfg_scale: number;
  height?: number;
  width?: number;
  steps: number;
  style_preset?: string;
  seed?: number;
}): Promise<GenerationResponse> {
  try {
    const response = await fetch(
      `${API_HOST}/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: params.prompts,
          cfg_scale: params.cfg_scale,
          height: params.height || 1024,
          width: params.width || 1024,
          steps: params.steps,
          style_preset: params.style_preset,
          seed: params.seed,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate image');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Generation error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during image generation');
  }
}