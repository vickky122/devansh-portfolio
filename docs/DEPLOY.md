# Deploy to Vercel: checklist

Status: the repo is on GitHub (private) at `vickky122/devansh-portfolio`, and Vercel (your Hobby account,
"Vikrant Yadav's projects") already sees it on https://vercel.com/new. **Nothing is deployed yet.** Verified in
the Vercel UI: it auto-detects the **Next.js** preset, root directory `./`, branch `main`, and needs no build
settings changes.

## 1. First deploy (about 2 minutes)
1. Open https://vercel.com/new, find `devansh-portfolio` under "Import Git Repository", press **Import**.
2. Leave Project Name, Root Directory (`./`), Application Preset (Next.js) and Build settings as they are.
3. Press **Deploy**. When it finishes, Vercel shows the live address, normally `https://devansh-portfolio.vercel.app`
   (it adds a suffix if that name is taken).

## 2. Tell the site its own address (important, do right after the first deploy)
Without this, the sitemap, canonical URL, Open Graph card and structured data all point at `http://localhost:3000`.
1. Vercel, Project, **Settings, Environment Variables**: add `NEXT_PUBLIC_SITE_URL` = the live address from step 1
   (no trailing slash), for Production (and Preview if you like).
2. **Redeploy** (Deployments, the latest one, Redeploy). `NEXT_PUBLIC_*` values are baked in at build time, so a
   redeploy is required for the change to take effect.

## 3. Custom domain (optional, can come later)
1. Pick a domain (the plan suggests checking `devanshsingha.dev` or similar) and buy it from any registrar.
2. Vercel, Project, **Settings, Domains**: add it and set the DNS records Vercel shows. Wait for the certificate.
3. Change `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy once more.

## Things to decide first
- [ ] **Resume PDF:** `public/Devansh-Singha-Resume.pdf` is in the repo and will be public once deployed
  (anyone can open `/Devansh-Singha-Resume.pdf`). It contains a phone number and street address, and its summary
  names one employer. Replace it with an updated resume (same filename) before or right after launch if that matters.
- [ ] **Repo visibility:** the GitHub repo is private. Vercel deploys from private repos fine. Do not make the repo
  public without first removing the resume PDF from the git history.
- [ ] **`/lab` and `/styleguide`:** internal pages. They are `noindex` and blocked in `robots.txt`, but they will be
  reachable by URL; delete `app/lab` and `app/styleguide` before launch if you prefer.
- [ ] **TODO text:** anything still marked TODO in `content/content.ts` shows on the live site as a dashed "TODO".
- [ ] **Hobby plan:** Vercel's free Hobby plan is for personal, non-commercial use, which a personal portfolio is.

## After the first deploy
- [ ] Open the live address on a phone and a laptop; check the loader, the shoji transitions, the resume download.
- [ ] Vercel Analytics: the `<Analytics />` component is already in `app/layout.tsx`; turn it on under the project's
  **Analytics** tab to see visits.
- [ ] Paste the URL into a social-card checker to see the Open Graph image.
- [ ] Run Lighthouse (mobile) on the live URL. Local production-build result: Performance 91 to 92, Accessibility 100,
  Best Practices 96 to 100, SEO 100; LCP 2.8 s (the title card has an intentional 1.8 s minimum).
- [ ] Link the site from LinkedIn and from the resume, then post (draft in `docs/linkedin-post.md`).
