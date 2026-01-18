# Motionry

A curated collection of micro-animations for UI/UX designers and developers. Each animation comes with AI-friendly prompts for beginners and production-ready code for professionals.

![Motionry Preview](preview.png)

## ✨ Features

- **Dual Audience**: Beginner-friendly prompts + Pro-level code
- **Interactive Preview**: Hover to see animations in action
- **Customizable**: Real-time configuration with sliders
- **Copy & Go**: One-click copy for prompts or code
- **Searchable**: Find animations by name, description, or tags
- **Categorized**: Organized by component type

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/motionry.git

# Navigate to project
cd motionry

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the library.

## 📁 Project Structure

```
motionry/
├── src/
│   ├── app/                    # Next.js app router
│   ├── components/
│   │   ├── ui/                 # Website UI components
│   │   └── animations/         # Animation implementations
│   │       ├── buttons/
│   │       ├── loaders/
│   │       ├── inputs/
│   │       └── ...
│   ├── data/
│   │   └── animations.json     # Master data file
│   ├── lib/
│   │   ├── types.ts            # TypeScript definitions
│   │   └── utils.ts            # Utility functions
│   └── styles/
│       └── globals.css         # Global styles
├── public/                     # Static assets
└── package.json
```

## 🎨 Adding New Animations

### 1. Add to `animations.json`

```json
{
  "id": "your-animation-id",
  "name": "Your Animation Name",
  "category": "buttons",
  "description": "Brief description",
  "tags": ["hover", "playful"],
  "preview": {
    "trigger": "hover",
    "duration": 500
  },
  "config": {
    "stiffness": {
      "label": "Stiffness",
      "default": 400,
      "min": 100,
      "max": 1000,
      "step": 50
    }
  },
  "prompts": {
    "beginner": "Natural language description...",
    "pro": "Technical specifications..."
  },
  "code": {
    "framerMotion": "// Your code here"
  }
}
```

### 2. (Optional) Create dedicated component

For complex animations, create a component in `src/components/animations/[category]/`:

```tsx
// src/components/animations/buttons/YourAnimation.tsx
'use client';

import { motion } from 'framer-motion';

interface YourAnimationProps {
  stiffness?: number;
}

export function YourAnimation({ stiffness = 400 }: YourAnimationProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness }}
    >
      Click me
    </motion.button>
  );
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Language**: TypeScript
- **Hosting**: Cloudflare Pages

## 📦 Deployment

### Cloudflare Pages

```bash
# Build for production
npm run build

# Deploy with Wrangler
npx wrangler pages deploy out
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-animation`)
3. Add your animation to `animations.json`
4. Test locally with `npm run dev`
5. Commit your changes (`git commit -m 'Add amazing animation'`)
6. Push to the branch (`git push origin feature/amazing-animation`)
7. Open a Pull Request

## 📝 License

MIT License - feel free to use these animations in your projects!

## 💜 Credits

Made with love for the design community.
