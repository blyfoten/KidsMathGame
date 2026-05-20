---
name: fix-issue
description: Fetch a GitHub issue, implement a fix, verify it, and open a PR
disable-model-invocation: true
---

Fix GitHub issue: $ARGUMENTS

1. Use `mcp__github__issue_read` to fetch the issue details from `blyfoten/kidsmathgame`
2. Understand the problem; search the codebase for relevant files
3. Check @AGENTS.md for architecture context before touching any file
4. Implement the fix — surgical changes only, no unrelated cleanup
5. Run `npm run lint` and `npm run build`; fix any errors
6. Commit with a descriptive message referencing the issue number
7. Push to `claude/fix-issue-$ARGUMENTS` and create a PR via `mcp__github__create_pull_request`
