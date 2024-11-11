interface EnvConfig {
  STABILITY_API_KEY: string;
}

export const env: EnvConfig = {
  STABILITY_API_KEY: import.meta.env.VITE_STABILITY_API_KEY || '',
};