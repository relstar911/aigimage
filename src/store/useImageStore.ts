import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GeneratedImage, StoreState } from '../types';

const MAX_STORAGE_SIZE = 4.5 * 1024 * 1024; // 4.5MB limit for localStorage
const MAX_IMAGES = 10;
const STORE_VERSION = 1;

interface ImageStore {
  version: number;
  images: GeneratedImage[];
  addImage: (image: GeneratedImage) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
}

const migrate = (state: any): StoreState => {
  if (!state.version) {
    return {
      version: STORE_VERSION,
      images: state.images || [],
    };
  }
  return state as StoreState;
};

export const useImageStore = create<ImageStore>()(
  persist(
    (set) => ({
      version: STORE_VERSION,
      images: [],
      addImage: (newImage) =>
        set((state) => {
          const images = [newImage, ...state.images];
          while (images.length > MAX_IMAGES) {
            images.pop();
          }
          return { images };
        }),
      removeImage: (id) =>
        set((state) => ({
          images: state.images.filter((image) => image.id !== id),
        })),
      clearImages: () => set({ images: [], version: STORE_VERSION }),
    }),
    {
      name: 'image-storage',
      version: STORE_VERSION,
      migrate,
      storage: {
        getItem: (name) => {
          try {
            const str = localStorage.getItem(name);
            if (!str) return null;
            return JSON.parse(str);
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            const str = JSON.stringify(value);
            if (str.length > MAX_STORAGE_SIZE) {
              throw new Error('Storage quota exceeded');
            }
            localStorage.setItem(name, str);
          } catch {
            // If storage fails, clear old data
            localStorage.removeItem(name);
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);