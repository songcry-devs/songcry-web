# Cutover Runbook — Framer → Vercel for `songcry.app`

**Status: ✅ PERFORMED 2026-08-17.** TJ made the GoDaddy edit (apex A 31.43.161.6/31.43.160.6 → single A 76.76.21.21; www CNAME sites.framer.app → A 76.76.21.21; TTL 600; nothing else touched — verified by zone-export diff). Gotcha hit: Vercel did not auto-issue the TLS cert (~25 min HTTPS down while port 80 served) — fixed instantly with `vercel certs issue songcry.app www.songcry.app`. Full route + content verification passed same day (all routes 200, misspelled slug 301s, 2026-08-13 legal docs live, false-GPS sentence gone). Rollback window: keep Framer published until ~2026-09-01. Original runbook below kept for the record. This flips `songcry.app` from the live Framer site to this Vercel project (`songcry-web`, Vercel project `prj_d5MbiXQnkuBX5NUU3GoBDl01E7Zd`).

Pre-req: the `feat/framer-clone-cutover` branch is reviewed and merged to `main` (Vercel auto-deploys `main` to production), and the production deploy has been smoke-tested at all three breakpoints (see Phase 7.1 preview validation + `docs/parity-report.md`).

## 0. Before the flip
- [ ] Confirm parity sign-off on `docs/parity-report.md` (all flagged items accepted or fixed).
- [ ] **Freeze the Framer site** — do not edit it after this point, or parity drifts.
- [ ] Note the current Framer DNS records (so rollback is exact). Record the existing `A` / `CNAME` for `songcry.app` and `www` as they point to Framer today.
- [ ] Confirm the latest `main` production deploy on Vercel is green and renders correctly on its `*.vercel.app` URL.

## 1. Add the domain in Vercel
- [ ] Vercel → project `songcry-web` → **Settings → Domains** → add `songcry.app` (and `www.songcry.app`).
- [ ] Vercel will show the required DNS target(s). Typically:
  - Apex `songcry.app`: an `A` record to Vercel's anycast IP **`76.76.21.21`** (Vercel shows the exact value), or an `ALIAS`/`ANAME` to `cname.vercel-dns.com` if the registrar supports apex flattening.
  - `www.songcry.app`: a `CNAME` to **`cname.vercel-dns.com`**.
- [ ] Decide the redirect direction (apex ↔ www) in Vercel's domain settings to match the current canonical (`https://songcry.app/`, apex).

## 2. Update DNS at the registrar
- [ ] At the DNS provider for `songcry.app`, **lower the TTL** on the records to be changed (e.g. 300s) a few hours ahead, so the cutover propagates fast and rollback is quick.
- [ ] Replace the Framer records with the Vercel targets from step 1:
  - `songcry.app` → Vercel apex `A` (or ALIAS) value.
  - `www.songcry.app` → `CNAME cname.vercel-dns.com`.
- [ ] Keep any unrelated records (MX/email, TXT/SPF/DKIM, verification) untouched.

## 3. Verify
- [ ] In Vercel Domains, wait for `songcry.app` and `www` to show **Valid Configuration** (DNS + TLS issued).
- [ ] `dig songcry.app +short` resolves to the Vercel target; `curl -sI https://songcry.app` returns `200` from Vercel (check the `server` / `x-vercel-id` headers).
- [ ] Smoke-test live: `/`, `/artist`, the 3 legal pages, the `/tiktok` `/youtube` `/x` redirects, `/legal/community-guidlines` → `/legal/community-guidelines`, favicon, OG image — at Desktop / Tablet / Phone.

## 4. Rollback (if needed)
- [ ] Revert the `songcry.app` / `www` DNS records to the Framer values recorded in step 0. With the lowered TTL, propagation back to Framer is quick.
- [ ] (Optional) Remove the domain from the Vercel project to avoid conflicting validation.

## Notes
- TLS certificates are issued automatically by Vercel once DNS validates — no manual cert step.
- The DNS change is the only user-facing switch; the Vercel deploy itself is already live on its `*.vercel.app` URL beforehand, so there is no build/deploy risk at flip time.
