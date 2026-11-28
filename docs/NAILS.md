# Nail Artistry section: how to update it

The nail section lives at `/nails/` (main page) and `/nails/professional-profile/` (one-page profile for salon owners and recruiters). The rest of the site (home, decorative painting, prep cook) does not use these files.

## Where things are

| What | File |
| --- | --- |
| All nail text: brand lines, services, the six craft stages, hygiene, certificate, experience, client stages, FAQ, enquiry types | `src/data/nails.ts` |
| Photo details (title, alt text, style, colours, shape, order) | `src/data/artworks.ts` |
| Email, phone, city, Instagram | `src/data/site-config.ts` |
| Page layout | `src/components/nails/NailStudio.tsx` |
| Professional profile page | `src/components/nails/ProfessionalProfile.tsx` |
| Colours (ivory, nude, rose, espresso, burgundy, champagne) | bottom of `src/app/globals.css` |
| Editorial font (Cormorant Garamond) | `src/app/nails/layout.tsx` |

## Add photos
1. Put the new photos in a folder and run `python scripts/process_images.py <folder>`. This creates the WebP sizes in `public/images/nails/` and updates `src/data/artwork-images.json`.
2. Add one line per photo to `src/data/artworks.ts` (id = file name in lower case, e.g. `IMG_1234.JPG` becomes `img-1234`). Give it a title, a real description as `alt`, styles, colours and shape.
3. The gallery, filters and counts update automatically. A filter with no photos is hidden.
4. To show a photo inside a service, add its id to that service's `photos` list in `nails.ts`. Only use photos that really show that service.

Never add stock or AI images as her work.

## Change contact details
Edit `src/data/site-config.ts`. Anything set to `null` is hidden (for example `instagramUrl`).

## Add a résumé
Put the PDF in `public/resume/` and set `nailBrand.resumeFile` in `nails.ts` (e.g. `"/resume/forough-nails.pdf"`). "Request my résumé" then becomes "Download my résumé".

## Certificate
Details are in `certificate` in `nails.ts`. The status (Valid / Expired) is worked out from `validUntil` when the site is built. Never add the national ID number, QR code or a scan of the original certificate to the public folder.

## Enquiry form
Messages go to the email in `site-config.ts` through FormSubmit. Forough must click the one-time activation email from FormSubmit before messages arrive. The form never claims an appointment is booked.

## Check before publishing
`npx tsc --noEmit`, `npm run lint`, `npm run build`. The site deploys to furugh.com when `main` is pushed.
