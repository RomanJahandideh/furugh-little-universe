# Furugh's Little Universe

**Furugh Does Things.** One person, two worlds:

- **`/retail/` · Meet Furugh, the people person.** An illustrated, scroll-driven story for employers: four chapters, a sticky store scene that redraws itself (home improvement → fashion → hypermarket), strength cards, and a "short version" receipt for busy hiring managers.
- **`/nails/` · Tiny Canvases. Big Personalities.** A sketchbook-style gallery of Furugh's original nail art: browse by mood or by paint-blob color, open any design in a swipeable detail view, and tap "I want this one" to carry it into the inquiry section.
- **`/`** introduces both and lets each visitor choose their own world. The two journeys never force through each other.

Live: https://romanjahandideh.github.io/furugh-little-universe/

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Motion for React (the only animation library) · hand-written SVG doodles. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

Motion choices: one shared `IntersectionObserver` drives CSS reveals and stroke "draw-on" (no scroll listeners); Motion handles scroll-linked moments, filter layout transitions and the detail view. Native scrolling is never hijacked, and `prefers-reduced-motion` shows everything still. Content stays visible if JavaScript fails.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm start          # serve out/ locally
```

## Adding or changing nail photos

1. Put the original photos (JPG, PNG or iPhone HEIC) in any folder.
2. Run `pip install pillow pillow-heif` once, then:
   ```bash
   npm run images -- "C:/path/to/photo-folder"
   ```
   This writes color-accurate WebP files (480/960/1600 px, original color profile kept, EXIF rotation applied, no filters) to `public/images/nails/` and updates `src/data/artwork-images.json`.
3. The script lists any photo that has no details yet, as ready-to-paste lines. Paste them into **`src/data/artworks.ts`** and fill in the title, alt text, `categories`, `colors`, `finish`, `shape`, `featured` and `order`.
   - Photos without an entry still appear (as "Untitled"), so nothing breaks.
   - `order` controls position (lower = earlier). `featured: true` gives a design a full-width page.
   - Category, mood and color names live in `src/data/taxonomy.ts`.
4. Optionally run `python scripts/make_og.py` to refresh the social-share images.

The current 60 designs were categorized by looking at each photo. Furugh should review the titles, categories and colors in `artworks.ts`.

## Still needed from Furugh (all in `src/data/site-config.ts`)

| Item | Where it appears | Until it's added |
| --- | --- | --- |
| Employer email (and optional LinkedIn) | Retail "Get in Touch" | Button shows "email coming soon" |
| Résumé PDF → `public/resume/` + `resumePath` | Retail "View My Résumé" | Button shows "PDF coming soon" |
| Official name of the home improvement store in Tabriz | Retail scene A + receipt | "a home improvement store in Tabriz" |
| Instagram URL / handle, nail email, booking link, preferred contact | Nails "Found your next nail mood?" | "links are coming soon" |
| A portrait photo (optional) | Landing hero | Doodle portrait (`Avatar` in `Doodles.tsx`) |

The retail copy (`src/data/profile.ts`) uses only confirmed facts: about three years of sales experience; home improvement retail in Tabriz; GiSSO; about one year on a hypermarket floor. It adds no numbers, dates or awards. It's written in first person, so Furugh should read it and adjust the voice.

There's no inquiry form on purpose. Without a real delivery service, a form would silently drop messages.
