# Deploy to Vercel: checklist

Nothing here has been done; it needs your Vercel account and a domain decision.

## Before the first deploy
- [ ] Replace every `TODO` in `content/content.ts` (the site shows each one in dashed underline) and add screenshots and the real portrait.
- [x] Resume PDF is in `public/` (`Devansh-Singha-Resume.pdf`) and `resumeUrl` points to it. Note the PDF itself contains a phone number and street address, and its summary mentions one specific employer; replace the file with an updated resume (same name) when ready.
- [ ] Decide on `/lab` and `/styleguide`: they are `noindex` and blocked in `robots.txt`, but you can also delete `app/lab` and `app/styleguide` before launch.
- [ ] Pick the domain (the plan suggests checking `devanshsingha.dev` or similar) and confirm it is free.

## Deploy
1. Push the repo to GitHub and import it in Vercel (framework preset: Next.js, defaults are fine).
2. Environment variable: `NEXT_PUBLIC_SITE_URL` = the final public address, no trailing slash (see `.env.example`). It feeds canonical URLs, the sitemap and social cards.
3. Enable Vercel Analytics for the project (the `<Analytics />` component is already in `app/layout.tsx`; it does nothing off Vercel).
4. Add the custom domain in Vercel, then set the DNS records Vercel shows. Wait for the certificate.
5. Redeploy once the domain is live so the sitemap and social cards use it.

## After
- [ ] Open the live URL on a phone and a laptop; check the loader, the shoji transitions and the resume download.
- [ ] Paste the URL into a social card debugger to check the Open Graph image.
- [ ] Run Lighthouse (mobile) on the live URL. Local production-build result at the time of writing: Performance 92, Accessibility 100, Best Practices 100, SEO 100; LCP 2.8 s (the title card is an intentional 1.8 s minimum).
- [ ] Link the site from LinkedIn and from the resume, then post (draft in `docs/linkedin-post.md`).
