import React, { useState } from 'react';
import { Instagram, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface LookbookItem {
  id: string;
  image: string;
  creator: string;
  handle: string;
  shadeName: string;
  productId: string;
  quote: string;
}

const LOOKS: LookbookItem[] = [
  {
    id: 'look-1',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    creator: 'Camille Laurent',
    handle: '@camille.paris',
    shadeName: 'Crimson Royale',
    productId: 'luxe-velvet-rouge',
    quote: 'Classic French cinema red that never budges.'
  },
  {
    id: 'look-2',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    creator: 'Aaliyah Khan',
    handle: '@aaliyahglam',
    shadeName: 'Rose Quartz Glaze',
    productId: 'glass-glaze-lip-oil',
    quote: 'The non-sticky mirror shine is pure magic!'
  },
  {
    id: 'look-3',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    creator: 'Elena Gomez',
    handle: '@elenastyle',
    shadeName: 'Spiced Almond',
    productId: 'silk-infusion-satin',
    quote: 'The only warm nude I trust for big events.'
  },
  {
    id: 'look-4',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    creator: 'Chloe Bennett',
    handle: '@chloelips',
    shadeName: 'Tuscan Rose',
    productId: 'luxe-velvet-rouge',
    quote: 'My everyday office-to-dinner holy grail.'
  }
];

export const CommunityGallery: React.FC = () => {
  const { setQuickViewProduct } = useCart();
  const [hoveredLook, setHoveredLook] = useState<string | null>(null);

  const handleShopLook = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setQuickViewProduct(product);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0D0C0B] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-3 py-1 rounded-full mb-3">
            <Instagram className="w-3.5 h-3.5 text-rose-600 dark:text-amber-400" />
            <span>#LuxeLipsMoments</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
            As Seen On The Community
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-2">
            Tag @LuxeLipsBeauty and #LuxeLips on Instagram to be featured in our seasonal lookbook.
          </p>
        </div>

        {/* 4 Look Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {LOOKS.map((look) => (
            <div
              key={look.id}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 cursor-pointer shadow-2xs hover:shadow-xl transition-all duration-500 border border-stone-200/50 dark:border-stone-800"
              onMouseEnter={() => setHoveredLook(look.id)}
              onMouseLeave={() => setHoveredLook(null)}
              onClick={() => handleShopLook(look.productId)}
            >
              <img
                src={look.image}
                alt={look.creator}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-black/20 opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Static top creator handle */}
              <div className="absolute top-3 left-3 text-white text-xs font-semibold drop-shadow-md">
                {look.handle}
              </div>

              {/* Bottom Caption & 1-Click Shop Tag */}
              <div className="absolute bottom-4 inset-x-4 space-y-1.5 text-white">
                <span className="inline-block text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                  Wearing: {look.shadeName}
                </span>
                
                <p className="text-xs text-stone-200 line-clamp-1 italic">
                  "{look.quote}"
                </p>

                <div className="pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShopLook(look.productId);
                    }}
                    className="w-full bg-white dark:bg-amber-400 hover:bg-stone-100 dark:hover:bg-amber-300 text-stone-900 dark:text-stone-950 py-1.5 px-3 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3 text-rose-700 dark:text-stone-950" />
                    <span>Shop Look</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
