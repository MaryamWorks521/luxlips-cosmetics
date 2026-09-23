import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product, Shade } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    formatPrice, 
    toggleWishlist, 
    isWishlisted, 
    setQuickViewProduct 
  } = useCart();

  const [activeShadeIndex, setActiveShadeIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const currentShade: Shade = product.shades[activeShadeIndex] || product.shades[0];
  const isSaved = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, currentShade, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div 
      className="group relative bg-white dark:bg-[#181614] rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] bg-stone-100 dark:bg-stone-900 overflow-hidden cursor-pointer">
        <img
          src={isHovered && currentShade.modelImage ? currentShade.modelImage : currentShade.image}
          alt={`${product.name} - ${currentShade.name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
          onClick={() => setQuickViewProduct(product)}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-[#1C1917] dark:bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-rose-700 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
              Save {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-all z-10 ${
            isSaved 
              ? 'bg-rose-50 text-rose-600 shadow-sm' 
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:text-rose-600 hover:bg-white shadow-2xs'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button on Image hover */}
        <div className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-2">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full inline-flex items-center justify-center space-x-1.5 bg-white/95 dark:bg-stone-900/95 hover:bg-white dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 py-2.5 rounded-xl text-xs font-semibold shadow-md backdrop-blur-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Finish info */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-rose-800 dark:text-rose-400 font-semibold tracking-wider uppercase text-[10px]">
              {product.finish}
            </span>
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-stone-700 dark:text-stone-300 font-bold ml-1 text-[11px]">{product.rating}</span>
              <span className="text-stone-400 text-[10px] ml-0.5">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50 group-hover:text-rose-700 dark:group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Shade Swatch Dots */}
        <div>
          <div className="flex items-center justify-between mb-1.5 text-[11px]">
            <span className="text-stone-500 dark:text-stone-400 text-[10px] uppercase tracking-wider">
              Shade:
            </span>
            <span className="font-semibold text-stone-800 dark:text-amber-300 truncate max-w-[140px] text-right">
              {currentShade.name}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
            {product.shades.map((shade, idx) => {
              const isSelected = activeShadeIndex === idx;
              return (
                <button
                  key={shade.id}
                  id={`card-shade-${product.id}-${shade.id}`}
                  onClick={() => setActiveShadeIndex(idx)}
                  className={`relative p-0.5 rounded-full transition-all focus:outline-none ${
                    isSelected ? 'ring-2 ring-stone-900 dark:ring-amber-400 ring-offset-1 scale-110' : 'opacity-85 hover:opacity-100'
                  }`}
                  title={`${shade.name} (${shade.family})`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-black/15 shadow-2xs"
                    style={{ backgroundColor: shade.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Price & Add to Bag */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400 block -mt-0.5">
              {product.shades.length} shades
            </span>
          </div>

          <button
            id={`add-to-bag-${product.id}`}
            onClick={handleQuickAdd}
            className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
