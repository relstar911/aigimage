## AI Image Generator Project Setup Guide

### Project Overview
This is a React-based AI image generation application using the Stability AI API. It supports:
- Text-to-Image generation
- Image-to-Image transformation
- Image upscaling
- Multi-prompt support with weights
- Image gallery with local storage
- Advanced generation settings
- Multiple style presets

### Quick Setup

1. **Create New Project**
```bash
npm create vite@latest . -- --template react-ts
```

2. **Required Dependencies**
Update `package.json` with these dependencies:
```json
{
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.4.1",
    "zustand": "^4.5.2"
  }
}
```

3. **Environment Setup**
Create `.env` file in project root:
```
VITE_STABILITY_API_KEY=your_stability_api_key_here
```

### Project Structure

```
src/
├── components/
│   ├── AdvancedSettings.tsx    # Generation settings controls
│   ├── ImageCard.tsx           # Individual image display component
│   ├── ImageGallery.tsx        # Gallery of generated images
│   ├── ImageGenerator.tsx      # Main generation form
│   ├── MultiPromptInput.tsx    # Multiple prompt input interface
│   └── PromptInput.tsx         # Single prompt input component
├── config/
│   └── env.ts                  # Environment configuration
├── services/
│   └── api.ts                  # Stability AI API integration
├── store/
│   └── useImageStore.ts        # Zustand state management
├── utils/
│   ├── api.ts                  # API utilities
│   ├── dateUtils.ts            # Date formatting
│   └── downloadUtils.ts        # Image download functionality
├── types.ts                    # TypeScript type definitions
└── constants.ts                # Application constants
```

### Key Features Implementation

1. **Image Generation Modes**
- Text-to-Image: Direct prompt to image generation
- Image-to-Image: Transform uploaded images
- Upscaling: Enhance image resolution

2. **Advanced Settings**
- CFG Scale (0-35)
- Steps (10-150)
- Style Presets
- Seed control
- Image strength for Image-to-Image

3. **Multi-Prompt System**
- Support for up to 5 prompts
- Weight control (-10 to 10)
- Positive/negative prompt influence

4. **Storage System**
- Local storage with size limits
- Image history management
- Automatic cleanup of old images

### API Integration Notes

1. **Endpoints Used**
- Text-to-Image: `/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`
- Image-to-Image: `/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image`
- Upscale: `/v2beta/stable-image/upscale/{mode}`

2. **Image Processing**
- Max upload size: 10MB
- Supported formats: PNG, JPEG
- Base64 handling for uploads

### Troubleshooting

1. **Common Issues**
- Storage quota exceeded: Clear local storage or reduce image quality
- API key issues: Verify .env file setup
- Upload failures: Check image size and format

2. **Performance Optimization**
- Image lazy loading
- Local storage management
- Request debouncing

### Development Tips

1. **State Management**
- Use Zustand for global state
- Implement proper error handling
- Maintain loading states

2. **UI/UX Considerations**
- Responsive design
- Loading indicators
- Error feedback
- Toast notifications

3. **Best Practices**
- Type safety with TypeScript
- Component modularity
- Proper error handling
- Loading state management

### Style Customization

The project uses Tailwind CSS for styling. Main style classes are defined in:
- `src/index.css`
- Component-specific styles
- Utility classes for common patterns

### Future Enhancements

1. **Potential Features**
- Batch processing
- Advanced image editing
- Style transfer
- Custom style presets
- Social sharing

2. **Performance Improvements**
- Image compression
- Caching strategies
- Progressive loading

Remember to always check the [Stability AI API documentation](https://platform.stability.ai/docs/api-reference) for the latest updates and features.