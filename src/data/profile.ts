import { siteConfig } from "./site-config";

/**
 * All the words on Furugh's main (sales) page. Only confirmed background:
 *  - about three years of sales experience
 *  - sales at a home improvement store in Tabriz (official name: site-config)
 *  - sales with GiSSO, a local clothing brand
 *  - about one year as an on-floor salesperson in a fast-paced hypermarket
 *  - Bachelor's in Psychology, focused on customer behaviour in retail stores
 *    (with a focus on children, mentioned only lightly)
 *  - looking for retail sales associate roles in Canada
 * No numbers, dates, awards or duties beyond these have been added.
 */
const homeStore = siteConfig.retail.homeImprovementStoreName ?? "a home improvement store in Tabriz";

export const profile = {
  role: "Retail Sales Associate",
  headline: "I help shoppers find exactly what they came for.",

  welcome:
    "Welcome, and thanks for stopping by. I'm Furugh, a retail sales associate with about three years on busy shop floors and a Bachelor's degree in Psychology focused on how customers think and shop. I'm now looking for my next sales role in Canada.",

  glance: [
    { value: "~3 yrs", label: "Retail sales experience" },
    { value: "3", label: "Store formats: home, fashion, hypermarket" },
    { value: "Bachelor's", label: "Psychology, customer behaviour" },
    { value: "Canada", label: "Open to sales associate roles" },
  ],

  experience: [
    {
      dept: "Home improvement",
      where: `Sales associate, ${homeStore}`,
      summary: "Practical shopping, practical questions.",
      points: [
        "Helped customers with a project in mind find the right product for it.",
        "Explained options in plain language, without the jargon.",
        "Listened first, then guided the decision.",
      ],
    },
    {
      dept: "Fashion retail",
      where: "Sales associate, GiSSO (local clothing brand)",
      summary: "Personal style, personal service.",
      points: [
        "Helped shoppers explore options until something felt right.",
        "Suggested pieces based on personal style, without pushing.",
        "Kept the shopping experience welcoming and relaxed.",
      ],
    },
    {
      dept: "Hypermarket",
      where: "On-floor salesperson, about 1 year",
      summary: "Busy aisles, steady service.",
      points: [
        "Stayed organised and responsive on a fast-paced floor.",
        "Answered a steady stream of customer questions, calmly and quickly.",
        "Kept service friendly, even at the busiest times.",
      ],
    },
  ],

  education: {
    degree: "Bachelor's degree in Psychology",
    school: siteConfig.retail.degreeSchool,
    focus:
      "My studies focused on customer behaviour in retail stores: how shoppers make decisions, what makes a store feel easy and welcoming, and how good service changes the outcome, including how families shop together.",
    onTheFloor: [
      { title: "Reading the customer", body: "Noticing what someone actually needs, not just what they first ask for." },
      { title: "Making choices easy", body: "Narrowing options so the decision feels confident, never pressured." },
      { title: "Welcoming every shopper", body: "Creating an experience that works for every age, from first-time visitors to regulars." },
    ],
  },

  skills: [
    "Customer service",
    "Product guidance",
    "Clear communication",
    "Reading customer needs",
    "Team collaboration",
    "Calm in busy stores",
    "Adaptability",
    "Friendly, professional manner",
  ],

  lookingFor: {
    title: "Ready for a Canadian sales floor.",
    body: "I'm looking for a retail sales associate role in Canada, in fashion, home or general retail, with a team that cares about customers as much as I do.",
    roles: ["Sales Associate", "Customer Service", "Retail Floor Staff"],
  },

  receipt: [
    "About 3 years of retail sales experience",
    `Home improvement retail: ${homeStore}`,
    "Fashion retail: GiSSO",
    "About 1 year on a hypermarket floor",
    "Bachelor's in Psychology (customer behaviour)",
    "Looking for: sales associate roles in Canada",
  ],
};
