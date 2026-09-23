import { FAQItem, RunwayLook } from '../types';

export const RUNWAY_LOOKS: RunwayLook[] = [
  {
    id: 'look-parisian-90s',
    title: 'The 90s Parisian Velvet',
    subtitle: 'Fall/Winter Haute Couture • Paris',
    season: 'Autumn / Winter',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    lipProduct: 'Luxe Velvet Rouge & Sculpt Definer',
    shadeName: 'Cashmere Nude + Buff Sculpt',
    finish: 'Diffused Velvet Matte',
    tip: 'Overline the Cupid’s bow slightly with Buff Sculpt, blend with fingertips, then press Cashmere Nude onto the center for that effortlessly pouty supermodel illusion.',
    productId: 'luxe-velvet-rouge'
  },
  {
    id: 'look-met-glaze',
    title: 'Glass Lacquer Glaze',
    subtitle: 'The Gala Red Carpet • New York',
    season: 'Spring / Summer',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    lipProduct: 'Glass Glaze Plumping Lip Oil',
    shadeName: 'Rose Quartz Glaze + Crystal Clarity',
    finish: '3D Mirror High-Gloss',
    tip: 'Apply two coats of Rose Quartz Glaze over bare lips, then tap a single drop of Crystal Clarity right at the center of the lower lip for maximum ambient light reflection.',
    productId: 'glass-glaze-lip-oil'
  },
  {
    id: 'look-cannes-scarlet',
    title: 'Cinematic Scarlet Royale',
    subtitle: 'Film Festival Premiere • Cannes',
    season: 'Resort Collection',
    image: '/assets/crimson_royale_model.jpg',
    lipProduct: 'Luxe Velvet Rouge Matte',
    shadeName: 'Crimson Royale',
    finish: 'Weightless Pure Scarlet',
    tip: 'For crisp red carpet definition that lasts all night, apply with a precision brush, blot once with silk tissue, and apply a final direct swipe across the bullet.',
    productId: 'luxe-velvet-rouge'
  }
];

export const INGREDIENTS_DATA = [
  {
    name: 'French Organic Camellia Seed Oil',
    origin: 'Brittany, France',
    icon: 'Sparkles',
    role: 'Deep Restorative Barrier Care',
    description: 'Cold-pressed virgin camellia oil contains rich oleic acid and vitamins A, B, and E that melt into lip tissue for weightless 16-hour suppleness without a greasy film.'
  },
  {
    name: 'Hyaluronic Filling Spheres™',
    origin: 'Biotech Fermentation',
    icon: 'Droplet',
    role: 'Dehydration Eraser & Plumper',
    description: 'Micronized sodium hyaluronate molecules penetrate the lip surface, absorbing trans-epidermal moisture to expand volume and smooth fine lines within 15 minutes.'
  },
  {
    name: 'Sugarcane Squalane (ECOCERT)',
    origin: 'Sustainable Sugarcane',
    icon: 'Leaf',
    role: 'Skin-Identical Hydration',
    description: 'Mimics the skin’s natural lipid mantle to lock in hydration, preventing water evaporation even in arid, air-conditioned or winter climates.'
  },
  {
    name: 'Palmitoyl Tripeptide-38',
    origin: 'Swiss Cosmetic Science',
    icon: 'Shield',
    role: 'Cellular Collagen Stimulation',
    description: 'A biomimetic matrix-stimulating peptide that visibly enhances lip fullness, firmness, and natural contour definition with continued use.'
  },
  {
    name: 'Nordic Cloudberry & Raspberry Seed',
    origin: 'Scandinavia',
    icon: 'Sun',
    role: 'Antioxidant Light Reflection',
    description: 'Packed with 4x more Vitamin C than oranges to shield lips from environmental oxidation while imparting that viral mirror-glazed gloss.'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'Formulation',
    question: 'How does LuxeLips achieve 16-hour wear without drying lips out?',
    answer: 'Traditional matte lipsticks rely on drying clays and waxes. LuxeLips uses a proprietary botanical cushion emulsion: micro-micronized mineral pigments suspended in organic French camellia oil and cross-linked hyaluronic spheres. The pigment adheres softly while the botanical oils continuously nourish lip skin.'
  },
  {
    category: 'Formulation',
    question: 'Are all LuxeLips products 100% vegan and cruelty-free?',
    answer: 'Yes, unconditionally. We are Leaping Bunny certified. We never use animal derivatives, carmine (crushed insects), beeswax, or lanolin. All our butters and waxes are derived from wild sunflower, sugarcane, and ethically harvested plant sterols.'
  },
  {
    category: 'Shade Matching',
    question: 'How do I choose between Crimson Royale and Vintage Cherry?',
    answer: 'Crimson Royale is an iconic true red with subtle cool-blue undertones that make teeth look brighter and flatters all undertones. Vintage Cherry has a deeper, spiced maroon-cherry warmth that is particularly breathtaking on olive, tan, and rich deep skin tones.'
  },
  {
    category: 'Shade Matching',
    question: 'Can I test shades on my phone or laptop before ordering?',
    answer: 'Yes! Use our Virtual Lip Studio and Shade Matcher Quiz right on the website. You can choose your skin complexion tone and see realistic rendered swatch colors, specularity, and undertones before adding to your bag.'
  },
  {
    category: 'Orders & Shipping',
    question: 'What are the worldwide shipping rates and delivery times?',
    answer: 'We provide Complimentary Free Worldwide Shipping on all orders over $50 (or local currency equivalent). Standard shipping takes 3-5 business days. Express courier delivery takes 1-2 business days with temperature-controlled luxury protective packaging.'
  },
  {
    category: 'Orders & Shipping',
    question: 'What is your returns and satisfaction guarantee policy?',
    answer: 'We offer a 30-Day Hassle-Free Love-It Guarantee. If the shade isn’t an absolute dream on you, contact our concierge desk for a complimentary shade swap or full refund.'
  },
  {
    category: 'Ethics & Clean',
    question: 'Is your packaging eco-friendly and recyclable?',
    answer: 'Every LuxeLips lipstick case is machined from durable, refillable brass metal designed to be kept forever. Outer boxes are crafted from 100% post-consumer FSC-certified paper and printed with non-toxic vegetable inks.'
  }
];
