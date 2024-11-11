export interface GenerationResponse {
  artifacts?: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
  error?: {
    message: string;
    code: string;
  };
}

export interface ImageData {
  id: string;
  base64: string;
  prompt: string;
  createdAt: string;
}