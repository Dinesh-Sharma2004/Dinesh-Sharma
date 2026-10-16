# Dinesh Sharma — Portfolio

AI Engineer & Data Scientist portfolio: a scroll-driven site with an interactive 3D character
(wears glasses and a beard; its head follows your cursor, it smiles more the further you scroll, then slides to the right and sits down at a desk).

**Stack:** Vite · React 18 · TypeScript · Three.js · GSAP (ScrollTrigger) · Lenis smooth-scroll · React Router

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build -> dist/
```

## Where things live

| What | Where |
| --- | --- |
| All content (about, projects, skills, contact links) | `src/config.ts` |
| 3D character scene (model, lighting, head tracking) | `src/components/Character/` |
| Mobile/tablet fallback (static SVG robot) | `src/components/Character/Robot.tsx` |
| Scroll choreography (slide right, camera, section timelines) | `src/components/utils/GsapScroll.ts` |
| Contact form + email function | `src/components/ContactForm.tsx`, `api/contact.js` |

## Contact form email

The form posts to `/api/contact` (a Vercel serverless function) which emails
`dineshsharma004785@gmail.com` through [Resend](https://resend.com). Until it is connected,
the form falls back to a `mailto:` link. To enable it, add these in
Vercel → Settings → Environment Variables (see `.env.example`):

- `RESEND_API_KEY` — your Resend API key
- `CONTACT_FROM` — optional verified sender, e.g. `Dinesh Sharma <hello@yourdomain.com>`

## Credits

The interaction model (smooth-scroll, scroll-driven character layout, split-text reveals,
custom cursor, horizontal work scroll) is adapted from the MIT-licensed
[portfolio-website](https://github.com/red1-for-hek/portfolio-website) by Redoyanul Haque
— see `LICENSE`. The 3D character model (`public/models/character.enc`, kept encrypted as in the reference) comes from that
repository; the content, layout mirroring and mobile fallback are this project's own.
