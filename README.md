# PaletteForge

A minimal web app for identifying the dominant colour in an image. Upload any image file and instantly get its dominant colour displayed by name, with hex, RGB, and OKLCH values ready to copy.

## Features

- Upload a local image file (JPEG, PNG, WebP, GIF, BMP)
- Identifies the dominant colour using [ColorThief](https://github.com/nicktesla/color-thief)
- Resolves the nearest human-readable colour name from a library of 30,000+ named colours
- Displays the colour as a full-bleed card with automatic light/dark text contrast
- One-click copying of hex, RGB, and OKLCH values
- Uploaded image becomes the full-page background

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool and dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) — accessible component primitives
- [ColorThief](https://lokeshdhakar.com/projects/color-thief/) — dominant colour extraction
- [color-name-list](https://github.com/meodai/color-names) + [nearest-color](https://github.com/dtao/nearest-color) — colour name resolution
- [Lucide React](https://lucide.dev/) — icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The output is written to `dist/`.

### Preview the production build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx                              # Root component — image processing logic and state
├── main.tsx                             # React entry point
├── global.d.ts                          # Global type declarations
├── components/
│   ├── layout/
│   │   ├── ImageSelectionWindow.tsx     # File upload form
│   │   ├── ImageViewerWindow.tsx        # Dominant colour display card
│   │   └── CopyButton.tsx              # Copy-to-clipboard button with confirmation state
│   └── ui/                              # shadcn/ui primitive components
├── lib/
│   └── utils.ts                         # cn() class merging helper
└── styles/
    └── index.css                        # Global styles and Tailwind theme tokens
```

## Usage

1. Click **Load Image** and select an image file from your computer.
2. The dominant colour is displayed as a full card — name, hex, RGB, and OKLCH values shown.
3. Click the copy icon next to any value to copy it to the clipboard.
4. Click **Change Image** to start over with a new file.

## Linting

```bash
npm run lint
```
