/**
 * Details for each decorative-painting photo. The image files are made by
 *   python scripts/process_images.py "<folder>" --set paintings
 * and matched here by `id` (the original file name, lower-cased:
 * IMG_1234.JPG -> "img-1234").
 *
 * Fewer, better photos: these 30 were chosen from ~250 in the shared Drive
 * folder. Captions describe only what is visible in each photo.
 * `featured` photos appear on the landing page; `withForough` marks photos
 * where she is in the frame.
 */
export type PaintingGroup = "studio" | "ceilings" | "blossom" | "murals" | "ornament";

export interface PaintingWork {
  id: string;
  title: string;
  alt: string;
  caption?: string;
  group: PaintingGroup;
  featured: boolean;
  withForough?: boolean;
  order: number;
}

export const paintingGroups: { id: PaintingGroup; title: string; intro: string }[] = [
  { id: "studio", title: "At work", intro: "On scaffolds, step stools and ladders: the hands behind the ornament." },
  { id: "ceilings", title: "Domes & ceilings", intro: "Gold leaf, painted birds and blossoms, and relief work overhead." },
  { id: "blossom", title: "Birds & blossoms", intro: "Magnolia, plum blossom and songbirds, painted on gold and silver leaf." },
  { id: "murals", title: "Painted walls", intro: "Murals and painted finishes, from ink-wash trees to climbing roses." },
  { id: "ornament", title: "Ornament & gilding", intro: "Carved scrolls, cartouches and columns, finished by hand." },
];

export const paintingDetails: PaintingWork[] = [
  // At work: Forough in the frame
  { id: "img-e5618", title: "Painting a cherub mural", alt: "Forough sitting on a blue stool, painting a mural of cherubs and figures on a wall.", caption: "At work on a hand-painted mural.", group: "studio", featured: true, withForough: true, order: 1 },
  { id: "img-6646", title: "Under the gilded ceiling", alt: "Forough standing on scaffold planks beneath an ornate white-and-gold ceiling with painted relief.", caption: "On the scaffold beneath a gilded, painted ceiling.", group: "studio", featured: false, withForough: true, order: 2 },
  { id: "img-7910", title: "Brushes in hand", alt: "Forough holding a fan of paintbrushes in front of her face, under a hand-painted rose vine.", caption: "Below a freshly painted rose vine.", group: "studio", featured: false, withForough: true, order: 3 },
  { id: "dhvie3256", title: "High on the scaffold", alt: "Forough sitting on top of a rolling scaffold under curved ornamental ceiling cornices.", caption: "A pause between cornices.", group: "studio", featured: false, withForough: true, order: 4 },
  { id: "img-9357", title: "Reflection", alt: "Forough reflected in a large round mirror framed with white carved ornament.", caption: "In a round mirror framed with carved ornament.", group: "studio", featured: false, withForough: true, order: 5 },

  // Domes & ceilings
  { id: "img-8277", title: "Golden dome", alt: "A domed ceiling of gold leaf painted with birds and blossoms, ringed by teal relief, with a crystal chandelier.", caption: "Gold leaf painted with birds and blossoms, ringed by teal relief.", group: "ceilings", featured: true, order: 10 },
  { id: "img-8347", title: "The parrot", alt: "Close-up of a hand-painted green parrot and peach roses on gold leaf, edged with sculpted flowers.", caption: "A painted parrot among roses on gold leaf.", group: "ceilings", featured: true, order: 11 },
  { id: "img-8348", title: "Garland of roses", alt: "A ring of sculpted, painted roses edging a gold-leaf dome above a teal lattice band.", caption: "Sculpted, painted flowers edging the dome.", group: "ceilings", featured: false, order: 12 },
  { id: "img-7089", title: "Teal and ivory relief", alt: "Ivory acanthus scrolls and painted roses in relief on a teal ceiling band with gold details.", caption: "Acanthus scrolls and roses on a teal ground.", group: "ceilings", featured: false, order: 13 },
  { id: "img-8331", title: "Fruit and acanthus", alt: "A teal ceiling band with white acanthus leaves, painted grapes, lemons and small cherub figures.", caption: "Painted fruit and cherubs in the relief band.", group: "ceilings", featured: false, order: 14 },
  { id: "img-1837", title: "Painted ceiling", alt: "A long gallery ceiling of painted panels set in white and gold frames, with chandeliers.", caption: "Painted panels set in gilded frames.", group: "ceilings", featured: false, order: 15 },
  { id: "img-2555", title: "Ceiling, in progress", alt: "An oval painted ceiling scene seen from below, with scaffolding planks in the foreground.", caption: "A painted oval ceiling, seen from the scaffold.", group: "ceilings", featured: false, order: 16 },

  // Birds & blossoms
  { id: "img-9549", title: "Magnolia and bluebird", alt: "A tall gold-leaf panel painted with pink magnolia branches and a blue bird, in a white and gold frame.", caption: "Gold leaf, magnolia and a bluebird.", group: "blossom", featured: true, order: 20 },
  { id: "img-9596", title: "Magnolia branch", alt: "Close-up of hand-painted pink magnolias and leaves across a gold-leaf wall.", caption: "Detail of a magnolia wall.", group: "blossom", featured: false, order: 21 },
  { id: "img-9597", title: "Birds in the mirror", alt: "An oval mirror in a carved silver-and-gold frame, with painted birds and magnolias around it.", caption: "A carved mirror cartouche among painted birds.", group: "blossom", featured: false, order: 22 },
  { id: "img-9552", title: "Magnolia wall", alt: "A wide wall of gold leaf with painted magnolia branches, an oval mirror and vertical mirror strips.", caption: "Gold leaf, magnolias and mirror strips across a wall.", group: "blossom", featured: false, order: 23 },
  { id: "img-0964", title: "Birds on a branch", alt: "A round painted panel of birds on a flowering branch, framed in gold with a carved shell crest.", caption: "A round panel beneath a carved shell crest.", group: "blossom", featured: false, order: 24 },
  { id: "img-e1059", title: "Silver blossom", alt: "A raised branch of pale blue blossoms on a textured silver-leaf oval with a white carved crest.", caption: "A raised blossom branch on silver leaf.", group: "blossom", featured: false, order: 25 },

  // Painted walls
  { id: "img-0938", title: "Ink tree", alt: "A large mural of a dark, ink-wash tree on a pale wall inside a thin gold frame.", caption: "An ink-wash tree in a gilded frame.", group: "murals", featured: true, order: 30 },
  { id: "img-0077", title: "Swags and swallows", alt: "A plaster wall painted with hanging garlands of leaves and flying swallows, framed by gilded ornament.", caption: "Painted garlands and swallows.", group: "murals", featured: false, order: 31 },
  { id: "img-7907", title: "Climbing roses", alt: "Hand-painted pink and peach roses with green leaves climbing a white wall.", caption: "Roses climbing a white wall.", group: "murals", featured: false, order: 32 },
  { id: "img-8726", title: "Green marble wall", alt: "A wall painted in a green, gold and cream marble pattern inside a silver ornamental frame.", caption: "A marble-patterned wall in green and gold.", group: "murals", featured: false, order: 33 },
  { id: "img-1430", title: "Feathers", alt: "A pale plaster wall with a soft pattern of large painted feathers, between gilded corner ornaments.", caption: "A soft feather pattern on plaster.", group: "murals", featured: false, order: 34 },

  // Ornament & gilding
  { id: "img-e8289", title: "Marble column", alt: "A marble column with a carved white-and-gold Corinthian capital and a gilded swag.", caption: "Under a gilded Corinthian capital.", group: "ornament", featured: true, order: 40 },
  { id: "img-5465", title: "Gilded cartouche", alt: "A carved ceiling cartouche of ivory scrolls with gold highlights around a marbled centre.", caption: "Carved scrolls and gold around a marbled centre.", group: "ornament", featured: false, order: 41 },
  { id: "img-e8201", title: "Teal relief panel", alt: "Ivory flowers and scrolls in relief on a teal background, above a cream plaster panel.", caption: "Ivory flowers and scrolls on teal.", group: "ornament", featured: false, order: 42 },
  { id: "img-9933", title: "Turquoise and gold", alt: "Carved silver scrolls around a turquoise stone, with a gold lattice, on a gold-flecked wall.", caption: "A turquoise stone set in carved scrolls.", group: "ornament", featured: false, order: 43 },
  { id: "img-9575", title: "Gold-leaf damask", alt: "Close-up of a textured wall with patches of gold leaf and a damask pattern.", caption: "Gold leaf and damask on textured plaster.", group: "ornament", featured: false, order: 44 },
  { id: "img-8214", title: "Silver angel", alt: "A large silvered relief of a winged figure and a cherub on a wall above a staircase.", caption: "A silvered relief above a staircase.", group: "ornament", featured: false, order: 45 },
  { id: "img-3097", title: "Roses in relief", alt: "Relief scrolls with small roses tinted pink and gold on a pale panel.", caption: "Relief roses tinted in pink and gold.", group: "ornament", featured: false, order: 46 },
];
