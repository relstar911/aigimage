import { ApiResponse, GenerateImageParams, UpscaleMode } from '../types';
import { env } from '../config/env';

const API_HOST = 'https://api.stability.ai';

const ENDPOINTS = {
  textToImage: '/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
  imageToImage: '/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image',
  upscaleFast: '/v2beta/stable-image/upscale/fast',
  upscaleCreative: '/v2beta/stable-image/upscale/creative',
  upscaleConservative: '/v2beta/stable-image/upscale/conservative'
};

export async function generateImage({ prompts, settings, initImage }: GenerateImageParams): Promise<ApiResponse> {
  if (!env.STABILITY_API_KEY) {
    throw new Error('API key is required');
  }

  const endpoint = getEndpoint(settings.mode, settings.upscaleMode);
  
  try {
    let response;
    
    if (settings.mode === 'upscale') {
      // Handle upscale request separately
      const formData = new FormData();
      const imageBlob = await base64ToBlob(initImage!);
      formData.append('image', imageBlob);
      
      response = await fetch(`${API_HOST}${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.STABILITY_API_KEY}`,
          Accept: 'image/png',
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Upscale failed' }));
        throw new Error(error.message || 'Failed to upscale image');
      }

      // For upscale, we get the image data directly
      const resultBlob = await response.blob();
      const base64Data = await blobToBase64(resultBlob);
      
      return {
        artifacts: [{
          base64: base64Data.split(',')[1], // Remove data URL prefix
          seed: 0,
          finishReason: 'SUCCESS'
        }]
      };
    } else if (settings.mode === 'text-to-image') {
      response = await fetch(`${API_HOST}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.STABILITY_API_KEY}`,
          Accept: 'application/json',
        },
        body: JSON.stringify(createTextToImageBody(prompts, settings)),
      });
    } else {
      // Image-to-image request
      const formData = new FormData();
      const imageBlob = await base64ToBlob(initImage!);
      formData.append('init_image', imageBlob);
      formData.append('image_strength', (settings.imageStrength || 0.35).toString());
      prompts.forEach((prompt, index) => {
        formData.append(`text_prompts[${index}][text]`, prompt.text);
        formData.append(`text_prompts[${index}][weight]`, (prompt.weight || 1).toString());
      });
      formData.append('cfg_scale', settings.cfgScale.toString());
      formData.append('steps', settings.steps.toString());
      if (settings.seed) formData.append('seed', settings.seed.toString());
      if (settings.stylePreset) formData.append('style_preset', settings.stylePreset);
      
      response = await fetch(`${API_HOST}${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.STABILITY_API_KEY}`,
          Accept: 'application/json',
        },
        body: formData,
      });
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate image');
    }

    // For non-upscale requests, we expect JSON response
    if (settings.mode !== 'upscale') {
      return await response.json();
    }
    
    throw new Error('Unexpected code path');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

function getEndpoint(mode: string, upscaleMode?: UpscaleMode): string {
  switch (mode) {
    case 'image-to-image':
      return ENDPOINTS.imageToImage;
    case 'upscale':
      switch (upscaleMode) {
        case 'creative':
          return ENDPOINTS.upscaleCreative;
        case 'conservative':
          return ENDPOINTS.upscaleConservative;
        default:
          return ENDPOINTS.upscaleFast;
      }
    default:
      return ENDPOINTS.textToImage;
  }
}

function createTextToImageBody(prompts: any[], settings: any) {
  return {
    text_prompts: prompts,
    cfg_scale: settings.cfgScale,
    height: 1024,
    width: 1024,
    steps: settings.steps,
    seed: settings.seed,
    samples: settings.samples,
    style_preset: settings.stylePreset,
  };
}

async function base64ToBlob(base64String: string): Promise<Blob> {
  const base64Data = base64String.includes('base64,') 
    ? base64String.split('base64,')[1] 
    : base64String;
    
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: 'image/png' });
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}