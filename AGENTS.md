# AGENTS.md

Universal project context for all AI coding agents (Claude Code, Copilot CLI, Gemini CLI, Codex, etc.).

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

No test framework configured. Verify correctness by running `npm run build` and `npm run lint`.

## Stack

React 18 + TypeScript (strict) + Vite + Tailwind CSS + React Router v6 + Howler.js + Lucide React

## Architecture

**Routing:** `App.tsx` defines three routes: `/login`, `/game`, `/store`.

**State:** One React Context at `src/contexts/UserContext.tsx` holds the entire user profile — `username`, `language` (en/sv), `character` (wizard/knight/fairy), `difficulty` (easy/medium/hard), `score` (coins). Login writes; Game and Store read.

**Game flow:** `Login.tsx` collects the profile and navigates to `/game`. `Game.tsx` generates addition questions (numbers 1–10), runs a 10-second countdown, scores answers (base 10 pts + time bonus), and supports voice input via the Web Speech API (language: `sv-SE` or `en-US` from context).

**Audio:** `src/utils/audio.ts` wraps Howler.js. All audio URLs are placeholders pointing to `example.com`.

**TypeScript config:** `tsconfig.json` uses project references — `tsconfig.app.json` for `src/`, `tsconfig.node.json` for the Vite config.

## Known stubs (incomplete features)

- Store purchases use `alert()` — not implemented
- `difficulty` in context is unused in question generation (always 1–10)
- Audio URLs need real asset files
- `Game.tsx` uses `eval()` for expression evaluation — replace before production
