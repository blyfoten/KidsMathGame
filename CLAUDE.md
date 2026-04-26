# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

There is no test framework configured.

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + React Router v6

**Routing (App.tsx):** Three routes — `/login`, `/game`, `/store` — rendered by their respective components in `src/components/`.

**State:** A single React Context (`src/contexts/UserContext.tsx`) holds the entire user profile: `username`, `language` (en/sv), `character` (wizard/knight/fairy), `difficulty` (easy/medium/hard), and `score` (coins). Login writes to it; Game and Store read from it.

**Game flow:** `Login.tsx` collects the profile and navigates to `/game`. `Game.tsx` generates addition questions (numbers 1–10, difficulty not yet wired into range), runs a 10-second countdown, scores answers (base 10 pts + time bonus), and supports voice input via the browser's Web Speech API (language set from context: `sv-SE` or `en-US`).

**Audio:** `src/utils/audio.ts` wraps Howler.js. Audio file URLs are currently placeholders (`example.com`).

**Known stubs:** Store purchases trigger a plain `alert()`. Difficulty level is stored in context but not used in question generation. Audio URLs need real assets.

**TypeScript config:** Strict mode on; `tsconfig.json` uses project references (`tsconfig.app.json` for src, `tsconfig.node.json` for Vite config).
