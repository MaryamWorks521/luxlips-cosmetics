import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    setQuickViewProduct
  } = useCart();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F5] dark:bg-[#12100E] shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 transition-colors">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white dark:bg-[#181614] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-50">
                Your Saved Favorites
              </h3>
              <span className="text-xs bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-semibold px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                {savedProducts.length}
              </span>
            </div>

            <button
              id="close-wishlist-btn"
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of items */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900 flex items-center justify-center text-rose-800 dark:text-rose-300">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs">
                  Tap the heart icon on any lipstick or shade to save your favorite formulations for later.
                </p>
                <button
                  id="empty-wishlist-shop-btn"
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full shadow-xs transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedProducts.map((product) => {
                  const defaultShade = product.shades[0];
                  return (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-[#181614] rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-2xs flex space-x-4 items-center justify-between"
                    >
                      <div 
                        className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0 border border-stone-200 dark:border-stone-700 cursor-pointer"
                        onClick={() => {
                          setQuickViewProduct(product);
                          setIsWishlistOpen(false);
                        }}
                      >
                        <img
                          src={defaultShade.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-2">
                        <h4 
                          onClick={() => {
                            setQuickViewProduct(product);
                            setIsWishlistOpen(false);
                          }}
                          className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 truncate hover:text-rose-900 dark:hover:text-amber-300 cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {defaultShade.name} • {product.finish}
                        </p>
                        <div className="font-serif text-xs font-bold text-stone-900 dark:text-amber-300 mt-1">
                          {formatPrice(product.price)}
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-stone-300 dark:text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1 cursor-pointer"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            addToCart(product, defaultShade, 1);
                            setIsWishlistOpen(false);
                          }}
                          className="inline-flex items-center space-x-1 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
