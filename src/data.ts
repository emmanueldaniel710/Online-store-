/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, LookbookStory, BrandWorld } from './types';

export const BRAND_WORLDS: { id: BrandWorld; label: string; tag: string; palette: string; description: string; accentHex: string }[] = [
  {
    id: 'jewelry',
    label: 'Jewelry',
    tag: 'La Joaillerie',
    palette: 'bg-zinc-950 text-white border-gold-400',
    accentHex: '#cca04e',
    description: 'Breathtaking 24k gold, flawless gemstones, and masterfully crafted heirlooms designed to glow for generations.',
  },
  {
    id: 'clothing',
    label: 'Clothing',
    tag: 'Le Prêt-à-Porter',
    palette: 'bg-orange-50/30 text-zinc-900 border-stone-800',
    accentHex: '#82652f',
    description: 'Soft minimalist silhouettes, luxurious flowing textiles, and structured designs tailored with sustainable excellence.',
  },
  {
    id: 'shoes',
    label: 'Shoes',
    tag: 'Les Chaussures',
    palette: 'bg-stone-100 text-zinc-900 border-red-900',
    accentHex: '#946522',
    description: 'Dynamic power strides and effortless evening silhouettes, crafted from custom buttery leather and metallic contours.',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    tag: 'Les Accessoires',
    palette: 'bg-slate-50 text-zinc-900 border-blue-900',
    accentHex: '#cca04e',
    description: 'Finishing touches with singular details: statement watches, premium leather hardware, and hand-woven silk layers.',
  },
  {
    id: 'makeup',
    label: 'Makeup & Beauty',
    tag: 'La Beauté',
    palette: 'bg-rose-50/20 text-zinc-900 border-rose-400',
    accentHex: '#b08130',
    description: 'Luminous cosmetics and high-potency serums crafted to highlight your natural contours in warm, reflective sunlight.',
  }
];

export const PRODUCTS: Product[] = [
  // --- JEWELRY ---
  {
    id: 'jew-1',
    name: 'Eternal Glow Diamond Tennis Necklace',
    price: 2450,
    rating: 4.92,
    reviewsCount: 142,
    primaryImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
    description: 'A continuous line of hand-set, brilliant-cut diamonds totaling 4.5 carats, linked flexibly in recycled platinum or 18k gold.',
    world: 'jewelry',
    collections: ['Eternal Glow Collection', 'Bridal Essentials'],
    tags: ['Best Seller', 'Diamonds', 'Platinum'],
    isBestSeller: true,
    metalTypes: ['Platinum', '18k Yellow Gold', '18k Rose Gold'],
    gemstones: ['Diamond', 'White Sapphire'],
    detailsList: [
      'Total carat weight: ~4.5 ct brilliant round diamonds',
      'Conflict-free diamonds with individual GIA certification',
      'Handcrafted setting with secure custom luxury clasp closure',
      'Length: 16 inches (resizable up to 18 inches at no extra cost)'
    ]
  },
  {
    id: 'jew-2',
    name: 'Astral Lunar Emerald Cocktail Ring',
    price: 1890,
    rating: 4.88,
    reviewsCount: 78,
    primaryImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    description: 'A stunning emerald-cut Columbian emerald set majestically in high-polish 18k yellow gold, surrounded by a halo of micro-pave diamonds.',
    world: 'jewelry',
    collections: ['Statement Lunar Pieces', 'Timeless Heirlooms'],
    tags: ['Limited Edition', 'Gemstone', 'Gold'],
    isNewArrival: true,
    metalTypes: ['18k Yellow Gold', 'Platinum'],
    gemstones: ['Emerald', 'Diamond'],
    sizeOptions: ['5', '6', '7', '8', '9'],
    detailsList: [
      'Columbian emerald cushion selection (~1.8 carats)',
      '0.25 carat brilliant halo diamonds',
      'Responsibly sourced conflict-free gemstones',
      'Signatory Lumina velvet box packaging included'
    ]
  },
  {
    id: 'jew-3',
    name: 'Solace 18k Gold Sculptural Hoop Earrings',
    price: 680,
    rating: 4.95,
    reviewsCount: 236,
    primaryImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    description: 'Delicately weighted organic hoop earrings finished in luxurious satin-brushed gold, providing a clean contemporary flare.',
    world: 'jewelry',
    collections: ['Timeless Heirlooms', 'Eternal Glow Collection'],
    tags: ['Best Seller', 'Gold'],
    isBestSeller: true,
    metalTypes: ['18k Yellow Gold', '18k Rose Gold'],
    detailsList: [
      'Pure 18-karat recycled yellow gold or rose gold',
      'Weight: 4.8 grams per earring for comfortable all-day wear',
      'Post-back clasp for secure, effortless fit',
      'Made in Italy by multi-generation jewelry masters'
    ]
  },
  {
    id: 'jew-4',
    name: 'Custom Meridian Alphabet Charm Pendant',
    price: 420,
    rating: 4.81,
    reviewsCount: 94,
    primaryImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    description: 'An elegant cursive heirloom pendant custom carved on request, suspended on a polished vintage style faceted box chain.',
    world: 'jewelry',
    collections: ['Statement Lunar Pieces', 'Timeless Heirlooms'],
    tags: ['Personalized', 'New Arrival'],
    isNewArrival: true,
    metalTypes: ['18k Yellow Gold', 'Platinum', '18k Rose Gold'],
    detailsList: [
      'Carved to order (choose any single letter or custom constellation)',
      'Delicate micro-diamond stars hand-inlaid in the letter curvature',
      '18-inch adjustable loop sequence',
      'Perfect customized legacy gift'
    ]
  },

  // --- CLOTHING ---
  {
    id: 'clo-1',
    name: 'Amour Silk Bias-Cut Midi Dress',
    price: 895,
    rating: 4.91,
    reviewsCount: 312,
    primaryImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from double-weight heavy silken weave, draped beautifully on the bias to hug the organic silhouette. Fits like second skin.',
    world: 'clothing',
    collections: ['Evening Reverie', 'Signature Silhouettes'],
    tags: ['Iconic', 'Silk', 'Best Seller'],
    isBestSeller: true,
    colorSwatches: [
      { name: 'Champagne Ivory', hex: '#EDE8D0' },
      { name: 'Burnt Terracotta', hex: '#A85A42' },
      { name: 'Onyx Black', hex: '#1C1A24' }
    ],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['100% Organic Mulberry Silk'],
    detailsList: [
      'Woven from luxury grade Mulberry Silk (22 momme thread weight)',
      'Subtle cowl neck and classic low cowl-drop open back',
      'Adjustable ultra-fine straps with solid gold hardware details',
      'Dry clean only'
    ]
  },
  {
    id: 'clo-2',
    name: 'Cozy Solstice Oversized Cashmere Turtleneck',
    price: 420,
    rating: 4.94,
    reviewsCount: 189,
    primaryImage: 'https://images.unsplash.com/photo-1574164904299-3a102b110380?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
    description: 'An enveloping pure cashmere knit spun from Mongolian high-altitude fibers, finished in drop shoulders and thick luxury ribbed hems.',
    world: 'clothing',
    collections: ['Timeless Essentials', 'Sustainable Luxe'],
    tags: ['Cashmere', 'Warm Cozy'],
    colorSwatches: [
      { name: 'Warm Beige', hex: '#D7C7B0' },
      { name: 'Soft Cream', hex: '#F3EFE9' },
      { name: 'Slate Gray', hex: '#777582' }
    ],
    sizeOptions: ['S', 'M', 'L', 'XL'],
    materials: ['100% Mongolian Cashmere'],
    detailsList: [
      'GOTS certified sustainable organic farming',
      'Twelve-gauge heavy knit with split back collar hem',
      'Unbelievably soft feel that naturally softens further with age',
      'Shipped with custom cedar block storage drawer accessory'
    ]
  },
  {
    id: 'clo-3',
    name: 'Atelier Tailored Structured Wool Blazer',
    price: 1280,
    rating: 4.87,
    reviewsCount: 112,
    primaryImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=800&q=80',
    description: 'A sharp, double-breasted tuxedo-cut blazer in heavy Italian virgin wool, with canvas canvas structure for architectural elegance.',
    world: 'clothing',
    collections: ['Signature Silhouettes', 'Evening Reverie'],
    tags: ['Tailored', 'Wool'],
    isNewArrival: true,
    colorSwatches: [
      { name: 'Onyx Black', hex: '#1C1A24' },
      { name: 'Sable Navy', hex: '#1C2638' }
    ],
    sizeOptions: ['XS', 'S', 'M', 'L'],
    materials: ['Virgin Wool', 'Silk lining'],
    detailsList: [
      'Italian virgin wool blend outer, luxury 100% silk inner lining',
      'Padded sharp shoulders with hand-stitched internal canvas construction',
      'Gold monogrammed metal focus buttons on lapel and sleeve cuffs',
      'Internal secret passport pocket'
    ]
  },
  {
    id: 'clo-4',
    name: 'Horizon Wide-Leg Pleated Linen Trousers',
    price: 365,
    rating: 4.79,
    reviewsCount: 88,
    primaryImage: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    description: 'High-waisted draped trousers in crisp heavyweight organic flax, featuring deep French pleating and an flowing wide leg outline.',
    world: 'clothing',
    collections: ['Sustainable Luxe', 'Timeless Essentials'],
    tags: ['Linen', 'Sustainable'],
    colorSwatches: [
      { name: 'Pristine White', hex: '#F9F8F6' },
      { name: 'Warm Ochre', hex: '#A68B6D' }
    ],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['100% Organic Flax Linen'],
    detailsList: [
      'Woven from premium Belgian flax fibers',
      'Breathable, wrinkle-resistant advanced linen finish',
      'Hidden adjustable waist tabs for perfect tailoring',
      'Double back zip pockets and deep front slash details'
    ]
  },

  // --- SHOES ---
  {
    id: 'sho-1',
    name: 'Chancery Patent Leather Stiletto Heels',
    price: 695,
    rating: 4.93,
    reviewsCount: 204,
    primaryImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1596568129885-6938a22b7c25?auto=format&fit=crop&w=800&q=80',
    description: 'An exquisite high-shine calfskin patent stiletto, with an asymmetrical hand-wrapped ankle strap and sculptural gold heel tip.',
    world: 'shoes',
    collections: ['Stride in Elegance', 'Iconic Footwear'],
    tags: ['Best Seller', 'Heels', 'Leather'],
    isBestSeller: true,
    colorSwatches: [
      { name: 'Midnight Onyx', hex: '#111111' },
      { name: 'Rich Burgundy', hex: '#581822' },
      { name: 'Nude Champagne', hex: '#EBE0CE' }
    ],
    sizeOptions: ['36', '37', '38', '39', '40', '41'],
    materials: ['100% Calfskin Patent Leather', 'Leather sole'],
    detailsList: [
      'Heel height: 100mm (3.9 inches) structured gold balance core',
      'Full leather lining with triple-layer dense memory gel insole',
      'Anti-slip brushed sole finished in trademark luxury cream gold',
      'Handcrafted in Tuscany, Italy'
    ]
  },
  {
    id: 'sho-2',
    name: 'Nimbus Cloud Knit Comfort Sneakers',
    price: 420,
    rating: 4.86,
    reviewsCount: 342,
    primaryImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    description: 'High-performance comfort engineered in structured silk-blend knit, complete with sleek gold eyelets and responsive carbon soles.',
    world: 'shoes',
    collections: ['Limited Capsule', 'Everyday Elevation'],
    tags: ['Comfort', 'Knit', 'Sports Luxe'],
    isNewArrival: true,
    colorSwatches: [
      { name: 'Nimbus White', hex: '#F0EFF5' },
      { name: 'Space Charcoal', hex: '#2E2D38' }
    ],
    sizeOptions: ['37', '38', '39', '40', '41', '42'],
    materials: ['Silk-Blend PrimeKnit', 'Carbon Composite sole'],
    detailsList: [
      'Ultra lightweight construction: only 190 grams per shoe',
      'Orthopedic active footbed with anatomical arch-alignment matrix',
      'Hand-finished gold calfskin heel tab detailing',
      'Fully washable mesh structure with premium travel bag'
    ]
  },
  {
    id: 'sho-3',
    name: 'Tuscan Suede Chelsea Ankle Boots',
    price: 875,
    rating: 4.89,
    reviewsCount: 167,
    primaryImage: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1481988535861-271139e0646b?auto=format&fit=crop&w=800&q=80',
    description: 'An elegant glove-like ankle fit handcrafted in fine rain-treated Tuscan suede, completed with clean dual elastic stretch inserts.',
    world: 'shoes',
    collections: ['Iconic Footwear', 'Everyday Elevation'],
    tags: ['Suede', 'Boots'],
    colorSwatches: [
      { name: 'Warm Cognac', hex: '#87492C' },
      { name: 'Driftwood Taupe', hex: '#9E938A' },
      { name: 'Mineral Black', hex: '#212025' }
    ],
    sizeOptions: ['36', '37', '38', '39', '40', '41', '43'],
    materials: ['Water-Repellent Italian Suede', 'Crepe sole'],
    detailsList: [
      'Glove-like fit with low stacked heel (30mm)',
      'Pre-treated with nano-coating technology for weather performance',
      'Stretched calfskin double lining for frictionless wear',
      'Double stitch reinforced welting'
    ]
  },

  // --- ACCESSORIES ---
  {
    id: 'acc-1',
    name: 'Heritage Minimalist Gold 38mm Watch',
    price: 1650,
    rating: 4.96,
    reviewsCount: 118,
    primaryImage: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80',
    description: 'An ultra-thin mechanical masterpiece featuring an 18k gold physical casing, flawless sapphire lock crystal, and fine leather straps.',
    world: 'accessories',
    collections: ['Finishing Touches', 'Signature Hardware'],
    tags: ['Best Seller', 'Gold Watch', 'Luxury'],
    isBestSeller: true,
    colorSwatches: [
      { name: 'Cacao Leather', hex: '#422818' },
      { name: 'Onyx Leather', hex: '#111111' }
    ],
    materials: ['18k Yellow Gold Case', 'Alligator Leather Strap'],
    detailsList: [
      'Premium Swiss automatic movement with 42-hour reserve charge',
      'Double anti-reflective curved scratchproof sapphire crystal glass',
      'Water resistant up to 50 meters (5 ATM) with solid gasket',
      'Each piece features premium unique hand-engraved serial number'
    ]
  },
  {
    id: 'acc-2',
    name: 'Aura Quilted Leather Crossbody Bag',
    price: 980,
    rating: 4.90,
    reviewsCount: 228,
    primaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    description: 'An iconic silhouette in geometric diamond quilted leather, styled with a solid interlocking brass closure and a convertible thick woven strap.',
    world: 'accessories',
    collections: ['Signature Hardware', 'Travel Companions'],
    tags: ['Leather Bag', 'Interlocking'],
    colorSwatches: [
      { name: 'Sable Black', hex: '#15141A' },
      { name: 'Ochre Tan', hex: '#C2966A' },
      { name: 'Powder Blush', hex: '#F0D6CE' }
    ],
    materials: ['Buttery Napa Lambskin', 'Heavy Brass clasps'],
    detailsList: [
      'Quilted in symmetrical 12-row continuous French diamond stitch',
      'Accordion structure with dual phone pockets and secure zipped central vault',
      'Adjustable gold chain and padded shoulder guard strap',
      'Comes with standard linen travel protection jacket'
    ]
  },
  {
    id: 'acc-3',
    name: 'Aero Tortoiseshell Cat-Eye Sunglasses',
    price: 320,
    rating: 4.77,
    reviewsCount: 154,
    primaryImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted acetate sunglasses with custom amber tortoiseshell accents and high-potency Japanese polarized gold lenses.',
    world: 'accessories',
    collections: ['Finishing Touches', 'Timeless Layers'],
    tags: ['Sunglasses', 'UV Protection'],
    isNewArrival: true,
    colorSwatches: [
      { name: 'Amber Tortoise', hex: '#593B2F' },
      { name: 'Jet Crystal Onyx', hex: '#121214' }
    ],
    materials: ['Bio-Acetate', 'Polarized CR-39 Lenses'],
    detailsList: [
      'Provides absolute 100% UVA/UVB complete cellular blockage',
      'Constructed from organic Italian Mazzucchelli bio-acetate',
      'Reinforced five-barrel hinge sequence for premium weight feel',
      'Includes premium faux leather magnetic pocket case'
    ]
  },

  // --- MAKEUP ---
  {
    id: 'mak-1',
    name: 'Satin Luxury Velvet Matte Lipstick Set',
    price: 68,
    rating: 4.88,
    reviewsCount: 412,
    primaryImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2ac?auto=format&fit=crop&w=800&q=80',
    description: 'A luxurious trio of high-pigment velvet formulas, packed with organic botanicals to hydrate lips while setting a seamless velvet lock.',
    world: 'makeup',
    collections: ['Signature Shades', 'Glow Essentials'],
    tags: ['Best Seller', 'Matte Lip', 'Organic Hydrating'],
    isBestSeller: true,
    shades: [
      { name: 'Rouge Seduction (Crimson)', hex: '#87171B' },
      { name: 'Nude Horizon (Warm Sand)', hex: '#C29580' },
      { name: 'Plum Majestic (Berry)', hex: '#5E1B31' }
    ],
    ingredientHighlights: ['Pure Hyaluronic Microspheres', 'Cold-Pressed Camellia Oil', 'Antioxidant Vitamin E'],
    detailsList: [
      'Includes 3 complimentary full-sized luxury matching lipstick sleeves',
      'Non-drying 12-hour weightless lock color hold',
      'Infused with real rose-scented botanicals',
      '100% Vegan, cruelty-free and clean certified'
    ]
  },
  {
    id: 'mak-2',
    name: 'Prismatic Luminous 12-Pan Eyeshadow Palette',
    price: 125,
    rating: 4.92,
    reviewsCount: 267,
    primaryImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: '12 universally flattering earth-toned shadows in rich velvets, sparkling prismatic metallics, and glowing champagne high-lights.',
    world: 'makeup',
    collections: ['Signature Shades', 'Limited Editions'],
    tags: ['Palette', 'Prismatic Sparkle'],
    isNewArrival: true,
    ingredientHighlights: ['Squalane binder', 'Natural Rice Starch base', 'Finely Milled Mica particles'],
    detailsList: [
      'Velvety formula that goes on smoothly with rich, single-swipe pigmentation',
      'Sturdy magnetic palette featuring clean oversized high-definition glass mirror',
      'Talc-free and clean formula utilizing squalane for frictionless glide',
      'Includes custom dual-ended tapered luxury application brush'
    ]
  },
  {
    id: 'mak-3',
    name: 'Aura Radiance Hyaluronic Serum Foundation',
    price: 95,
    rating: 4.95,
    reviewsCount: 389,
    primaryImage: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    description: 'A breathable serum foundation that boosts hydration by 200%, giving a dewy glass finish and lightweight custom evening coverage.',
    world: 'makeup',
    collections: ['Radiance Ritual', 'Glow Essentials'],
    tags: ['Best Seller', 'Serum Foundation', 'Hyaluronic Hydration'],
    isBestSeller: true,
    shades: [
      { name: 'Opal Light 10', hex: '#F6E6DA' },
      { name: 'Alabaster Silk 20', hex: '#ECCDB6' },
      { name: 'Bronze Sand 30', hex: '#CD9A78' },
      { name: 'Deep Auburn 40', hex: '#99633e' }
    ],
    ingredientHighlights: ['Double Hyaluronic Acid', 'Damascus Rose Otto', 'Probiotic Lactobacillus ferment'],
    detailsList: [
      'Gives a weightless, medium buildable second-skin glass highlight',
      'Infused with skin-healing botanical hydration factors',
      'SPF 30 broad spectrum mineral shield protection',
      'Prismatic hand-spun frosted glass bottle with exact gold pump'
    ]
  }
];

export const EDITORIAL_STORIES: LookbookStory[] = [
  {
    id: 'story-1',
    title: 'Adorned in Light',
    subtitle: 'Behind the Design of Eternal Glow',
    quote: '"Diamonds are and always will be physical representations of eternal solar light caught in the geological heart of our earth. The Eternal Glow Collection celebrates that captured spark with absolute sculptural clarity."',
    image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=800&q=80',
    location: 'Atelier Lumina, Milan',
    world: 'jewelry',
    credits: 'Photographed by Marc-Antoine Thibaudeau • Styled by Sarah-Jane Rose'
  },
  {
    id: 'story-2',
    title: 'The Silent Silk Road',
    subtitle: 'Sourcing the Infinite Drape',
    quote: '"We spent eighteen months locating a mulberry silk farm that operates entirely carbon-neutral, respecting both the natural cycle of the silkworm and the fluid drape of our silk slip. It fits like warm water."',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    location: 'Mulberry Orchards, Shiga Prefecture',
    world: 'clothing',
    credits: 'Photographed by Yuki Shindo • Model Kenji Hiroshige'
  },
  {
    id: 'story-3',
    title: 'The Solstice Glow',
    subtitle: 'Highlighting Nature’s Geometry',
    quote: '"The makeup of Lumina isn’t a mask—it is an amplifier. When sunbeams hit our hyaluronic serum foundation, the light scatters to reflect real skin texture, bathed in rose gold warmth. Pure, majestic radiance."',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    location: 'Sunwashed Terraces, Mallorca',
    world: 'makeup',
    credits: 'Photographed by Sofia Al-Sudairy • Lensed at Golden Hour'
  }
];
