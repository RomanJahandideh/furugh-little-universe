/**
 * Everything personal that Furugh still needs to confirm lives here.
 * A value of `null` means "not supplied yet": the site shows a polite
 * "coming soon" state instead of a fake link. Fill these in and redeploy.
 */
export const siteConfig = {
  name: "Furugh",
  siteUrl: "https://romanjahandideh.github.io/furugh-little-universe",

  retail: {
    /** Employer-facing email, e.g. "furugh.jobs@example.com". */
    email: null as string | null,
    /** Optional LinkedIn or other professional profile URL. */
    profileUrl: null as string | null,
    /** Put the PDF in public/resume/ and set e.g. "/resume/furugh-resume.pdf". */
    resumePath: null as string | null,
    /**
     * TODO(confirm): official name of the home improvement store in Tabriz.
     * Until then the site says "a home improvement store in Tabriz".
     */
    homeImprovementStoreName: null as string | null,
  },

  nails: {
    /**
     * The big photo at the top of the Nails page. Use any id from
     * src/data/artworks.ts, e.g. "img-7897" (Pop Garden) or "img-1486" (Hot Pink Hello).
     */
    heroArtworkId: "img-7897",
    /** e.g. "https://instagram.com/furugh.nails" */
    instagramUrl: null as string | null,
    instagramHandle: null as string | null,
    /** Nail inquiries email (kept separate from the job email). */
    email: null as string | null,
    /** Booking / appointment link, only if one exists. */
    bookingUrl: null as string | null,
    /** How Furugh prefers to be contacted, shown in the contact section. */
    preferredContact: null as string | null,
  },
};
