# Elicere

A minimal web app for extracting dominant colour palettes from images. Upload any image file and instantly get a 5-colour palette with one-click hex code copying.

## Features

- Upload a local image file (JPEG, PNG, WebP, etc.)
- Extracts a 5-colour dominant palette using [ColorThief](https://github.com/nicktesla/color-thief)
- Click any colour tile to copy its hex code to the clipboard
- Automatic light/dark text contrast on each tile
- Clean, responsive layout

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool and dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) — accessible component primitives
- [ColorThief](https://lokeshdhakar.com/projects/color-thief/) — colour palette extraction
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
├── App.tsx                          # Root component — image processing logic and state
├── main.tsx                         # React entry point
├── components/
│   ├── layout/
│   │   ├── ImageSelection.tsx       # File upload form
│   │   ├── ImageViewer.tsx          # Image preview and palette display
│   │   ├── ColorChart.tsx           # Palette grid container
│   │   └── ColorTile.tsx            # Individual colour tile with copy-to-clipboard
│   └── ui/                          # shadcn/ui primitive components
├── lib/
│   └── utils.ts                     # cn() class merging helper
└── styles/
    └── index.css                    # Global styles and Tailwind theme tokens
```

## Usage

1. Click **Load Image** and select an image file from your computer.
2. The image will be displayed along with its 5 dominant colours.
3. Click any colour tile to copy its hex code to the clipboard.
4. Click **Change Image** to start over with a new file.

## Linting

```bash
npm run lint
```
