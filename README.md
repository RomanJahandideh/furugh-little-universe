# Forough Mahmoudpour: Retail Sales Associate

A simple, retail-styled personal site for Forough Mahmoudpour, focused on finding a sales associate role in Canada.

- **`/`: sales profile (main page).** A full-screen WELCOME on the first visit of a session, then a cinematic hero photo followed by About, Experience, Education, Skills, Next role, Nail art and Contact sections.
- **`/nails/`: nail art.** 60 original designs in a clean grid with style and color filters, a swipeable detail view, and an inquiry section. Reached from the "My nail art" button.

Live: https://furugh.com (custom domain on GitHub Pages; DNS at Namecheap)

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Motion for React. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. Motion is deliberately calm: fade-up reveals, a slow push-in on the hero photo, and gentle parallax. `prefers-reduced-motion` turns it all off and skips the welcome screen.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm start          # serve out/ locally
```

## Where to edit things

| What | File |
| --- | --- |
| Contact email, phone, LinkedIn, résumé, city, university, store name | `src/data/site-config.ts` |
| All words on the sales page | `src/data/profile.ts` |
| Nail design titles, styles, colors, order | `src/data/artworks.ts` |
| Style and color filter names | `src/data/taxonomy.ts` |

## Changing the hero photo

```bash
python scripts/process_portrait.py "C:/path/to/photo.HEIC"
```

This writes a wide (desktop) and a tall (phone) crop with a gentle cinematic grade to `public/images/profile/`. It prints the blur previews; paste them into `src/data/portrait.ts`. For a different photo, adjust `WIDE_BOX` / `TALL_BOX` at the top of the script. Then run `python scripts/make_og.py` to refresh the social-share images.

## Adding nail photos

1. Run `pip install pillow pillow-heif` once, then `npm run images -- "C:/path/to/photo-folder"`. This writes color-accurate WebP files to `public/images/nails/` and updates `src/data/artwork-images.json`.
2. The script prints a ready-to-paste line for every photo without details. Add those lines to `src/data/artworks.ts` and fill them in. Photos without details still appear, as "Untitled".

## Résumé and contact form

- The résumé PDF lives at `public/resume/Forough_Mahmoudpour_Resume.pdf` and can be downloaded from the hero, Experience, the summary, Contact and the footer. To update it, replace the file (same name) and make `src/data/profile.ts` match.
- The contact forms (sales page and nail page) send messages to `furughmp77@gmail.com` through [FormSubmit](https://formsubmit.co). **One-time setup:** the first message anyone sends triggers an activation email from FormSubmit to that inbox. Forough must click **Activate Form** in it (check Spam too). Messages are only delivered after that. FormSubmit then shows a random alias; put it in `contactForm.formAlias` in `src/data/site-config.ts` to keep the address out of the page source.
- If sending ever fails, the form says so and shows her email address, so no message is silently lost.

## Still optional (`src/data/site-config.ts`)

| Item | Until it's added |
| --- | --- |
| LinkedIn / profile URL | Not shown |
| Instagram, booking link for nails | Nail inquiries use the contact form only |

All sales-page wording follows her résumé. Don't add facts the résumé doesn't state.
