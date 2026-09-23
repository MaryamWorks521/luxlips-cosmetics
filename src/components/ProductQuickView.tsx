import React, { useState } from 'react';
import { X, Heart, Star, Check, Sparkles, ShieldCheck, Droplet, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Shade } from '../types';

export const ProductQuickView: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    formatPrice, 
    toggleWishlist, 
    isWishlisted 
  } = useCart();

  const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howTo'>('benefits');
  const [viewAngle, setViewAngle] = useState<'product' | 'model'>('product');

  if (!quickViewProduct) return null;

  const currentShade: Shade = quickViewProduct.shades[selectedShadeIndex] || quickViewProduct.shades[0];
  const isSaved = isWishlisted(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, currentShade, quantity);
    setQuickViewProduct(null);
  };

  const currentImage = viewAngle === 'model' && currentShade.modelImage 
    ? currentShade.modelImage 
    : currentShade.image;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 dark:bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-[#181614] w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-stone-900 dark:text-stone-100"
      >
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 dark:bg-stone-800/90 hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-200 hover:text-stone-950 shadow-md transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Visual Gallery */}
          <div className="md:col-span-6 bg-stone-100 dark:bg-[#12100E] p-6 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-inner bg-white dark:bg-stone-900">
              <img
                src={currentImage}
                alt={`${quickViewProduct.name} - ${currentShade.name}`}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {quickViewProduct.badge && (
                <div className="absolute top-3 left-3 bg-[#1C1917] dark:bg-amber-400 text-white dark:text-stone-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  {quickViewProduct.badge}
                </div>
              )}
            </div>

            {/* View angle toggles (Product shot vs Model on lips) */}
            <div className="flex items-center space-x-3 mt-4">
              <button
                onClick={() => setViewAngle('product')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  viewAngle === 'product'
                    ? 'border-stone-900 dark:border-amber-400 bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-300 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                }`}
              >
                <span>Product View</span>
              </button>

              {currentShade.modelImage && (
                <button
                  onClick={() => setViewAngle('model')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    viewAngle === 'model'
                      ? 'border-stone-900 dark:border-amber-400 bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-300 shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>On Lips View</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Product Specs & Purchase */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-4">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900 px-2.5 py-1 rounded-full">
                    {quickViewProduct.finish} • {quickViewProduct.coverage}
                  </span>

                  <button
                    id="quickview-wishlist-toggle"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-2">
                  {quickViewProduct.name}
                </h2>

                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {quickViewProduct.tagline}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    {quickViewProduct.rating}
                  </span>
                  <span className="text-xs text-stone-400">
                    ({quickViewProduct.reviewsCount} verified reviews)
                  </span>
                </div>
              </div>

              {/* Price display */}
              <div className="flex items-baseline space-x-2 py-1">
                <span className="font-serif text-2xl font-bold text-stone-900 dark:text-amber-300">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                  In Stock • Ships in 24h
                </span>
              </div>

              {/* Shade Selector */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                    Select Shade:
                  </span>
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <span 
                      className="w-3 h-3 rounded-full inline-block border border-black/10" 
                      style={{ backgroundColor: currentShade.hex }}
                    />
                    {currentShade.name} <span className="text-stone-400 font-normal">({currentShade.family})</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.shades.map((shade, idx) => {
                    const isSelected = selectedShadeIndex === idx;
                    return (
                      <button
                        key={shade.id}
                        id={`quickview-shade-${shade.id}`}
                        onClick={() => setSelectedShadeIndex(idx)}
                        className={`group flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-stone-900 dark:border-amber-400 bg-stone-50 dark:bg-stone-900 ring-2 ring-stone-900/10 dark:ring-amber-400/20 shadow-2xs' 
                            : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-black/15 shadow-2xs"
                          style={{ backgroundColor: shade.hex }}
                        />
                        <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                          {shade.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2 italic">
                  "{currentShade.swatchNote}"
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pt-1">
                {quickViewProduct.description}
              </p>

              {/* Details Tabs */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex space-x-4 border-b border-stone-200 dark:border-stone-800 text-xs">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2 font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === 'benefits'
                        ? 'border-b-2 border-stone-900 dark:border-amber-400 text-stone-900 dark:text-amber-300'
                        : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                    }`}
                  >
                    Benefits
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2 font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === 'ingredients'
                        ? 'border-b-2 border-stone-900 dark:border-amber-400 text-stone-900 dark:text-amber-300'
                        : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                    }`}
                  >
                    Key Ingredients
                  </button>
                  <button
                    onClick={() => setActiveTab('howTo')}
                    className={`pb-2 font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === 'howTo'
                        ? 'border-b-2 border-stone-900 dark:border-amber-400 text-stone-900 dark:text-amber-300'
                        : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                    }`}
                  >
                    How To Apply
                  </button>
                </div>

                <div className="py-3 text-xs text-stone-600 dark:text-stone-400 min-h-[60px]">
                  {activeTab === 'benefits' && (
                    <ul className="space-y-1.5">
                      {quickViewProduct.benefits.map((b, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'ingredients' && (
                    <div className="space-y-1">
                      {quickViewProduct.keyIngredients.map((ing, i) => (
                        <div key={i} className="flex items-center space-x-2 text-stone-700 dark:text-stone-300">
                          <Droplet className="w-3 h-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          <span>{ing}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'howTo' && (
                    <p className="leading-relaxed">
                      {quickViewProduct.howToApply}
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Purchase CTA controls */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center space-x-4">
                
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-full px-3 py-1.5 bg-stone-50 dark:bg-stone-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 disabled:opacity-30 cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-stone-900 dark:text-stone-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  id="quickview-add-to-bag"
                  onClick={handleAdd}
                  className="flex-1 inline-flex items-center justify-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Bag • {formatPrice(quickViewProduct.price * quantity)}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-[11px] text-stone-500 dark:text-stone-400">
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-1" />
                  Free 30-Day Returns
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" />
                  Complimentary Deluxe Sample
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
