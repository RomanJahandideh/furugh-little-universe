import { siteConfig } from "./site-config";

/**
 * Retail story copy. Only confirmed background is used:
 *  - about three years of sales experience
 *  - sales at a home improvement store in Tabriz (official name: see site-config)
 *  - sales with GiSSO, a local clothing brand
 *  - about one year as an on-floor salesperson in a fast-paced hypermarket
 * No numbers, awards, dates or duties beyond these have been added.
 */
const homeStore = siteConfig.retail.homeImprovementStoreName ?? "a home improvement store in Tabriz";

export const retailProfile = {
  hero: {
    kicker: "Furugh Does Things: No. 1",
    title: "Meet Furugh.",
    subtitle: "Different stores. Different people. One thing I've always loved: helping someone find exactly what they came for.",
  },

  hello: {
    title: "It Starts With Hello",
    body: [
      "I genuinely like people. The quick question at the end of an aisle, the customer who isn't sure what they need yet, the regular who just wants to chat for a minute.",
      "Retail, to me, is the moment someone walks in. Make them feel noticed, listen properly, and the rest gets easier.",
    ],
    bubbles: ["Hi! Looking for something?", "Let me show you.", "Good choice!", "See you next time!"],
  },

  stores: {
    title: "Every Store Has Its Own Story",
    intro: "About three years of sales experience, in three very different kinds of shop floor.",
    scenes: [
      {
        id: "home",
        label: "Home improvement",
        title: "Where every question is practical.",
        where: `Sales at ${homeStore}.`,
        body: "Customers came in with a project and a problem to solve. My job was to listen to what they were really trying to do, then guide them to the right product, without the jargon.",
        tone: "var(--coral)",
      },
      {
        id: "fashion",
        label: "Fashion retail",
        title: "Where it's personal.",
        where: "Sales with GiSSO, a local clothing brand.",
        body: "Clothes are about how someone wants to feel. I learned to read personal style, suggest without pushing, and help shoppers explore options until something felt right.",
        tone: "var(--lilac)",
      },
      {
        id: "hyper",
        label: "Busy hypermarket",
        title: "Where everything moves fast.",
        where: "About a year as an on-floor salesperson in a hypermarket.",
        body: "Full aisles, long queues, a hundred small questions an hour. I stayed organised, kept calm and stayed friendly. Busy should never feel unhelpful.",
        tone: "var(--mint)",
      },
    ],
  },

  strengths: {
    title: "What I Bring to the Floor",
    cards: [
      { icon: "chat", title: "Customer communication", body: "Clear, warm and patient, whether it's a quick answer or a long conversation." },
      { icon: "compass", title: "Product guidance", body: "Turning “I'm not sure what I need” into a confident choice." },
      { icon: "shuffle", title: "Adaptability", body: "Hardware, fashion and groceries: three different paces, one steady attitude." },
      { icon: "highfive", title: "Team collaboration", body: "Covering a gap, sharing the load, keeping the floor running smoothly together." },
      { icon: "radar", title: "Reading customer needs", body: "Noticing who wants help, who wants space, and what they're actually looking for." },
      { icon: "lightning", title: "Calm in the rush", body: "Comfortable on a busy floor, staying organised and responsive when it's packed." },
      { icon: "ribbon", title: "Friendly, professional service", body: "Approachable without being pushy. Every customer leaves feeling looked after." },
    ],
  },

  facts: [
    "About 3 years of sales experience",
    `Home improvement retail: ${homeStore}`,
    "Fashion retail: GiSSO (local clothing brand)",
    "About 1 year on the floor of a fast-paced hypermarket",
    "Looking for: retail sales associate roles",
  ],

  next: {
    title: "New store. New faces. Same energy.",
    body: "I'm looking for my next retail sales associate role, somewhere with customers to help and a team to be part of.",
  },
};
