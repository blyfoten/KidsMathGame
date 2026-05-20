# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See @AGENTS.md for architecture, stack, commands, and known stubs.

## Coding rules

**Think first.** Before coding, state your assumptions. When a request is ambiguous, present interpretations. Push back when a simpler approach exists.

**Minimum code.** Write only what solves the stated problem. No speculative features, no abstractions beyond what is needed, no error handling for scenarios that cannot happen.

**Surgical edits.** Change only what was asked. Do not refactor adjacent code or improve unrelated sections. Match the existing style. Remove only imports/functions that *your* changes made unused — not pre-existing dead code.

**Verify before finishing.** After edits, run `npm run lint` and `npm run build`. For UI changes, start `npm run dev` and visually confirm the golden path.

## Compaction instructions

When compacting, always preserve: the current task goal, the list of modified files, and any unresolved lint or build errors.
