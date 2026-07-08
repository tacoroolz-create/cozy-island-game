# Cozy Island Game — project rules

- **Finished work ALWAYS lands on main.** When a task is done, merge it into
  main — local and origin — without asking. Never end a session with work
  stranded on a branch or sitting in an unmerged PR.
- If the session type forbids direct merges (background jobs), push the branch
  and open a PR: `.github/workflows/automerge.yml` merges every PR into main
  automatically. Draft PRs are auto-readied and merged too.
- Only a PR title starting with `WIP` escapes the auto-merge.
- After anything lands on origin/main, also update the local main checkout
  (`git pull` in the main working copy) so Charles sees it in-browser
  immediately.
- Charles verifies changes in-browser himself — don't launch the game to
  self-verify, just report what changed.
