import { Product } from '../types';

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'PKR', symbol: '₨', rate: 278.0 },
  { code: 'AED', symbol: 'د.إ', rate: 3.67 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'luxe-velvet-rouge',
    name: 'Luxe Velvet Rouge Matte',
    tagline: '16-Hour Weightless Hydrating Velvet Lip Colour',
    category: 'matte',
    price: 36,
    originalPrice: 42,
    rating: 4.9,
    reviewsCount: 342,
    badge: 'Bestseller',
    isFeatured: true,
    finish: 'Velvet Matte',
    undertone: 'Universal',
    coverage: 'Full Pigment',
    description: 'An iconic couture matte lipstick that glides on like silk and settles into a plush, weightless velvet cushion. Infused with organic French camellia oil and micro-micronized pigments that never cake, flake, or feather.',
    benefits: [
      '16-hour long-wear without drying or cracking',
      'Ultra-micronized pure pigments for single-swipe opacity',
      'Infused with Hyaluronic spheres to plump lip lines',
      'Velvety soft-focus blurring effect'
    ],
    keyIngredients: [
      'French Camellia Oil (deep restorative moisture)',
      'Hyaluronic Filling Spheres (anti-feathering & plumping)',
      'Vitamin E Acetate (antioxidant defense)',
      'Wild Rosehip Butter'
    ],
    howToApply: 'Define Cupid’s bow using the teardrop bullet tip, then sweep smoothly across lips from center to corners. Blot gently with a tissue for an airbrushed, blurred editorial finish.',
    shades: [
      {
        id: 'crimson-royale',
        name: 'Crimson Royale',
        hex: '#9e1b24',
        family: 'Red',
        image: '/assets/crimson_royale_lipstick.jpg',
        swatchNote: 'Timeless cinematic scarlet with cool blue undertones that makes teeth look instantly whiter.',
        modelImage: '/assets/crimson_royale_model.jpg'
      },
      {
        id: 'tuscan-rose',
        name: 'Tuscan Rose',
        hex: '#b35d67',
        family: 'Pink',
        image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Warm dusty petal pink with neutral balance. Perfect for everyday sophisticated elegance.',
        modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cashmere-nude',
        name: 'Cashmere Nude',
        hex: '#c28773',
        family: 'Nude',
        image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'The ultimate warm nude beige that elevates every skin tone without washing out complexion.',
        modelImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'berry-noir',
        name: 'Berry Noir',
        hex: '#5c1b2f',
        family: 'Berry',
        image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Rich, dramatic crushed blackberry. High-fashion statement lip for evening glamour.',
        modelImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'terracotta-flame',
        name: 'Terracotta Flame',
        hex: '#b95138',
        family: 'Coral',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Spiced burnt pumpkin and terracotta with golden warmth. Sensational on medium-to-deep tones.',
        modelImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Sophia Chen',
        rating: 5,
        date: '3 days ago',
        shade: 'Crimson Royale',
        verified: true,
        title: 'The only true red that never dries my lips out!',
        comment: 'I wore Crimson Royale through a 6-course dinner and champagne toast. Zero touch-ups required, and my lips stayed velvety and hydrated all night. Truly luxury grade.',
        skinTone: 'Light'
      },
      {
        id: 'rev-2',
        author: 'Amina K.',
        rating: 5,
        date: '1 week ago',
        shade: 'Cashmere Nude',
        verified: true,
        title: 'Found my holy grail nude',
        comment: 'Most nudes look ashy on warm olive undertones, but Cashmere Nude has this creamy golden warmth that complements my complexion like magic. The packaging has such a satisfying magnetic click!',
        skinTone: 'Medium'
      },
      {
        id: 'rev-3',
        author: 'Elena Rostova',
        rating: 5,
        date: '2 weeks ago',
        shade: 'Berry Noir',
        verified: true,
        title: 'Pure Hollywood drama',
        comment: 'Intense pigment in literally one swipe. The formula feels like cashmere butter on the lips.',
        skinTone: 'Fair'
      }
    ]
  },
  {
    id: 'silk-infusion-satin',
    name: 'Silk Infusion Satin Lipstick',
    tagline: 'Luminous Peptide-Rich Conditioning Lip Colour',
    category: 'satin',
    price: 38,
    rating: 4.8,
    reviewsCount: 219,
    badge: 'Award Winner',
    isFeatured: true,
    finish: 'Hydrating Satin',
    undertone: 'Warm',
    coverage: 'Medium Buildable',
    description: 'A creamy, light-reflective satin lipstick dripping with botanical peptides and squalane. Delivers an opulent natural sheen that smooths, restores, and illuminates every contour of the lips.',
    benefits: [
      'Enriched with triple lipopeptides for visible fullness',
      'Luminous satin finish that catches ambient light',
      'Featherweight, non-waxy creamy glide',
      'Provides 8 hours of continuous barrier hydration'
    ],
    keyIngredients: [
      'Sugarcane Squalane (restores moisture barrier)',
      'Palmitoyl Tripeptide-38 (collagen booster)',
      'Cold-Pressed Jojoba Butter',
      'Pomegranate Seed Sterols'
    ],
    howToApply: 'Glide directly across bare lips. Layer a second coat for amplified multidimensional sheen and deeper pigment saturation.',
    shades: [
      {
        id: 'spiced-almond',
        name: 'Spiced Almond',
        hex: '#a3634b',
        family: 'Nude',
        image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Warm caramel praline nude with subtle roasted cinnamon undertones.',
        modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'dahlia-petal',
        name: 'Dahlia Petal',
        hex: '#cc6b7a',
        family: 'Pink',
        image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Luminous blooming rose pink that brings an instant youthful flush to your smile.',
        modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'vintage-cherry',
        name: 'Vintage Cherry',
        hex: '#962335',
        family: 'Red',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Lush dark maraschino cherry with soft ruby reflections.',
        modelImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'golden-amber',
        name: 'Golden Amber',
        hex: '#c07b58',
        family: 'Coral',
        image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Sun-drenched honeyed peach with champagne micro-reflects.',
        modelImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Zara Mirza',
        rating: 5,
        date: '5 days ago',
        shade: 'Spiced Almond',
        verified: true,
        title: 'Feels like pure silk on the lips',
        comment: 'I get chapped lips easily in winter, but this satin formula healed my dryness within hours. Plus the gold metallic casing looks magnificent on my vanity.',
        skinTone: 'Tan'
      }
    ]
  },
  {
    id: 'glass-glaze-lip-oil',
    name: 'Glass Glaze Plumping Lip Oil',
    tagline: 'High-Mirror Cushion Lip Oil with Botanical Elixir',
    category: 'oil',
    price: 30,
    rating: 4.95,
    reviewsCount: 489,
    badge: 'New Formula',
    isFeatured: true,
    finish: 'Botanical Oil',
    undertone: 'Universal',
    coverage: 'Sheer',
    description: 'The viral non-sticky lip oil that combines the blinding reflection of a glass gloss with the restorative therapy of an overnight lip treatment. Formulated with raspberry seed extract, cloudberry oil, and gentle plumping botanical bio-actives.',
    benefits: [
      'Zero stickiness, 100% cushion comfort',
      'Creates a 3D glass-lacquer mirror reflection',
      'Custom plush oversized doe-foot applicator hugs lips perfectly',
      'Infuses moisture that lasts long after gloss has been absorbed'
    ],
    keyIngredients: [
      'Nordic Cloudberry Seed Oil',
      'Wild Raspberry Kernel Oil',
      'Sodium Hyaluronate Spheres',
      'Shea Butter Unsaponifiables'
    ],
    howToApply: 'Swipe generously over bare lips for an effortless dewy tint, or layer atop your favorite LuxeLips lipstick to transform matte into ultra-luminous patent gloss.',
    shades: [
      {
        id: 'rose-quartz-glaze',
        name: 'Rose Quartz Glaze',
        hex: '#e2889e',
        family: 'Pink',
        image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Sheer baby pink with iridescent opalescent shimmer.',
        modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'honey-dew',
        name: 'Honey Dew',
        hex: '#df9e5c',
        family: 'Nude',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Warm golden nectar with a subtle caramel tint.',
        modelImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'blackberry-drizzle',
        name: 'Blackberry Drizzle',
        hex: '#69263e',
        family: 'Berry',
        image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Sheer gothic plum tint that deepens lip natural rosiness.',
        modelImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'crystal-clarity',
        name: 'Crystal Clarity',
        hex: '#f5f5f5',
        family: 'Nude',
        image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Pure high-shine transparent glass glaze.',
        modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Mia Reynolds',
        rating: 5,
        date: '2 days ago',
        shade: 'Rose Quartz Glaze',
        verified: true,
        title: 'Better than Dior Lip Glow Oil!',
        comment: 'I have tried every luxury lip oil on the market. This one has zero tackiness, smells like fresh vanilla strawberries, and gives that viral wet jelly lip look.',
        skinTone: 'Fair'
      }
    ]
  },
  {
    id: 'liquid-couture-stain',
    name: 'Liquid Couture Lip Stain',
    tagline: 'Ultra-Featherweight Transfer-Proof Matte Veil',
    category: 'matte',
    price: 34,
    rating: 4.88,
    reviewsCount: 178,
    badge: 'Vegan Choice',
    isFeatured: false,
    finish: 'Transfer-Proof Stain',
    undertone: 'Universal',
    coverage: 'Full Pigment',
    description: 'A revolutionary water-to-matte liquid lip formulation that locks onto lips with zero transfer onto coffee mugs or face masks. Featherweight fluid texture sets in 60 seconds into a velvety powdery tint.',
    benefits: [
      '100% smudge and kiss-proof all day',
      'Feels completely undetectable on lips',
      'Does not sink into fine lines or bleed',
      'Vegan & clean formulation'
    ],
    keyIngredients: [
      'Centella Asiatica (Cica) soothing extract',
      'Niacinamide (smooths lip texture)',
      'Green Tea Seed Oil',
      'Natural mineral pigments'
    ],
    howToApply: 'Use the precision diamond doe-foot to map out outer contours, then fill in. Allow to set untouched for 45-60 seconds for indestructible transfer resistance.',
    shades: [
      {
        id: 'suede-sepia',
        name: 'Suede Sepia',
        hex: '#8c5344',
        family: 'Nude',
        image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=800&q=80',
        swatchNote: '90s supermodel deep mocha brown with warm terracotta undertone.',
        modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'bordeaux-wine',
        name: 'Bordeaux Wine',
        hex: '#641b2c',
        family: 'Berry',
        image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Sultry deep French red wine stain.',
        modelImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'scarlet-muse',
        name: 'Scarlet Muse',
        hex: '#aa1927',
        family: 'Red',
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Vibrant true neutral red that commands attention.',
        modelImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'dewy-sheen-gloss',
    name: 'Dewy Sheen High-Shine Gloss',
    tagline: 'Micro-Pearl Cushion Gloss with Volumizing Care',
    category: 'gloss',
    price: 28,
    rating: 4.82,
    reviewsCount: 135,
    finish: 'High-Gloss',
    undertone: 'Warm',
    coverage: 'Medium Buildable',
    description: 'Envelop lips in pure light. Infused with multidimensional light-catching pearls that optically amplify lip fullness while coating lips in silky, nourishing moisture.',
    benefits: [
      'Glass-like shine without heavy stickiness',
      'Reflective micro-shimmer that enhances volume',
      'Subtle natural Madagascar vanilla scent'
    ],
    keyIngredients: [
      'Avocado Fruit Butter',
      'Castor Seed Oil',
      'Vitamin C Ester',
      'Hydrolyzed Hyaluronic Acid'
    ],
    howToApply: 'Swipe directly over bare lips or dab onto the center of Cupid’s bow over lipstick for an instant pout illusion.',
    shades: [
      {
        id: 'champagne-fizz',
        name: 'Champagne Fizz',
        hex: '#dab28d',
        family: 'Nude',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Golden champagne shimmer with warm bronze undertones.',
        modelImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'rose-gold-kiss',
        name: 'Rose Gold Kiss',
        hex: '#d6858e',
        family: 'Pink',
        image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Iridescent metallic rose gold glaze.',
        modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'luxe-contour-liner',
    name: 'Velvet Sculpt Lip Contour Pencil',
    tagline: 'Waterproof 12-Hour Cream-Gel Precision Definer',
    category: 'liner',
    price: 24,
    rating: 4.87,
    reviewsCount: 164,
    finish: 'Velvet Matte',
    undertone: 'Universal',
    coverage: 'Full Pigment',
    description: 'An ultra-smooth waterproof gel lip pencil that shapes, contours, and accentuates lips with razor-sharp precision. Built with a built-in sharpener and contour brush on the opposite end.',
    benefits: [
      'Gel-glide formula that won’t skip or tug delicate lip skin',
      'Transfer-proof, waterproof barrier halts lipstick bleeding',
      'Includes dual-ended vegan lip blending brush'
    ],
    keyIngredients: ['Synthetic Beeswax (Vegan)', 'Cottonseed Oil', 'Vitamin E'],
    howToApply: 'Trace slightly outside natural lip border for enhanced symmetry and volume. Use blending brush to diffuse towards inner lip before applying lipstick.',
    shades: [
      {
        id: 'contour-buff',
        name: 'Buff Sculpt',
        hex: '#a36d5c',
        family: 'Nude',
        image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'The universal contour shade that simulates natural lip shadow.',
        modelImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'contour-crimson',
        name: 'Crimson Sculpt',
        hex: '#8d1720',
        family: 'Red',
        image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Deep blue-red pencil crafted to partner with Crimson Royale.',
        modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'royal-vault-gift-set',
    name: 'The Royal Vault: 4-Piece Icon Set',
    tagline: 'Limited Collector’s Box with 4 Full-Size Couture Lipsticks',
    category: 'sets',
    price: 110,
    originalPrice: 144,
    rating: 5.0,
    reviewsCount: 92,
    badge: 'Limited Edition',
    isFeatured: true,
    finish: 'Multi-Finish' as any,
    undertone: 'Universal',
    coverage: 'Full Pigment',
    description: 'Housed in an exquisite gold-foiled keepsake drawer case. Contains our 4 most acclaimed universal shades: Crimson Royale Matte, Tuscan Rose Matte, Spiced Almond Satin, and Rose Quartz Glaze Lip Oil.',
    benefits: [
      'Saves $34 compared to buying individual items',
      'Collector’s vanity packaging with velvet ribbon pull',
      'The complete day-to-night lip wardrobe',
      'Complimentary luxury gift wrapping included'
    ],
    keyIngredients: ['Full formulations of Luxe Velvet, Silk Satin, and Glass Glaze'],
    howToApply: 'Mix, match, and contour across finishes for bespoke lip artistry.',
    shades: [
      {
        id: 'vault-collection',
        name: 'The 4-Piece Vault Collection',
        hex: '#962335',
        family: 'Red',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        swatchNote: 'Includes Crimson Royale, Tuscan Rose, Spiced Almond, and Rose Quartz Oil.',
        modelImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

export const BRAND_VALUES = [
  {
    title: '100% Cruelty-Free & Vegan',
    desc: 'Leaping Bunny certified. No animal testing, ever. Formulated purely with clean botanical butters and plant peptides.',
    icon: 'Sparkles'
  },
  {
    title: 'Skin-Identical Hydration',
    desc: 'Infused with French camellia oil and hyaluronic spheres so your lips feel nourished even after 16 hours.',
    icon: 'Droplet'
  },
  {
    title: 'Universal Inclusivity',
    desc: 'Every shade is rigorously developed and color-tested across 40+ diverse global skin undertones.',
    icon: 'Heart'
  },
  {
    title: 'Carbon-Neutral Luxury',
    desc: 'Refillable magnetic brass cases and sustainably harvested FSC-certified packaging.',
    icon: 'ShieldCheck'
  }
];

export const EDITORIAL_QUOTES = [
  {
    quote: 'LuxeLips has created the holy grail matte: feels like whipped velvet and lasts through a five-course dinner.',
    source: 'VOGUE BEAUTY',
    city: 'Paris'
  },
  {
    quote: 'The shade range is unmatched for true skin-tone harmony. Maryam’s formulation is pure modern craftsmanship.',
    source: 'ELLE MAGAZINE',
    city: 'New York'
  },
  {
    quote: 'The Glass Glaze Oil is the beauty product of the year. Blinding gloss with zero hair-sticking drama.',
    source: 'HARPER’S BAZAAR',
    city: 'London'
  }
];
