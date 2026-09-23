import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onTryOnClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onTryOnClick }) => {
  const { addToCart, setIsQuizOpen, formatPrice, setQuickViewProduct } = useCart();
  const heroProduct = PRODUCTS[0]; // Luxe Velvet Rouge Matte

  const [activeShadeIndex, setActiveShadeIndex] = useState(0);
  const currentShade = heroProduct.shades[activeShadeIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFEB] via-[#FAF7F5] to-[#FAF7F5] dark:from-[#0D0C0B] dark:via-[#161412] dark:to-[#0D0C0B] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200/60 dark:border-stone-800 transition-colors">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/40 dark:bg-rose-950/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-200/30 dark:bg-amber-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-stone-900/90 border border-stone-200/80 dark:border-stone-800 shadow-xs backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-700 dark:text-stone-300">
                The Couture Collection 2026
              </span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-50 leading-[1.08] tracking-tight font-normal">
              Intense Velvet Pigment. <br />
              <span className="italic font-serif font-light text-rose-800 dark:text-rose-400">
                Weightless
              </span> Botanical Care.
            </h1>

            <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Crafted by Maryam with organic French camellia oil and hyaluronic spheres. 
              Delivers single-swipe opacity and 16-hour cushion comfort that never cakes, flakes, or dries.
            </p>

            {/* Interactive Hero Shade Bar */}
            <div className="bg-white/80 dark:bg-[#181614] border border-stone-200/80 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xs max-w-lg mx-auto lg:mx-0 backdrop-blur-xs">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold text-[10px]">
                  Featured Formula
                </span>
                <span className="font-medium text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <span 
                    className="w-3 h-3 rounded-full inline-block border border-black/10" 
                    style={{ backgroundColor: currentShade.hex }}
                  />
                  {currentShade.name} <span className="text-stone-400 dark:text-stone-500 font-normal">({currentShade.family})</span>
                </span>
              </div>

              {/* Shade Circles */}
              <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                {heroProduct.shades.map((shade, idx) => (
                  <button
                    key={shade.id}
                    id={`hero-shade-select-${shade.id}`}
                    onClick={() => setActiveShadeIndex(idx)}
                    className={`group relative flex flex-col items-center focus:outline-none transition-transform ${
                      activeShadeIndex === idx ? 'scale-110' : 'opacity-85 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <div 
                      className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 shadow-xs ${
                        activeShadeIndex === idx ? 'border-stone-900 dark:border-amber-400 ring-2 ring-rose-200 dark:ring-amber-400/30' : 'border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      <div 
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: shade.hex }}
                      />
                    </div>
                    <span className="text-[10px] text-stone-600 dark:text-stone-400 mt-1 whitespace-nowrap hidden sm:block">
                      {shade.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <div className="text-stone-500 dark:text-stone-400 italic text-[11px] line-clamp-1 pr-2">
                  "{currentShade.swatchNote}"
                </div>
                <div className="font-serif text-lg font-bold text-stone-900 dark:text-amber-300 whitespace-nowrap">
                  {formatPrice(heroProduct.price)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-buy-now-btn"
                onClick={() => addToCart(heroProduct, currentShade, 1)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Add {currentShade.name} To Bag</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                id="hero-tryon-btn"
                onClick={onTryOnClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Virtual Lip Studio</span>
              </button>
            </div>

            {/* Credibility badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/70 dark:border-stone-800 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 ml-1.5">4.9 / 5</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider">3,400+ Verified Reviews</p>
              </div>

              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100 mb-0.5">16H Longwear</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider">Transfer-Resistant</p>
              </div>

              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100 mb-0.5">100% Vegan</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider">Cruelty-Free Certified</p>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fashion Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Product Card Visual */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-[#181614] border border-stone-200/80 dark:border-stone-800 group">
                <div className="aspect-[4/5] overflow-hidden relative bg-stone-100 dark:bg-stone-900">
                  <img
                    id="hero-featured-image"
                    src={currentShade.image}
                    alt={`${heroProduct.name} - ${currentShade.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Model Thumbnail Picture-in-Picture */}
                  {currentShade.modelImage && (
                    <div className="absolute top-4 right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white dark:border-stone-700 shadow-xl bg-white dark:bg-stone-900">
                      <img
                        src={currentShade.modelImage}
                        alt="Model Wearing Shade"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-stone-900/80 text-white text-[9px] text-center py-0.5 font-medium tracking-tight">
                        On Lips
                      </div>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#1C1917] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {heroProduct.badge}
                    </span>
                  </div>

                  {/* Quick View Button Overlay */}
                  <div className="absolute bottom-4 right-4">
                    <button
                      id="hero-quick-view-btn"
                      onClick={() => setQuickViewProduct(heroProduct)}
                      className="inline-flex items-center space-x-1.5 bg-white/90 dark:bg-stone-900/90 hover:bg-white dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded-full text-xs font-medium shadow-md backdrop-blur-xs transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card caption */}
                <div className="p-5 bg-white dark:bg-[#181614] flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
                      {heroProduct.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Shade: <span className="font-semibold text-stone-800 dark:text-amber-300">{currentShade.name}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-stone-400 line-through text-xs mr-1.5">
                      {heroProduct.originalPrice ? formatPrice(heroProduct.originalPrice) : ''}
                    </span>
                    <span className="font-serif text-xl font-bold text-stone-900 dark:text-stone-50">
                      {formatPrice(heroProduct.price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Testimonial Tag */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white/95 dark:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-4 shadow-xl max-w-xs items-center space-x-3.5 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-800 dark:text-rose-400 flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">"Pure Hollywood Glamour"</p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Voted #1 Luxury Lipstick by Beauty Editors</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
