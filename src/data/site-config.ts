/**
 * Contact details and links. They match Forough's résumé
 * (public/resume/Forough_Mahmoudpour_Resume.pdf). A value of `null` means
 * "not supplied": the site hides that link instead of showing a fake one.
 */
export const siteConfig = {
  name: "Forough Mahmoudpour",
  shortName: "Forough",
  siteUrl: "https://romanjahandideh.github.io/furugh-little-universe",

  retail: {
    email: "furughmp77@gmail.com" as string | null,
    phone: "778-556-1713" as string | null,
    city: "Surrey, BC" as string | null,
    resumePath: "/resume/Forough_Mahmoudpour_Resume.pdf" as string | null,
    /** Optional LinkedIn or other professional profile URL. */
    profileUrl: null as string | null,
    degreeSchool: "University of Tabriz, Tabriz, Iran" as string | null,
  },

  /**
   * The contact form sends messages to Forough's email through FormSubmit
   * (https://formsubmit.co), a free form-to-email service that works on
   * static sites. The very first message triggers a one-time activation email
   * to furughmp77@gmail.com; she must click "Activate Form" in it before
   * later messages are delivered. After activating, FormSubmit shows a random
   * alias string. Put it in `formAlias` to keep the address out of the page
   * source.
   */
  contactForm: {
    formAlias: null as string | null,
  },

  nails: {
    /** e.g. "https://instagram.com/furugh.nails" */
    instagramUrl: null as string | null,
    instagramHandle: null as string | null,
    /** Booking / appointment link, only if one exists. */
    bookingUrl: null as string | null,
  },
};

export const contactEndpoint = `https://formsubmit.co/ajax/${siteConfig.contactForm.formAlias ?? siteConfig.retail.email}`;
