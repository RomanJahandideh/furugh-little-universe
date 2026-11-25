/**
 * Names, contact details and links used across the site.
 * A value of `null` means "not supplied": the site hides that link.
 */
export const siteConfig = {
  name: "Forough Mahmoudpour",
  shortName: "Forough",
  siteUrl: "https://furugh.com",

  contact: {
    email: "furughmp77@gmail.com" as string | null,
    phone: "+1 236-234-1377" as string | null,
    city: "Vancouver, BC" as string | null,
  },

  /**
   * The contact forms send messages to Forough's email through FormSubmit
   * (https://formsubmit.co), a free form-to-email service for static sites.
   * The first message triggers a one-time activation email to the address
   * above; she must click "Activate Form" before messages are delivered.
   * FormSubmit then shows a random alias: put it in `formAlias` to keep the
   * address out of the page source.
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

export const contactEndpoint = `https://formsubmit.co/ajax/${siteConfig.contactForm.formAlias ?? siteConfig.contact.email}`;
