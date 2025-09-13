# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"火曜日のおフロ" (Tuesday's Ofuro) is a Next.js-based podcast and blog website featuring a weekly frontend discussion show. The site includes podcast episode listings, YouTube video integration, a blog section, and interactive features like a floating audio player.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run tsc` - Run TypeScript compiler
- `npm run prettier` - Format code with Prettier
- `npm run fix` - Run TypeScript check and linting together

## Architecture

### Framework & Stack
- **Next.js** with Pages Router (not App Router)
- **TypeScript** with strict mode enabled
- **Tailwind CSS** with DaisyUI components
- **React Context** for state management (CustomFont, FloatingPlayArea)

### Directory Structure
```
pages/           # Next.js pages (using Pages Router)
├── api/         # API routes for podcast data
├── blog/        # Blog posts with dynamic routing
├── member/      # Member pages
├── showcase/    # Showcase page
├── game/        # Game section
└── fortune-telling/ # Fortune telling features

components/      # React components organized by atomic design
├── atoms/       # Basic UI elements (Button, Input, etc.)
├── molecules/   # Composed components (HeaderNav, BlogListItem, etc.)
└── organisms/   # Complex components (Header, Footer, FloatingPlayArea)

lib/            # Utility functions
├── api.ts      # Blog post management (markdown processing)
├── date.ts     # Date utilities
└── markdownToHtml.ts # Markdown conversion

types/          # TypeScript type definitions
context/        # React Context providers
posts/          # Markdown blog posts
styles/         # Global CSS and component styles
```

### Key Features
1. **Podcast Integration**: Fetches and displays podcast episodes with audio playback
2. **YouTube Integration**: Displays YouTube videos alongside podcast content
3. **Floating Audio Player**: Persistent audio player that works across page navigation
4. **Blog System**: Markdown-based blog with recursive directory structure support
5. **Theme System**: Light/dark mode toggle with DaisyUI themes

### Data Types
- `PodcastEpisode`: Podcast data with iTunes metadata
- `YouTubeEpisode`: YouTube video data
- `Post`: Blog post with slug-based routing

### State Management
- **CustomFontStateProvider**: Manages font preferences
- **FloatingPlayAreaStateProvider**: Controls floating audio player state across pages

### Content Management
Blog posts are stored as Markdown files in the `posts/` directory with frontmatter support. The `lib/api.ts` handles recursive directory traversal and date-based sorting.

### Styling
Uses Tailwind CSS with DaisyUI component library. Custom themes defined in `tailwind.config.js` with light, dark, and retro variants.
- やりとりは日本語で。コメントも日本語で。