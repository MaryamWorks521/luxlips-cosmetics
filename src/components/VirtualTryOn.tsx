import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Check, RotateCcw, Info, Heart, Sliders } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Shade, Product } from '../types';

interface SkinToneOption {
  id: string;
  name: string;
  faceHex: string;
  naturalLipHex: string;
  desc: string;
  undertone: 'Cool' | 'Warm' | 'Olive' | 'Neutral' | 'Deep Warm';
}

const SKIN_TONES: SkinToneOption[] = [
  {
    id: 'fair',
    name: 'Fair & Porcelain',
    faceHex: '#fae3d9',
    naturalLipHex: '#e29b9b',
    desc: 'Fair skin with cool rose or neutral undertones',
    undertone: 'Cool'
  },
  {
    id: 'light',
    name: 'Light & Peach',
    faceHex: '#f3d2be',
    naturalLipHex: '#d88686',
    desc: 'Light complexion with subtle golden or neutral hue',
    undertone: 'Warm'
  },
  {
    id: 'medium',
    name: 'Medium & Olive',
    faceHex: '#d8ab87',
    naturalLipHex: '#bd6a6d',
    desc: 'Warm olive, golden beige or honey undertones',
    undertone: 'Olive'
  },
  {
    id: 'tan',
    name: 'Tan & Bronze',
    faceHex: '#b27d53',
    naturalLipHex: '#9a4c54',
    desc: 'Deep warm bronze or spiced almond undertones',
    undertone: 'Warm'
  },
  {
    id: 'deep',
    name: 'Deep & Rich',
    faceHex: '#643e2a',
    naturalLipHex: '#5f2a36',
    desc: 'Rich espresso, mahogany with deep undertones',
    undertone: 'Deep Warm'
  }
];

export const VirtualTryOn: React.FC = () => {
  const { addToCart, formatPrice, toggleWishlist, isWishlisted } = useCart();

  // Flatten all available shades with their parent product
  const allShadePairs = PRODUCTS.flatMap((product) =>
    product.shades.map((shade) => ({ product, shade }))
  );

  const [selectedSkinTone, setSelectedSkinTone] = useState<SkinToneOption>(SKIN_TONES[2]); // Medium default
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [selectedPairIndex, setSelectedPairIndex] = useState<number>(0);
  const [intensity, setIntensity] = useState<number>(90); // 0-100 opacity
  const [showNaturalCompare, setShowNaturalCompare] = useState<boolean>(false);

  // Filtered shades based on finish filter
  const filteredPairs = allShadePairs.filter((p) => {
    if (selectedFinish === 'all') return true;
    if (selectedFinish === 'matte') return p.product.category === 'matte';
    if (selectedFinish === 'satin') return p.product.category === 'satin';
    if (selectedFinish === 'oil') return p.product.category === 'oil' || p.product.category === 'gloss';
    return true;
  });

  const activePair = filteredPairs[selectedPairIndex] || filteredPairs[0] || allShadePairs[0];
  const { product, shade } = activePair;

  // Determine gloss reflection style
  const isGlossOrOil = product.category === 'oil' || product.category === 'gloss';
  const isSatin = product.category === 'satin';

  return (
    <section id="virtual-try-on" className="py-16 lg:py-24 bg-[#FAF7F5] dark:bg-[#0D0C0B] border-t border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-amber-400" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-rose-950 dark:text-rose-300">
              Interactive Shade Simulator
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
            Virtual Lip Studio & Shade Matcher
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Select your complexion tone and preview how LuxeLips lipsticks, velvets, and glass oils reflect on your smile. 
            Calibrated with real photorealistic pigment blending.
          </p>
        </div>

        {/* Studio Interactive Card */}
        <div className="bg-white dark:bg-[#181614] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Simulator Display (Left / Top) */}
            <div className="lg:col-span-7 bg-[#F7F3EF] dark:bg-[#12100E] p-6 sm:p-10 flex flex-col items-center justify-between relative border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-stone-800">
              
              {/* Top simulation controls */}
              <div className="w-full flex items-center justify-between mb-4 z-10">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-stone-700 dark:text-stone-400 uppercase tracking-wider">
                    Complexion:
                  </span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800 px-2.5 py-1 rounded-full border border-stone-200 dark:border-stone-700 shadow-2xs">
                    {selectedSkinTone.name}
                  </span>
                </div>

                {/* Compare natural lips button */}
                <button
                  id="compare-natural-lips-btn"
                  onMouseDown={() => setShowNaturalCompare(true)}
                  onMouseUp={() => setShowNaturalCompare(false)}
                  onTouchStart={() => setShowNaturalCompare(true)}
                  onTouchEnd={() => setShowNaturalCompare(false)}
                  className="inline-flex items-center space-x-1.5 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-2xs cursor-pointer select-none"
                >
                  <RotateCcw className="w-3 h-3 text-stone-500 dark:text-stone-400" />
                  <span>Hold to Compare Natural</span>
                </button>
              </div>

              {/* Vector Lip Canvas with realistic shade rendering */}
              <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center my-4">
                
                {/* Simulated Face Canvas Container */}
                <div 
                  className="w-full h-full rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-inner transition-colors duration-500"
                  style={{ backgroundColor: selectedSkinTone.faceHex }}
                >
                  {/* Subtle skin texture gradient */}
                  <div className="absolute inset-0 bg-radial from-transparent via-black/5 to-black/20 pointer-events-none" />

                  {/* Philtrum / Cupid's bow subtle contour */}
                  <div 
                    className="w-10 h-10 rounded-full blur-md opacity-30 -mb-2"
                    style={{ backgroundColor: '#000000' }}
                  />

                  {/* Rendered Lips SVG */}
                  <div className="relative w-72 sm:w-80 h-36 flex items-center justify-center filter drop-shadow-md">
                    <svg viewBox="0 0 300 160" className="w-full h-full">
                      <defs>
                        {/* Shading filter for lips */}
                        <radialGradient id="lipCenterGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity={isGlossOrOil ? '0.45' : isSatin ? '0.2' : '0.08'} />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                        </radialGradient>
                        <linearGradient id="glossHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Upper Lip */}
                      <path
                        d="M 30,85 C 60,65 95,50 130,62 C 142,66 150,75 150,75 C 150,75 158,66 170,62 C 205,50 240,65 270,85 C 240,95 200,95 150,88 C 100,95 60,95 30,85 Z"
                        fill={showNaturalCompare ? selectedSkinTone.naturalLipHex : shade.hex}
                        fillOpacity={showNaturalCompare ? 1 : intensity / 100}
                        stroke="#000000"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                        className="transition-colors duration-300"
                      />

                      {/* Lower Lip */}
                      <path
                        d="M 30,85 C 65,100 100,128 150,128 C 200,128 235,100 270,85 C 235,92 190,90 150,90 C 110,90 65,92 30,85 Z"
                        fill={showNaturalCompare ? selectedSkinTone.naturalLipHex : shade.hex}
                        fillOpacity={showNaturalCompare ? 1 : intensity / 100}
                        stroke="#000000"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                        className="transition-colors duration-300"
                      />

                      {/* Lip Crease / Center Line */}
                      <path
                        d="M 30,85 Q 90,92 150,89 Q 210,92 270,85"
                        fill="none"
                        stroke="#2a0808"
                        strokeWidth="2"
                        strokeOpacity="0.5"
                      />

                      {/* Plumping 3D Depth Overlay */}
                      <path
                        d="M 45,86 C 80,103 115,124 150,124 C 185,124 220,103 255,86 Z"
                        fill="url(#lipCenterGlow)"
                      />

                      {/* Gloss / Oil Specular Highlights (if gloss or oil) */}
                      {(isGlossOrOil || isSatin) && !showNaturalCompare && (
                        <>
                          {/* Lower lip wet glare */}
                          <ellipse
                            cx="150"
                            cy="110"
                            rx="40"
                            ry="7"
                            fill="#ffffff"
                            opacity={isGlossOrOil ? 0.75 : 0.35}
                            className="blur-[2px]"
                          />
                          <ellipse
                            cx="135"
                            cy="108"
                            rx="15"
                            ry="3"
                            fill="#ffffff"
                            opacity={isGlossOrOil ? 0.9 : 0.5}
                          />

                          {/* Cupid's bow specular gloss */}
                          <ellipse
                            cx="136"
                            cy="66"
                            rx="12"
                            ry="3"
                            fill="#ffffff"
                            opacity={isGlossOrOil ? 0.6 : 0.25}
                          />
                          <ellipse
                            cx="164"
                            cy="66"
                            rx="12"
                            ry="3"
                            fill="#ffffff"
                            opacity={isGlossOrOil ? 0.6 : 0.25}
                          />
                        </>
                      )}
                    </svg>
                  </div>

                  {/* Mode Watermark */}
                  <div className="absolute bottom-3 left-4 text-[10px] text-stone-900/80 dark:text-stone-900 font-semibold tracking-wider uppercase bg-white/60 px-2 py-0.5 rounded">
                    {showNaturalCompare ? 'Bare Natural Lips' : `Wearing ${shade.name} (${product.finish})`}
                  </div>
                </div>
              </div>

              {/* Slider controls: Pigment intensity */}
              <div className="w-full max-w-md bg-white/90 dark:bg-stone-800/90 rounded-2xl p-4 border border-stone-200 dark:border-stone-700 shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
                  <Sliders className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                  <span>Pigment Layer:</span>
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    id="pigment-intensity-slider"
                    type="range"
                    min="40"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="w-full accent-rose-700 dark:accent-amber-400 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 w-9 text-right">
                    {intensity}%
                  </span>
                </div>
              </div>

            </div>

            {/* Selector Options & Product Drawer (Right / Bottom) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white dark:bg-[#181614]">
              
              <div className="space-y-6">
                
                {/* Step 1: Select Skin Tone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-2.5">
                    1. Select Your Skin Tone
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {SKIN_TONES.map((tone) => (
                      <button
                        key={tone.id}
                        id={`skin-tone-select-${tone.id}`}
                        onClick={() => setSelectedSkinTone(tone)}
                        className={`group relative flex flex-col items-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedSkinTone.id === tone.id
                            ? 'border-stone-900 dark:border-amber-400 bg-stone-50 dark:bg-stone-800 ring-2 ring-stone-900/20 dark:ring-amber-400/30 shadow-xs'
                            : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-black/10 shadow-2xs mb-1.5 transition-transform group-hover:scale-105"
                          style={{ backgroundColor: tone.faceHex }}
                        />
                        <span className="text-[10px] font-semibold text-stone-800 dark:text-stone-200 leading-tight">
                          {tone.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2 italic">
                    {selectedSkinTone.desc} ({selectedSkinTone.undertone} Undertone)
                  </p>
                </div>

                {/* Step 2: Filter by Finish */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                      2. Choose Finish
                    </label>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      {filteredPairs.length} shades available
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'matte', label: 'Matte' },
                      { id: 'satin', label: 'Satin' },
                      { id: 'oil', label: 'Oil & Gloss' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setSelectedFinish(tab.id);
                          setSelectedPairIndex(0);
                        }}
                        className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                          selectedFinish === tab.id
                            ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-300 shadow-2xs font-semibold'
                            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Select Shade Swatches */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-2">
                    3. Select Shade To Try On
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 max-h-48 overflow-y-auto pr-1">
                    {filteredPairs.map((item, idx) => {
                      const isSelected = activePair.shade.id === item.shade.id;
                      return (
                        <button
                          key={`${item.product.id}-${item.shade.id}`}
                          id={`tryon-shade-${item.shade.id}`}
                          onClick={() => setSelectedPairIndex(idx)}
                          className={`flex flex-col items-center p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-stone-900 dark:border-amber-400 bg-rose-50/50 dark:bg-stone-800 ring-2 ring-rose-300 dark:ring-amber-400/40 shadow-xs'
                              : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                          }`}
                        >
                          <div
                            className="w-7 h-7 rounded-full border border-black/10 shadow-2xs mb-1"
                            style={{ backgroundColor: item.shade.hex }}
                          />
                          <span className="text-[10px] font-medium text-stone-800 dark:text-stone-300 truncate w-full">
                            {item.shade.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Active Selected Product Info Box */}
              <div className="bg-stone-50 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={shade.image}
                      alt={shade.name}
                      className="w-14 h-14 object-cover rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800"
                    />
                    <div>
                      <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-rose-700 dark:text-amber-400 bg-rose-100/70 dark:bg-amber-950/60 px-2 py-0.5 rounded-full mb-1">
                        {product.finish}
                      </span>
                      <h4 className="font-serif text-base font-bold text-stone-900 dark:text-stone-50 leading-snug">
                        {product.name}
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                        Shade: <span className="text-stone-900 dark:text-amber-300 font-semibold">{shade.name}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                      {formatPrice(product.price)}
                    </div>
                    <button
                      id={`tryon-wishlist-toggle-${product.id}`}
                      onClick={() => toggleWishlist(product.id)}
                      className="text-stone-400 hover:text-rose-600 dark:hover:text-amber-400 mt-1 cursor-pointer"
                      title="Save to favorites"
                    >
                      <Heart
                        className={`w-4 h-4 ml-auto ${
                          isWishlisted(product.id) ? 'fill-rose-600 text-rose-600' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                  "{shade.swatchNote}"
                </p>

                {/* Instant Add to Bag CTA */}
                <button
                  id="tryon-add-to-bag-btn"
                  onClick={() => addToCart(product, shade, 1)}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {shade.name} to Bag • {formatPrice(product.price)}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
