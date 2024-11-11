## AI Image Generator

A powerful React-based application for generating, transforming, and upscaling images using Stability AI's API.

![AI Image Generator](https://images.unsplash.com/photo-1675271591211-126ef0182f55?q=80&w=2000&auto=format&fit=crop)

### Features

- 🎨 Multiple Generation Modes:
  - Text-to-Image
  - Image-to-Image transformation
  - Image upscaling
- 🎯 Advanced Controls:
  - Multi-prompt support with weights
  - Style presets
  - Fine-tuned generation parameters
- 📱 Modern UI:
  - Responsive design
  - Real-time preview
  - Image gallery
- 💾 Local Storage:
  - Automatic image saving
  - History management
  - Download capabilities

### Quick Start

1. Clone and install:
```bash
git clone <repository-url>
cd ai-image-generator
npm install
```

2. Set up environment:
Create a `.env` file:
```env
VITE_STABILITY_API_KEY=your_stability_api_key_here
```

3. Run development server:
```bash
npm run dev
```

### Usage

1. **Text to Image**
   - Enter your prompt
   - Adjust settings (optional)
   - Click "Generate"

2. **Image to Image**
   - Upload an image
   - Add transformation prompts
   - Adjust image strength
   - Generate

3. **Upscaling**
   - Upload an image
   - Select upscaling mode
   - Process image

### Advanced Features

1. **Multi-Prompt System**
   - Add up to 5 prompts
   - Control weights (-10 to 10)
   - Combine positive and negative prompts

2. **Style Presets**
   - 3D Model
   - Analog Film
   - Anime
   - Cinematic
   - Comic Book
   - Digital Art
   - And more...

3. **Fine Controls**
   - CFG Scale (0-35)
   - Steps (10-150)
   - Seed control
   - Image strength

### Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Stability AI API

### Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### License

MIT License - see [LICENSE](LICENSE)