# The `staging` branch

`staging` was the sandbox for songcry.app: every push to it deploys a preview at
https://songcry-web-git-staging-tjsongcrys-projects.vercel.app (public, noindex).

**Do not merge `staging` into `main`.** As of 2026-09-25 it is 25 commits ahead and 27 behind:
it carries concept pages (`/concepts/*`, `/review`) and lacks main's support page, CAPI,
delete-account and accessibility work. Merging it would ship the concepts and revert those.
Take anything you need from it by cherry-pick, in a PR, with TJ's yes.

Previews for real work come from ordinary PR branches off `main`.
