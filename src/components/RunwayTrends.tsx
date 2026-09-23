import React from 'react';
import { Sparkles, ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import { RUNWAY_LOOKS } from '../data/expandedData';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const RunwayTrends: React.FC = () => {
  const { setQuickViewProduct, addToCart, showToast } = useCart();

  const handleShopLook = (productId: string, shadeName: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    // find matching shade or fallback to first
    const shade = product.shades.find((s) => s.name.toLowerCase().includes(shadeName.split('+')[0].trim().toLowerCase())) || product.shades[0];
    addToCart(product, shade, 1);
    showToast(`Added ${shade.name} from Runway Look to your bag!`);
  };

  const handleQuickView = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setQuickViewProduct(product);
    }
  };

  return (
    <section id="runway-trends" className="py-20 lg:py-28 bg-[#FAF7F5] dark:bg-[#121110] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Backstage Couture Archives</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
              Runway Lip Trends & Pairings
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm mt-2 max-w-xl">
              Curated masterclasses and shade combinations straight from international fashion runways.
            </p>
          </div>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RUNWAY_LOOKS.map((look) => (
            <div
              key={look.id}
              className="group bg-white dark:bg-[#181614] rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={look.image}
                    alt={look.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <span className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900 dark:text-amber-300">
                    {look.season}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-mono opacity-80 uppercase tracking-widest">
                      {look.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-bold mt-0.5">
                      {look.title}
                    </h3>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5 pb-4 border-b border-stone-100 dark:border-stone-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400">
                      Product & Shades Worn:
                    </div>
                    <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {look.lipProduct}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-300">
                      Shade: <span className="font-serif font-bold text-stone-900 dark:text-amber-300">{look.shadeName}</span> ({look.finish})
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                      Artist Backstage Tip:
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                      "{look.tip}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center space-x-3">
                <button
                  onClick={() => handleShopLook(look.productId, look.shadeName)}
                  className="flex-1 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shop This Look</span>
                </button>

                <button
                  onClick={() => handleQuickView(look.productId)}
                  className="p-3 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-full transition-colors cursor-pointer"
                  title="View Product Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
