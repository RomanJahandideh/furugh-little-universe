/**
 * All text for the Nail Artistry section (/nails/ and /nails/professional-profile/).
 * Edit here; the pages update themselves. Photos live in artworks.ts.
 *
 * Rules for this file:
 * - Only facts Forough has confirmed. Leave a value null/empty to hide it.
 * - No prices, hours, salon addresses, reviews or ratings.
 */

export const nailBrand = {
  name: "FOROUGH",
  descriptor: "Nail Artistry & Professional Care",
  statement: "Beauty, Refined to the Smallest Detail.",
  secondary: "Where precision meets personal expression.",
  philosophy:
    "Every nail is a small canvas. Through careful preparation, refined technique, and artistic attention to detail, I create nail designs that complement individuality, enhance natural beauty, and reflect personal style.",
  closing: "Crafted with precision. Finished with artistry.",
  /** Area shown in nail copy. The city itself comes from siteConfig.contact.city. */
  area: "Greater Vancouver",
  yearsExperience: 3,
  /** Set to true only once services and availability are confirmed. */
  acceptingAppointments: true,
};

/* -------------------- Services -------------------- */

export type ServiceGroupId = "structure" | "care" | "art" | "maintenance";

export const serviceGroups: { id: ServiceGroupId; title: string }[] = [
  { id: "structure", title: "Nail Enhancements & Structure" },
  { id: "care", title: "Manicure & Natural Nail Care" },
  { id: "art", title: "Nail Art & Custom Design" },
  { id: "maintenance", title: "Maintenance, Repair & Removal" },
];

export interface NailService {
  id: string;
  group: ServiceGroupId;
  name: string;
  descriptor?: string;
  intro: string;
  detail: string[];
  skills: string[];
  benefits: string[];
  /** Extra list, e.g. design possibilities. */
  extra?: { title: string; items: string[] };
  /** A note of professional limits shown in the detail view. */
  note?: string;
  /** Portfolio photos that genuinely show this kind of work (ids from artworks.ts). */
  photos?: string[];
  /** Special illustrations. */
  figure?: "shapes" | "rebalance";
}

export const services: NailService[] = [
  {
    id: "sculpted-gel-extensions",
    group: "structure",
    name: "Sculpted Gel Extensions",
    descriptor: "Custom nail form sculpting",
    intro: "Length and structure built on professional nail forms, shaped individually for each nail, with no preformed plastic tips.",
    detail: [
      "Sculpted gel nail extensions use professional nail forms to create additional nail length and structure without relying on preformed plastic nail tips.",
      "Each extension is individually shaped according to the client's natural nail structure, desired length, preferred shape, and overall aesthetic. The sculpting process focuses on balanced proportions, appropriate structural support, and a refined appearance.",
    ],
    skills: ["Natural nail preparation", "Professional nail form placement", "Individual extension sculpting", "Builder gel application", "Nail apex construction", "Structural balance", "Sidewall refinement", "Free edge shaping", "Surface refinement and finishing", "Customized length and shape"],
    benefits: ["Customized nail length", "Personalized shape", "Refined nail architecture", "Natural-looking or dramatic extensions", "A foundation for creative nail art"],
    figure: "shapes",
  },
  {
    id: "gel-enhancements",
    group: "structure",
    name: "Gel Nail Enhancements",
    intro: "A smooth, carefully structured gel finish over the natural nail, with support where it is needed and a clean base for colour or art.",
    detail: [
      "Professional gel application focuses on creating a smooth, refined, and carefully structured nail finish.",
      "Depending on the natural nail condition and desired result, gel products can enhance the appearance of natural nails, provide additional structural support, and create a foundation for decorative designs. My approach emphasizes thoughtful preparation, precise application, controlled product placement, and attention to the final shape and surface.",
    ],
    skills: ["Natural nail assessment", "Nail plate preparation", "Base gel application", "Builder gel application", "Controlled product placement", "Nail surface levelling", "Apex refinement", "Appropriate lamp curing", "Gel colour application", "Glossy or matte finishing"],
    benefits: ["Smooth and refined appearance", "Customized colour and finish", "Additional structural support where appropriate", "A polished foundation for nail art", "Personalized results"],
    note: "Gel products are not suitable for every client. Suitability is discussed during the consultation.",
  },
  {
    id: "russian-manicure",
    group: "care",
    name: "Russian Manicure & Precision Nail Preparation",
    intro: "Careful e-file work around the cuticle area for a clean nail contour and a precise base for gel, always adapted to the client's skin and nails.",
    detail: [
      "Russian manicure is a detailed manicure technique that uses specialized electric file bits and precision tools to carefully refine the cuticle area and prepare the natural nail.",
      "This technique requires controlled movements, attention to individual nail condition, and careful handling of the surrounding skin. The objective is a clean, refined nail contour and a precise foundation for professional gel application, while prioritizing client comfort and responsible nail care.",
    ],
    skills: ["Professional electric nail file handling", "Selection of appropriate drill bits", "Detailed cuticle area preparation", "Careful removal of non-living tissue where appropriate", "Refinement of the surrounding nail area", "Natural nail shaping", "Nail surface preparation", "Precise gel application near the cuticle area"],
    benefits: ["Refined nail contour", "Carefully prepared nail surface", "Precise gel finishing", "A clean and polished appearance"],
    note: "Living skin is never intentionally cut or aggressively removed. The technique is adapted to each client's nail condition and sensitivity, and is not offered where it isn't suitable.",
  },
  {
    id: "french",
    group: "care",
    name: "Classic & Contemporary French Nails",
    intro: "A defined tip over a complementary base, from the traditional pink and white to micro and coloured French, with symmetry across the whole set.",
    detail: [
      "French manicure is a refined design characterized by a defined tip and a complementary base colour. The style ranges from the traditional natural pink and white combination to modern interpretations with alternative colours, delicate lines, and personalized tip shapes.",
      "My approach focuses on symmetry, precision, balanced proportions, and consistency across the complete nail set.",
    ],
    skills: ["Precise smile line creation", "Tip symmetry", "Colour balance", "Fine brush control", "Natural base colour selection", "Customized tip proportions", "Refined finishing"],
    benefits: ["A timeless, polished look", "Proportions matched to each nail", "Consistency across the whole set"],
    extra: { title: "Shown in the portfolio", items: ["Classic French", "Micro French", "Coloured French", "French with art and glitter details"] },
    photos: ["img-0938", "img-2608", "img-1486"],
  },
  {
    id: "hand-painted-art",
    group: "art",
    name: "Hand Painted Nail Art & Brush Techniques",
    intro: "Each nail as a miniature composition: fine lines, florals, abstract and playful motifs, painted freehand with detail brushes.",
    detail: [
      "Hand painted nail art transforms individual nails into miniature artistic compositions. Using fine detail brushes and professional nail art products, I create personalized designs that range from minimal decorative details to expressive, intricate compositions.",
      "Every design is developed around the client's preferences, including colour, visual style, outfit coordination, personal inspiration, and special occasions.",
    ],
    skills: ["Fine line artwork", "Precision brush painting", "Freehand illustration", "Floral motifs", "Abstract compositions", "Geometric patterns", "Decorative linework", "Minimalist nail art", "Colour composition and visual balance"],
    benefits: ["A design no one else is wearing", "Detail that rewards a closer look", "Art matched to an outfit, season or occasion"],
    photos: ["img-7903", "img-0114", "img-2848", "img-7117"],
  },
  {
    id: "custom-nail-art",
    group: "art",
    name: "Custom Nail Art & Personalized Design",
    intro: "From understated everyday sets to statement nails, each concept built around your inspiration, colours and style.",
    detail: [
      "Personalized nail design combines technical nail expertise with artistic composition, colour selection, texture, and individual expression.",
      "From understated everyday designs to statement nail sets, each concept can be developed around the client's preferences and visual inspiration. Reference photos are always welcome.",
    ],
    skills: ["Design consultation", "Colour selection", "Texture and finish (chrome, cat-eye, glitter, sugar)", "Mixed-technique sets", "Accent nail composition"],
    benefits: ["A set designed with you, not picked from a chart", "Room for your own references", "Designs adapted to your nail shape and length"],
    extra: { title: "Design categories in the portfolio", items: ["Minimalist", "Abstract", "Floral", "Seasonal", "Chrome & metallic", "Statement sets", "Personalized colour combinations"] },
    photos: ["img-2577", "img-5950", "img-8472", "img-4038"],
  },
  {
    id: "ombre",
    group: "art",
    name: "Ombré & Gradient Nail Design",
    intro: "Smooth transitions between two or more colours, from soft nude gradients to bright, expressive fades.",
    detail: [
      "Ombré nail design creates a gradual transition between two or more colours, producing a smooth and visually refined gradient.",
      "The technique can be adapted to subtle natural tones, romantic colour combinations, or more expressive contemporary designs. The focus is on balanced colour transitions, consistent coverage, and a professionally finished appearance.",
    ],
    skills: ["Colour selection", "Gradient composition", "Controlled colour blending", "Smooth transitions", "Surface consistency", "Customized gradient placement", "Refined finishing"],
    benefits: ["Soft, seamless colour", "Subtle or bold, to your taste", "A refined alternative to a single colour"],
    extra: { title: "Design possibilities", items: ["Soft nude ombré", "Pink and white ombré", "Neutral gradients", "Seasonal colour gradients", "Personalized multicolour transitions"] },
    photos: ["img-9522"],
  },
  {
    id: "gel-fill",
    group: "maintenance",
    name: "Gel Fill & Infill Maintenance",
    intro: "Keeping an existing enhancement looking continuous as the natural nail grows, by assessing, preparing the new growth and refreshing the gel.",
    detail: [
      "As natural nails grow, a visible space develops between the existing gel enhancement and the cuticle area. Gel fill services maintain an existing enhancement by assessing its condition, addressing suitable areas of lifting, preparing the new growth, and applying fresh gel where necessary.",
      "Fill suitability and maintenance frequency depend on nail growth, product condition, and individual circumstances.",
    ],
    skills: ["Existing enhancement assessment", "Identification of lifting or damage", "Careful product refinement", "Preparation of new natural nail growth", "Fresh gel application", "Surface levelling", "Shape correction", "Colour renewal where requested", "Final refinement"],
    benefits: ["Maintenance of existing enhancements", "Renewed appearance", "Restored shape and finish", "Less need for unnecessary complete removal"],
  },
  {
    id: "rebalance",
    group: "maintenance",
    name: "Gel Rebalance & Nail Architecture Correction",
    intro: "More than a fill: restoring the apex, thickness and shape so the enhancement is balanced again as the nail grows out.",
    detail: [
      "Nail rebalancing is a structural maintenance service that addresses changes in the position and distribution of an existing enhancement as the natural nail grows.",
      "Unlike a simple fill, rebalancing restores the appropriate position of the apex, refines thickness, corrects shape, and improves the overall architecture of the enhancement.",
    ],
    skills: ["Assessment of existing nail architecture", "Apex position correction", "Product thickness refinement", "Structural redistribution", "Free edge refinement", "Sidewall correction", "Shape restoration", "Surface smoothing", "Final structural assessment"],
    benefits: ["Improved structural balance", "More refined proportions", "A better-maintained appearance", "Correction of uneven product distribution"],
    figure: "rebalance",
  },
  {
    id: "gel-removal",
    group: "maintenance",
    name: "Professional Gel Removal",
    intro: "Controlled removal suited to the product system, soak-off or file-off, with the natural nail assessed afterwards.",
    detail: [
      "Professional gel removal focuses on carefully removing existing products using a method appropriate to the specific product system. Depending on whether the enhancement is a soak-off or file-off gel, removal may involve controlled filing or appropriate soaking.",
      "The process prioritizes careful product reduction, avoiding unnecessary damage to the natural nail, and assessing the nail's condition before any further service.",
    ],
    skills: ["Existing product identification", "Controlled product reduction", "Professional electric file handling", "Appropriate gel removal methods", "Natural nail protection", "Surface refinement", "Post-removal nail assessment"],
    benefits: ["Controlled removal of existing enhancements", "Less risk than peeling or forcing gel off", "Preparation for a new service", "An assessment of the natural nail"],
    note: "Careful removal reduces risk, but no method can promise zero damage in every circumstance.",
  },
  {
    id: "repair",
    group: "maintenance",
    name: "Nail Repair & Enhancement Restoration",
    intro: "Restoring chipped edges, broken extensions and minor structural flaws, after an assessment of whether repair is the right choice.",
    detail: [
      "Nail repair addresses suitable cosmetic damage to existing enhancements, including chipped edges, damaged extensions, and minor structural imperfections.",
      "Each repair begins with an assessment to decide whether the nail can be appropriately restored or needs product removal or replacement. The aim is a consistent appearance with responsible nail care.",
    ],
    skills: ["Assessment of damaged enhancements", "Chipped edge repair", "Broken extension restoration when appropriate", "Minor structural correction", "Gel reconstruction", "Shape and colour matching", "Surface refinement"],
    benefits: ["A consistent set again", "Repair instead of a full redo, where suitable", "Honest advice when replacement is better"],
    note: "This is a cosmetic service, not medical treatment. Infections, fungal conditions, injuries or unexplained discolouration are not treated; if a nail shows signs of these, the service is postponed and medical advice is recommended.",
  },
];

/* -------------------- The craft (six stages) -------------------- */

export const craftStages = [
  { n: "01", title: "Preparation", text: "Natural nail assessment, nail shaping, cuticle area preparation, surface preparation, and appropriate product selection." },
  { n: "02", title: "Structure", text: "Nail form placement, sculpted gel extensions, builder gel application, apex construction, and structural balance." },
  { n: "03", title: "Precision", text: "Electric nail file handling, detail refinement, symmetry, surface levelling, and accurate product placement." },
  { n: "04", title: "Artistry", text: "Hand painted nail art, brush techniques, French designs, ombré transitions, and personalized colour compositions.", photo: "img-0121" },
  { n: "05", title: "Maintenance", text: "Gel fills and infills, structural rebalancing, nail repair, and controlled gel removal." },
  { n: "06", title: "Finishing", text: "Surface refinement, colour consistency, appropriate curing, top coat application, and a final visual assessment.", photo: "img-5160" },
];

/* -------------------- Hygiene -------------------- */

export const hygiene = [
  { title: "Hand Hygiene", text: "Appropriate hand hygiene before and after services, with clean working practices throughout the appointment." },
  { title: "Clean Work Environment", text: "Cleaning and appropriate disinfection of work surfaces, equipment, and frequently touched areas between clients." },
  { title: "Professional Tool Care", text: "Cleaning and appropriate disinfection of reusable tools according to their intended use, applicable requirements, and manufacturer instructions." },
  { title: "Single-Use Materials", text: "Appropriate disposal of single-use materials, and never sharing items that cannot be safely reprocessed." },
  { title: "Natural Nail Protection", text: "Careful preparation and controlled filing, avoiding unnecessary damage to the natural nail and surrounding skin." },
  { title: "Product Safety", text: "Responsible product handling, curing according to manufacturer instructions, and avoiding unnecessary gel contact with the skin." },
  { title: "Client Assessment", text: "Assessing nail condition before any cosmetic service, and postponing when a condition makes the service unsuitable." },
  { title: "Dust Management", text: "An organized workspace, with appropriate dust control and ventilation where available." },
];

/* -------------------- Qualification -------------------- */

export const certificate = {
  type: "Electronic Certificate of Skill",
  title: "Nail Care and Correction Technology",
  issuer: "Iran Technical & Vocational Training Organization",
  holder: "Forough Mahmoudpour Nanesa",
  hours: 30,
  result: "85 out of 100",
  issued: "2025-04-22",
  validUntil: "2030-04-22",
  translation: "Officially certified English translation available on request.",
  /** Shown so nobody mistakes it for a Canadian licence. */
  scope: "An Iranian vocational qualification. It is not a Canadian licence or accreditation.",
};

/* -------------------- Experience -------------------- */

export const experienceAreas = [
  "Sculpted gel nail extensions", "Professional gel application", "Russian manicure", "Electric nail file techniques",
  "Hand painted nail art", "Fine detail brush techniques", "French manicure", "Ombré nail design",
  "Gel fills and infills", "Structural nail rebalancing", "Gel removal", "Cosmetic nail repair",
  "Client consultation", "Hygiene and professional care",
];

export const competencies = [
  "Professional nail preparation", "Sculpted nail extensions using nail forms", "Builder gel techniques", "Russian manicure",
  "Electric nail file operation", "Hand painted nail designs", "Fine brush techniques", "Gel fills and infills",
  "Structural nail rebalancing", "Professional gel removal", "Cosmetic nail repair", "French nail design",
  "Ombré nail design", "Client communication", "Professional hygiene practices", "Attention to detail",
];

/* -------------------- Client experience -------------------- */

export const clientStages = [
  { n: "01", title: "Consultation", text: "We talk through your preferences, nail condition, lifestyle, length, shape, colour and design inspiration." },
  { n: "02", title: "Preparation", text: "The nails are prepared with techniques suited to the chosen service and to your natural nail condition." },
  { n: "03", title: "Structure & Application", text: "The gel enhancement is applied or maintained with attention to shape, balance and product placement." },
  { n: "04", title: "Personalized Artistry", text: "Colour, nail art, a French line or an ombré transition: the personal details that make the set yours.", photo: "img-7390" },
  { n: "05", title: "Final Refinement", text: "A last look at symmetry, surface and the whole design, plus aftercare and maintenance advice.", photo: "img-3436" },
];

/* -------------------- FAQ -------------------- */

export const faqs = [
  { q: "What is the difference between gel extensions and gel application?", a: "Gel extensions add length and structure to the natural nail, while gel application may be used to enhance existing natural nails without necessarily adding length." },
  { q: "What are sculpted nail extensions?", a: "Sculpted extensions are created using nail forms that support the application and shaping of extension products according to the desired length and nail architecture." },
  { q: "What is a Russian manicure?", a: "Russian manicure is a precision technique using specialized tools and electric file bits to refine the cuticle area and prepare the nail. Suitability depends on individual nail and skin condition." },
  { q: "What is the difference between a gel fill and a rebalance?", a: "A gel fill addresses new nail growth, while a structural rebalance also restores the position of the apex, shape, thickness and overall architecture of the enhancement." },
  { q: "Can damaged nail extensions be repaired?", a: "Some cosmetic damage can be repaired after an assessment. More significant damage may require removal or replacement of the enhancement." },
  { q: "Can I bring my own nail art inspiration?", a: "Yes. Reference photos help communicate your preferred colours, style and design. The final design can be adapted to your nails and preferences." },
  { q: "Can you remove existing gel products?", a: "Gel removal can be considered depending on the existing product type and nail condition. Different gel systems need different removal methods." },
  { q: "Are you professionally trained?", a: "Yes. I hold a vocational certificate in Nail Care and Correction Technology issued by the Iran Technical & Vocational Training Organization, with an officially certified English translation." },
];

/* -------------------- Enquiry form options -------------------- */

export const enquiryTypes = [
  "Appointment enquiry",
  "Professional salon opportunity",
  "Creative collaboration",
  "Portfolio request",
  "Professional credentials request",
] as const;
export type EnquiryType = (typeof enquiryTypes)[number];
