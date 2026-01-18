# Motionry - Project Documentation

## 📋 Tổng quan

**Motionry** là một thư viện micro-animations cho UI/UX, cung cấp:
- Animation previews tương tác
- Prompt cho beginners (ngôn ngữ tự nhiên)
- Code cho pros (Framer Motion / CSS)
- Configurator để customize animation

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

**Repository:** https://github.com/samantha-blablabla/motionry

---

## 📁 Cấu trúc Project

```
motionry/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout với font Inter
│   │   └── page.tsx            # Trang chính với state management
│   │
│   ├── components/
│   │   ├── animations/         # Animation components
│   │   │   ├── buttons/
│   │   │   │   ├── JellyBounce.tsx
│   │   │   │   ├── ShimmerStroke.tsx
│   │   │   │   └── MagneticHover.tsx
│   │   │   ├── cards/
│   │   │   │   └── CardSwipe.tsx
│   │   │   ├── inputs/
│   │   │   │   └── SearchExpand.tsx
│   │   │   ├── loaders/
│   │   │   │   └── ProgressFill.tsx
│   │   │   ├── text/
│   │   │   │   └── TextPop.tsx
│   │   │   ├── toasts/
│   │   │   │   └── ToastSlide.tsx
│   │   │   └── tooltips/
│   │   │       ├── DelayedTooltip.tsx
│   │   │       └── NameTagReveal.tsx
│   │   │
│   │   └── ui/                 # Website UI components
│   │       ├── AnimationCard.tsx
│   │       ├── AnimationGrid.tsx
│   │       ├── AnimationModal.tsx
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── index.ts
│   │
│   ├── data/
│   │   └── animations.json     # Master data file
│   │
│   ├── lib/
│   │   ├── types.ts            # TypeScript definitions
│   │   └── utils.ts            # Utility functions
│   │
│   ├── registry/
│   │   └── index.ts            # Animation component registry
│   │
│   └── styles/
│       └── globals.css         # Global styles + custom utilities
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## 🎨 10 Animations đã implement

| # | ID | Name | Category | Mô tả |
|---|-----|------|----------|-------|
| 1 | `jelly-bounce` | Jelly Bounce | Buttons | Spring bounce effect khi hover |
| 2 | `shimmer-stroke` | Shimmer Stroke | Buttons | Rotating gradient border |
| 3 | `magnetic-hover` | Magnetic Hover | Buttons | Button follows cursor |
| 4 | `toast-slide` | Toast Slide | Toasts | Slide in/out notifications |
| 5 | `search-expand` | Search Expand | Inputs | Expanding search input |
| 6 | `progress-fill` | Progress Fill | Loaders | Animated progress bar + shimmer |
| 7 | `tooltip-delayed` | Delayed Tooltip | Tooltips | Tooltip với hover delay |
| 8 | `card-swipe` | Card Swipe | Cards | Tinder-style swipe gesture |
| 9 | `text-pop` | Text Pop | Text | Per-character hover effect |
| 10 | `name-tag-reveal` | Name Tag Reveal | Tooltips | Avatar hover reveal name |

---

## ✅ Các tính năng đã hoàn thành

### Core Features
- [x] Project skeleton với Next.js + Tailwind + Framer Motion
- [x] Animation registry system
- [x] Master data file (animations.json)
- [x] TypeScript types đầy đủ

### UI Components
- [x] Sidebar với category navigation
- [x] Animation count badges cho mỗi category
- [x] Header với search bar
- [x] Animation cards với hover preview
- [x] Animation modal với tabs Beginner/Pro
- [x] Configurator sliders trong modal

### UX Improvements (Session 1-5)
- [x] Fix modal click-through issue
- [x] Animation count trong sidebar
- [x] Card hover glow effect
- [x] "All Animations" count badge
- [x] Shimmer stroke always visible
- [x] Keyboard shortcut "/" để focus search
- [x] Escape để clear search
- [x] Copy button animation feedback
- [x] Copy button tooltip
- [x] Modal navigation với Arrow keys ← →
- [x] Navigation buttons kiểu lightbox (2 bên modal)
- [x] Code block styling
- [x] Line numbers cho code
- [x] Badge hiển thị loại code (Framer Motion/CSS)

---

## 📝 TODO - Chưa hoàn thành

### High Priority
- [ ] Responsive mobile layout
- [ ] Mobile sidebar (hamburger menu)
- [ ] Hero/Landing page

### Medium Priority
- [ ] Thêm animations từ video reference:
  - [ ] Keyboard shortcuts indicator
  - [ ] More button hover effects
  - [ ] Gradient/glow buttons
- [ ] Dark/Light mode toggle
- [ ] Configurator cải tiến (color picker, more options)

### Low Priority
- [ ] Animation categories icons đẹp hơn
- [ ] Share animation link
- [ ] Favorites/bookmark system
- [ ] Search với filters (by tag, by type)
- [ ] Export code với custom config values
- [ ] i18n (Vietnamese support)

---

## 🔧 Cách thêm Animation mới

### Bước 1: Thêm data vào `animations.json`

```json
{
  "id": "new-animation-id",
  "name": "New Animation Name",
  "category": "buttons",
  "description": "Mô tả ngắn về animation",
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
    "beginner": "Mô tả bằng ngôn ngữ tự nhiên...",
    "pro": "Technical specifications..."
  },
  "code": {
    "framerMotion": "// Code here"
  }
}
```

### Bước 2: Tạo component trong `src/components/animations/[category]/`

```tsx
'use client';

import { motion } from 'framer-motion';

interface NewAnimationProps {
  stiffness?: number;
}

export function NewAnimation({ stiffness = 400 }: NewAnimationProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness }}
    >
      Hover me
    </motion.button>
  );
}
```

### Bước 3: Đăng ký trong `src/registry/index.ts`

```tsx
import { NewAnimation } from '@/components/animations/buttons/NewAnimation';

export const animationRegistry: AnimationRegistry = {
  // ... existing
  'new-animation-id': NewAnimation,
};
```

---

## 🎯 Design Tokens

### Colors (trong `tailwind.config.ts`)

```ts
colors: {
  surface: {
    DEFAULT: '#0a0a0b',      // Background chính
    raised: '#141416',        // Card background
    overlay: '#1c1c1f',       // Modal overlay
    border: '#2a2a2e',        // Border color
  },
  accent: {
    DEFAULT: '#6366f1',       // Primary accent (indigo)
    hover: '#818cf8',         // Hover state
    muted: '#4f46e5',         // Muted variant
    glow: 'rgba(99, 102, 241, 0.15)',
  },
  text: {
    primary: '#fafafa',       // Main text
    secondary: '#a1a1aa',     // Secondary text
    muted: '#71717a',         // Muted text
  }
}
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `Escape` | Clear search / Close modal |
| `←` | Previous animation (trong modal) |
| `→` | Next animation (trong modal) |

---

## 🚀 Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

---

## 📚 Resources & References

- **Video Reference:** https://youtu.be/ld1zhQMXxXU
- **Framer Motion Docs:** https://www.framer.com/motion/
- **Tailwind CSS:** https://tailwindcss.com/
- **Lucide Icons:** https://lucide.dev/

---

## 🤝 Workflow với AI

### Claude.ai (Planning & Design)
- Lên kế hoạch features
- Thiết kế architecture
- Code review & suggestions
- Documentation

### Claude Code / Antigravity (Implementation)
- Tạo/sửa files trực tiếp
- Chạy commands
- Git operations

### Format instruction cho Claude Code:
```
Mở file [đường dẫn file]

Tìm:
[code cũ]

Thay bằng:
[code mới]
```

---

## 📅 Changelog

### v0.1.0 (Initial)
- Project skeleton
- 10 animation components
- Basic UI (Sidebar, Grid, Modal)
- Animation registry system

### v0.2.0 (UX Improvements)
- Animation counts trong sidebar
- Card hover glow
- Keyboard shortcuts
- Modal navigation
- Code display improvements

---

*Last updated: Session 5*
