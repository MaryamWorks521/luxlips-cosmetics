import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart, Droplets, Wand2, Paintbrush, Gem } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

interface Step {
  num: string;
  title: string;
  tagline: string;
  icon: any;
  description: string;
  proTip: string;
  productId: string;
  shadeId?: string;
  productName: string;
  price: number;
}

const RITUAL_STEPS: Step[] = [
  {
    num: '01',
    title: 'Exfoliate & Polish',
    tagline: 'Smooth the Lip Micro-Texture',
    icon: Wand2,
    description: 'Buff away dead micro-cells gently using a warm damp towel or gentle sugar polish to prepare a supple, crease-free base.',
    proTip: 'Never apply matte lipstick over dry flakes. 30 seconds of gentle buffing extends wear by over 6 hours.',
    productId: 'glass-glaze-lip-oil',
    productName: 'Glass Glaze Lip Oil (Pre-Conditioner)',
    price: 26
  },
  {
    num: '02',
    title: 'Architectural Sculpt',
    tagline: 'Define & Prevent Bleeding',
    icon: Paintbrush,
    description: 'Trace the natural outer perimeter of the lips with our waterproof gel pencil. Slightly overline the center Cupid’s bow for volume.',
    proTip: 'Fill in the outer corners of the lips with pencil to create an ombré gradient effect before applying lipstick.',
    productId: 'couture-precision-liner',
    productName: 'Couture Precision Lip Definer',
    price: 22
  },
  {
    num: '03',
    title: 'Couture Pigment Swipe',
    tagline: 'Pure High-Fashion Color Adhesion',
    icon: Gem,
    description: 'Glide the teardrop bullet across lips. Our micro-micronized pigments deliver full opaque color in a single effortless stroke.',
    proTip: 'Blot once with silk tissue, then apply a second featherweight veil for 16-hour transfer resistance.',
    productId: 'luxe-velvet-rouge',
    productName: 'Luxe Velvet Rouge Matte',
    price: 34
  },
  {
    num: '04',
    title: 'Plumping Glaze Seal',
    tagline: '3D Volume & Glass Mirror Reflection',
    icon: Droplets,
    description: 'Tap a single bead of botanical lip oil onto the center of the bottom lip to bounce light and visually double lip fullness.',
    proTip: 'Concentrate the oil only in the center of the lips to keep outer edges razor-sharp and transfer-resistant.',
    productId: 'glass-glaze-lip-oil',
    productName: 'Glass Glaze Lip Oil (Glaze Seal)',
    price: 26
  }
];

export const LipRitualGuide: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { addToCart, showToast, formatPrice } = useCart();

  const currentStep = RITUAL_STEPS[activeStepIndex];
  const StepIcon = currentStep.icon;

  const handleAddStepToBag = () => {
    const product = PRODUCTS.find((p) => p.id === currentStep.productId);
    if (product) {
      addToCart(product, product.shades[0], 1);
      showToast(`Added ${currentStep.productName} to your bag`);
    }
  };

  return (
    <section id="lip-ritual" className="py-20 lg:py-28 bg-white dark:bg-[#0D0C0B] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-rose-800 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Masterclass Master Routine</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
            The 4-Step Haute Lip Ritual
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Master the art of long-lasting, featherweight lip beauty with Maryam’s signature backstage routine.
          </p>
        </div>

        {/* 4 Steps Horizontal Progress Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {RITUAL_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 sm:p-5 rounded-3xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isActive
                    ? 'border-stone-900 dark:border-amber-400 bg-stone-900 dark:bg-[#181614] text-white shadow-xl'
                    : 'border-stone-200 dark:border-stone-800 bg-[#FAF7F5] dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-amber-300' : 'text-stone-400'}`}>
                    STEP {step.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                </div>
                <div className="font-serif text-base sm:text-lg font-bold">
                  {step.title}
                </div>
                <div className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                  {step.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className="bg-[#FAF7F5] dark:bg-[#181614] rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-400 text-xs font-bold uppercase tracking-widest">
              <StepIcon className="w-4 h-4" />
              <span>Step 0{activeStepIndex + 1} of 04 • {currentStep.tagline}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900 dark:text-stone-100">
              {currentStep.title}
            </h3>

            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              {currentStep.description}
            </p>

            {/* Pro Tip Callout Box */}
            <div className="p-4 bg-white dark:bg-stone-900/90 rounded-2xl border-l-4 border-amber-500 dark:border-amber-400 shadow-2xs space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Maryam’s Backstage Secret:</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 italic">
                "{currentStep.proTip}"
              </p>
            </div>
          </div>

          {/* Product pairing recommendation card */}
          <div className="lg:col-span-5 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              Recommended Essential Tool
            </span>

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0 border border-stone-200 dark:border-stone-700">
                <img
                  src={
                    PRODUCTS.find((p) => p.id === currentStep.productId)?.shades[0].image ||
                    '/assets/crimson_royale_lipstick.jpg'
                  }
                  alt={currentStep.productName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                  {currentStep.productName}
                </h4>
                <div className="font-bold text-sm text-stone-900 dark:text-amber-300 mt-0.5">
                  {formatPrice(currentStep.price)}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddStepToBag}
              className="w-full bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Add Step {currentStep.num} to Bag</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
