# Staging branch

This branch is the sandbox for songcry.app. Every push here auto-deploys a full preview at:

  https://songcry-web-git-staging-tjsongcrys-projects.vercel.app

Nothing on this branch affects the live site. Publish = merge `staging` into `main`
(main auto-deploys production = songcry.app). Roll back = Vercel → Deployments → promote a
previous production deployment.
