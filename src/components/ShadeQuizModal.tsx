import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RefreshCw, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product, Shade } from '../types';

export const ShadeQuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, addToCart, formatPrice } = useCart();

  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{
    undertone: string;
    finish: string;
    occasion: string;
  }>({
    undertone: '',
    finish: '',
    occasion: ''
  });

  const [result, setResult] = useState<{
    product: Product;
    shade: Shade;
    matchReason: string;
  } | null>(null);

  if (!isQuizOpen) return null;

  const handleSelectUndertone = (undertone: string) => {
    setAnswers((prev) => ({ ...prev, undertone }));
    setStep(2);
  };

  const handleSelectFinish = (finish: string) => {
    setAnswers((prev) => ({ ...prev, finish }));
    setStep(3);
  };

  const handleSelectOccasion = (occasion: string) => {
    const finalAnswers = { ...answers, occasion };
    setAnswers(finalAnswers);

    // Calculate smart match
    let matchProduct = PRODUCTS[0];
    let matchShade = matchProduct.shades[0];
    let reason = '';

    if (finalAnswers.finish === 'oil') {
      matchProduct = PRODUCTS.find((p) => p.category === 'oil') || PRODUCTS[2];
      matchShade = matchProduct.shades[0];
      reason = 'Your love for effortless glow and hydration pairs exquisitely with our Glass Glaze Rose Quartz lip oil.';
    } else if (finalAnswers.finish === 'satin') {
      matchProduct = PRODUCTS.find((p) => p.category === 'satin') || PRODUCTS[1];
      matchShade = matchProduct.shades[0]; // Spiced Almond
      reason = 'For luminous, plumping comfort with warm caramel undertones, Spiced Almond Satin is your ultimate match.';
    } else {
      // Matte
      if (finalAnswers.occasion === 'statement' || finalAnswers.occasion === 'evening') {
        matchProduct = PRODUCTS[0];
        matchShade = matchProduct.shades[0]; // Crimson Royale
        reason = 'A commanding, classic Hollywood scarlet with cool blue undertones that instantly brightens your complexion.';
      } else {
        matchProduct = PRODUCTS[0];
        matchShade = matchProduct.shades[2]; // Cashmere Nude
        reason = 'Cashmere Nude offers the perfect velvety balance of warm beige and soft rose for everyday modern elegance.';
      }
    }

    setResult({
      product: matchProduct,
      shade: matchShade,
      matchReason: reason
    });
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ undertone: '', finish: '', occasion: '' });
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 dark:bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-[#181614] w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-stone-900 dark:text-stone-100"
      >
        {/* Modal Top Bar */}
        <div className="bg-[#FAF7F5] dark:bg-[#12100E] border-b border-stone-200 dark:border-stone-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-800 dark:text-rose-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
                Signature Shade Matcher
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Find your personalized LuxeLips pairing in 3 questions
              </p>
            </div>
          </div>

          <button
            id="close-quiz-btn"
            onClick={() => setIsQuizOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker */}
        {step <= 3 && (
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1.5">
              <span>Question {step} of 3</span>
              <span>{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-stone-900 dark:bg-amber-400 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* Step 1: Undertone */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-50">
                How would you describe your skin tone & undertone?
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                Look at the veins on your wrist or how your skin reacts in golden sunlight.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'cool',
                    title: 'Cool & Rosy',
                    desc: 'Veins appear blue/purple, look best in silver, burn easily.',
                    hex: '#f5d5ce'
                  },
                  {
                    id: 'warm',
                    title: 'Warm & Golden',
                    desc: 'Veins appear greenish, look best in gold, tan with ease.',
                    hex: '#dfb18b'
                  },
                  {
                    id: 'olive',
                    title: 'Neutral & Olive',
                    desc: 'Balance of cool and warm, subtle greenish-bronze cast.',
                    hex: '#cda27a'
                  },
                  {
                    id: 'deep',
                    title: 'Deep & Rich Bronze',
                    desc: 'Rich espresso, mahogany or deep golden undertones.',
                    hex: '#6e442c'
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`quiz-undertone-${item.id}`}
                    onClick={() => handleSelectUndertone(item.id)}
                    className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-amber-400 hover:bg-stone-50 dark:hover:bg-stone-900/60 text-left transition-all flex items-start space-x-3 group cursor-pointer"
                  >
                    <div 
                      className="w-5 h-5 rounded-full border border-black/10 flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-900 dark:group-hover:text-amber-300">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Desired Finish */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-50">
                What lip texture makes you feel most confident?
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                Choose your everyday or signature lip finish preference.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'matte',
                    title: 'Plush Velvet Matte',
                    desc: 'Non-drying, transfer-proof, ultra-pigmented focus.',
                    badge: '16H Longwear'
                  },
                  {
                    id: 'satin',
                    title: 'Luminous Satin',
                    desc: 'Creamy peptide moisture with healthy natural sheen.',
                    badge: 'Plumping'
                  },
                  {
                    id: 'oil',
                    title: 'Dewy Glass Lip Oil',
                    desc: 'Mirror shine, botanical comfort, zero stickiness.',
                    badge: 'Viral Glaze'
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`quiz-finish-${item.id}`}
                    onClick={() => handleSelectFinish(item.id)}
                    className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-amber-400 hover:bg-stone-50 dark:hover:bg-stone-900/60 text-left transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="inline-block text-[9px] uppercase font-bold tracking-wider text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full mb-2 border border-rose-200/50 dark:border-rose-900/50">
                        {item.badge}
                      </span>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-900 dark:group-hover:text-amber-300">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Occasion */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-50">
                What occasion will this shade celebrate?
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                We'll fine-tune the color intensity and pigment balance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'everyday',
                    title: 'Daily Signature Elegance',
                    desc: 'Effortless coffee runs, meetings, and daytime glow.'
                  },
                  {
                    id: 'evening',
                    title: 'Romantic Dinners & Evening',
                    desc: 'Sultry, candlelight-catching berry or vintage rose.'
                  },
                  {
                    id: 'statement',
                    title: 'Red Carpet & Celebrations',
                    desc: 'Dramatic high-impact scarlet that commands every room.'
                  },
                  {
                    id: 'versatile',
                    title: 'Desk-to-Dinner Chameleon',
                    desc: 'A flexible shade that transitions effortlessly.'
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`quiz-occasion-${item.id}`}
                    onClick={() => handleSelectOccasion(item.id)}
                    className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-amber-400 hover:bg-stone-50 dark:hover:bg-stone-900/60 text-left transition-all group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-900 dark:group-hover:text-amber-300">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Matched Result */}
          {step === 4 && result && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center space-y-1">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  99.8% Match Found
                </span>
                <h4 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
                  Your Signature Match is Here
                </h4>
              </div>

              {/* Matched Product Card */}
              <div className="bg-[#FAF7F5] dark:bg-[#12100E] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 flex-shrink-0 relative shadow-md">
                  <img
                    src={result.shade.image}
                    alt={result.shade.name}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute bottom-2 left-2 w-6 h-6 rounded-full border-2 border-white dark:border-stone-900 shadow-xs"
                    style={{ backgroundColor: result.shade.hex }}
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="text-xs uppercase font-bold tracking-wider text-rose-800 dark:text-rose-400">
                    {result.product.finish}
                  </div>
                  <h5 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                    {result.product.name}
                  </h5>
                  <p className="text-sm font-semibold text-stone-800 dark:text-amber-300">
                    Shade: {result.shade.name} ({result.shade.family})
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed italic">
                    "{result.matchReason}"
                  </p>
                  <div className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 pt-1">
                    {formatPrice(result.product.price)}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3 pt-2">
                <button
                  id="quiz-add-match-btn"
                  onClick={() => {
                    addToCart(result.product, result.shade, 1);
                    setIsQuizOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {result.shade.name} to Bag</span>
                </button>

                <button
                  id="quiz-retake-btn"
                  onClick={handleReset}
                  className="w-full inline-flex items-center justify-center space-x-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 py-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Shade Quiz</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
