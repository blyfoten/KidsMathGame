---
name: add-component
description: Add a new React component following this project's conventions
---

Add a new component: $ARGUMENTS

1. Read an existing component (e.g. `src/components/Game.tsx`) to understand the patterns: Tailwind classes, `useUser()` hook usage, React Router navigation, TypeScript prop types
2. Create `src/components/<ComponentName>.tsx` following the same conventions
3. If routing is needed, add the route in `App.tsx`
4. If new user state is needed, extend `UserContext.tsx` — add to the profile type and provider
5. Run `npm run lint` and `npm run build` to verify no type errors
