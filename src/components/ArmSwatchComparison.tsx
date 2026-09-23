import React, { useState } from 'react';
import { Sparkles, Layers, ArrowRight, Check, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Shade, Product } from '../types';
import { useCart } from '../context/CartContext';

export const ArmSwatchComparison: React.FC = () => {
  const { addToCart, setQuickViewProduct } = useCart();

  // Flattened shades with product ref
  const allItems: { product: Product; shade: Shade }[] = PRODUCTS.flatMap((p) =>
    p.shades.map((s) => ({ product: p, shade: s }))
  );

  // Active compared shades (up to 3)
  const [comparedIndices, setComparedIndices] = useState<number[]>([0, 1, 3]);
  const [skinComplexion, setSkinComplexion] = useState<'Fair' | 'Light' | 'Medium' | 'Tan' | 'Deep'>('Medium');

  const skinBaseColors: Record<string, { bg: string; name: string }> = {
    Fair: { bg: '#F6E6DF', name: 'Alabaster Ivory (Fair)' },
    Light: { bg: '#EED7CB', name: 'Porcelain Peach (Light)' },
    Medium: { bg: '#DDB69A', name: 'Golden Honey (Medium)' },
    Tan: { bg: '#BC8A64', name: 'Spiced Bronze (Tan)' },
    Deep: { bg: '#6F4129', name: 'Rich Espresso (Deep)' }
  };

  const handleToggleShade = (idx: number) => {
    if (comparedIndices.includes(idx)) {
      if (comparedIndices.length > 1) {
        setComparedIndices(comparedIndices.filter((i) => i !== idx));
      }
    } else {
      if (comparedIndices.length < 3) {
        setComparedIndices([...comparedIndices, idx]);
      } else {
        // replace last
        setComparedIndices([comparedIndices[0], comparedIndices[1], idx]);
      }
    }
  };

  return (
    <section id="arm-swatches" className="py-20 lg:py-28 bg-white dark:bg-[#0D0C0B] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-rose-800 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-full mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Side-by-Side Shade Studio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
              Compare Shades On Your Skin Tone
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm mt-2 max-w-xl">
              Inspect pigment undertones, finish reflectivity, and color payoff directly against 5 calibrated skin complexions.
            </p>
          </div>

          {/* Skin Tone Selector */}
          <div className="bg-stone-50 dark:bg-[#181614] p-2 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center space-x-1.5 self-start md:self-auto">
            <span className="text-[11px] font-bold text-stone-500 uppercase px-2">Complexion:</span>
            {Object.keys(skinBaseColors).map((toneKey) => (
              <button
                key={toneKey}
                onClick={() => setSkinComplexion(toneKey as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  skinComplexion === toneKey
                    ? 'bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 font-bold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                }`}
              >
                {toneKey}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Arm Canvas */}
          <div className="lg:col-span-6 bg-stone-100 dark:bg-[#181614] rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full flex items-center justify-between mb-4 text-xs text-stone-500">
              <span className="font-bold uppercase tracking-wider">
                Simulated Arm Swatch Bar
              </span>
              <span>{skinBaseColors[skinComplexion].name}</span>
            </div>

            {/* Arm graphic container */}
            <div 
              className="w-full max-w-md h-80 sm:h-96 rounded-3xl shadow-inner border-2 border-stone-300 dark:border-stone-700 relative p-6 flex flex-col justify-around transition-colors duration-500 overflow-hidden"
              style={{ backgroundColor: skinBaseColors[skinComplexion].bg }}
            >
              {/* Subtle skin texture and forearm curve highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-white/10 to-black/25 pointer-events-none" />

              {/* Swatch stripes */}
              {comparedIndices.map((itemIdx, stripeIndex) => {
                const item = allItems[itemIdx];
                if (!item) return null;
                return (
                  <div
                    key={item.shade.id}
                    className="relative group/swatch h-14 sm:h-16 rounded-2xl shadow-lg border border-black/15 flex items-center justify-between px-5 transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: item.shade.hex }}
                  >
                    {/* Swatch reflection highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20 rounded-2xl pointer-events-none" />

                    <div className="relative z-10 text-white drop-shadow-md">
                      <div className="text-xs sm:text-sm font-bold flex items-center space-x-1.5">
                        <span>{item.shade.name}</span>
                        <span className="text-[10px] font-normal opacity-80 uppercase tracking-widest">
                          ({item.product.finish})
                        </span>
                      </div>
                      <div className="text-[10px] opacity-90">
                        {item.shade.swatchNote}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(item.product, item.shade, 1)}
                      className="relative z-10 bg-white/95 hover:bg-white text-stone-900 text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md transition-all flex items-center space-x-1"
                    >
                      <ShoppingBag className="w-3 h-3 text-rose-700" />
                      <span>Add</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-stone-400 mt-4 text-center">
              *Rendered pigment values calibrated to natural studio daylight (5500K).
            </p>
          </div>

          {/* Right Selector List & Detailed Comparison Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-stone-50 dark:bg-[#181614] rounded-3xl p-6 border border-stone-200 dark:border-stone-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
                Select Up to 3 Shades to Compare:
              </h4>

              {/* Shade Selector Pills */}
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                {allItems.map((item, idx) => {
                  const isSelected = comparedIndices.includes(idx);
                  return (
                    <button
                      key={item.shade.id}
                      onClick={() => handleToggleShade(idx)}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 font-bold ring-2 ring-stone-900/20'
                          : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: item.shade.hex }}
                      />
                      <span>{item.shade.name}</span>
                      {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compared Specs Cards */}
            <div className="space-y-3">
              {comparedIndices.map((idx) => {
                const item = allItems[idx];
                if (!item) return null;
                return (
                  <div
                    key={item.shade.id}
                    className="p-4 bg-white dark:bg-[#181614] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className="w-10 h-10 rounded-2xl border border-black/15 shadow-xs flex-shrink-0"
                        style={{ backgroundColor: item.shade.hex }}
                      />
                      <div>
                        <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                          {item.shade.name}
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          {item.product.name} • <span className="font-semibold text-rose-800 dark:text-rose-400">{item.product.undertone} Undertone</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setQuickViewProduct(item.product)}
                        className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
                        title="Quick View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(item.product, item.shade, 1)}
                        className="bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 text-white dark:text-stone-950 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider"
                      >
                        Add ${item.product.price}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
