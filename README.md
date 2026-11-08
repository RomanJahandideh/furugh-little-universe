# Furugh: Retail Sales Associate

A simple, retail-styled personal site for Furugh, focused on finding a sales associate role in Canada.

- **`/`: sales profile (main page).** A full-screen WELCOME on the first visit of a session, then a cinematic hero photo followed by About, Experience, Education, Skills, Next role, Nail art and Contact sections.
- **`/nails/`: nail art.** 60 original designs in a clean grid with style and color filters, a swipeable detail view, and an inquiry section. Reached from the "My nail art" button.

Live: https://romanjahandideh.github.io/furugh-little-universe/

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

## Still needed from Furugh (`src/data/site-config.ts`)

| Item | Until it's added |
| --- | --- |
| Employer email (and optional phone, LinkedIn) | Contact shows "coming soon" and "Get in touch" scrolls to Contact |
| Résumé PDF → `public/resume/` + `resumePath` | "PDF coming soon" |
| City (e.g. "Vancouver, BC") | Hero says "Canada" |
| University and year | Only the degree name is shown |
| Official name of the home improvement store in Tabriz | "a home improvement store in Tabriz" |
| Instagram, nail email, booking link | Nail page says links are coming soon |

The sales copy uses only confirmed facts. It adds no numbers, dates, awards or work-permit claims. Furugh should read it and adjust the voice.
