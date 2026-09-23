import React, { useState } from 'react';
import { Sparkles, Gift, Check, ShoppingBag, Plus, X, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Shade, Product } from '../types';

export const CustomBundleBuilder: React.FC = () => {
  const { addToCart, formatPrice, showToast, theme } = useCart();

  // All available shades
  const allShadePairs = PRODUCTS.flatMap((product) =>
    product.shades.map((shade) => ({ product, shade }))
  );

  const [selectedShades, setSelectedShades] = useState<{ product: Product; shade: Shade }[]>([
    allShadePairs[0], // Crimson Royale
    allShadePairs[1], // Tuscan Rose
    allShadePairs[2], // Cashmere Nude
  ]);

  const [boxFinish, setBoxFinish] = useState<'Obsidian Gold' | 'Champagne Rose' | 'Velvet Noir'>('Obsidian Gold');
  const [monogram, setMonogram] = useState('M.M.');
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);

  const bundleOriginalPrice = selectedShades.reduce((sum, s) => sum + s.product.price, 0);
  const bundleDiscountedPrice = 78; // Special fixed luxury bundle price (~25% off)
  const savings = Math.max(0, bundleOriginalPrice - bundleDiscountedPrice);

  const handleSelectShadeForSlot = (item: { product: Product; shade: Shade }, slotIndex: number) => {
    const updated = [...selectedShades];
    updated[slotIndex] = item;
    setSelectedShades(updated);
    setActiveSlotIndex(null);
    showToast(`Added ${item.shade.name} to your custom vault`);
  };

  const handleAddBundleToBag = () => {
    // Add all 3 to cart with special bundle tag
    selectedShades.forEach((item) => {
      addToCart(item.product, item.shade, 1);
    });
    showToast(`Custom Monogrammed Vault (${monogram}) added to your bag!`);
  };

  const boxColors = {
    'Obsidian Gold': 'bg-gradient-to-br from-stone-900 via-stone-950 to-black text-amber-300 border-amber-500/40',
    'Champagne Rose': 'bg-gradient-to-br from-[#FAF0EA] via-[#F4E3DB] to-[#EBD0C5] text-stone-900 border-rose-300/60',
    'Velvet Noir': 'bg-gradient-to-br from-[#1C0D12] via-[#2A121A] to-[#12070A] text-rose-200 border-rose-900/60'
  };

  return (
    <section id="custom-vault" className="py-20 lg:py-28 bg-[#FAF7F5] dark:bg-[#121110] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 mb-3 shadow-2xs">
            <Gift className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-amber-950 dark:text-amber-300">
              Bespoke Atelier • Save 25%
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
            Curate Your Couture Lip Vault
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Select any 3 luxury lipsticks or oils, choose your keepsake vanity box finish, 
            and add complimentary custom gold foil monogramming.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive 3D Keepsake Box Visual */}
          <div className="lg:col-span-6 bg-white dark:bg-[#181614] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xl flex flex-col justify-between space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                Live Vault Preview
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Includes Gift Packaging
              </span>
            </div>

            {/* Keepsake Box Visual Representation */}
            <div className={`rounded-3xl p-6 sm:p-8 border-2 shadow-2xl relative overflow-hidden transition-all duration-500 ${boxColors[boxFinish]}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Gold foil emblem & Monogram engraving */}
              <div className="flex items-center justify-between pb-6 border-b border-white/20">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-75">
                    LUXELIPS PARIS • ATELIER
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-bold tracking-wider mt-0.5">
                    The 3-Piece Couture Vault
                  </div>
                </div>

                {/* Monogram Stamp */}
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/80 flex items-center justify-center bg-black/30 backdrop-blur-xs shadow-md">
                  <span className="font-serif text-lg font-bold tracking-widest text-amber-300">
                    {monogram || 'M.M.'}
                  </span>
                </div>
              </div>

              {/* 3 Lipstick Bullets in velvet slots */}
              <div className="grid grid-cols-3 gap-4 py-8">
                {selectedShades.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveSlotIndex(idx)}
                    className="group/slot flex flex-col items-center bg-black/25 backdrop-blur-md rounded-2xl p-3 border border-white/15 hover:border-amber-400/60 transition-all cursor-pointer relative"
                  >
                    <span className="text-[10px] uppercase font-bold opacity-60 mb-2">
                      Slot 0{idx + 1}
                    </span>

                    {/* Lipstick Bullet graphic */}
                    <div className="relative w-12 h-24 sm:w-14 sm:h-28 flex flex-col items-center">
                      {/* Bullet tip with shade color */}
                      <div 
                        className="w-7 h-10 rounded-t-full shadow-lg transition-transform group-hover/slot:scale-105"
                        style={{ backgroundColor: item.shade.hex }}
                      />
                      {/* Gold metallic collar */}
                      <div className="w-8 h-4 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 rounded-t-xs border border-amber-100/50 shadow-xs" />
                      {/* Heavy weighted brass base */}
                      <div className="w-9 h-12 bg-gradient-to-b from-stone-800 to-stone-950 rounded-b-md border border-stone-700/80 shadow-md flex items-center justify-center">
                        <span className="text-[8px] font-serif text-amber-300 tracking-tighter opacity-80">
                          LUXE
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-center mt-3 truncate w-full">
                      {item.shade.name}
                    </span>
                    <span className="text-[9px] opacity-70 text-center truncate w-full">
                      {item.product.finish}
                    </span>

                    <button className="text-[10px] text-amber-300 underline mt-1 opacity-0 group-hover/slot:opacity-100 transition-opacity">
                      Change
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/20 text-xs">
                <span className="text-[11px] opacity-80">Box: {boxFinish}</span>
                <span className="text-[11px] opacity-80">Engraving: "{monogram}"</span>
              </div>
            </div>

            {/* Price & Summary */}
            <div className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
                    {formatPrice(bundleDiscountedPrice)}
                  </span>
                  <span className="text-xs text-stone-400 line-through">
                    {formatPrice(bundleOriginalPrice)}
                  </span>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  You save {formatPrice(savings)} with this bespoke bundle!
                </span>
              </div>

              <button
                id="add-custom-vault-btn"
                onClick={handleAddBundleToBag}
                className="inline-flex items-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Vault to Bag</span>
              </button>
            </div>

          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Step 1: Slot Selectors */}
            <div className="bg-white dark:bg-[#181614] rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  1. Customize The 3 Shades
                </h3>
                <span className="text-xs text-stone-500">Tap a slot to swap shade</span>
              </div>

              <div className="space-y-3">
                {selectedShades.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                      activeSlotIndex === idx
                        ? 'border-stone-900 dark:border-amber-400 bg-rose-50/50 dark:bg-rose-950/20 ring-2 ring-stone-900/10 dark:ring-amber-400/20'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-full border border-black/10 shadow-2xs flex-shrink-0"
                        style={{ backgroundColor: item.shade.hex }}
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          Slot 0{idx + 1}: {item.shade.name}
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          {item.product.name} • {item.product.finish}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveSlotIndex(activeSlotIndex === idx ? null : idx)}
                      className="text-xs font-semibold text-rose-800 dark:text-amber-400 hover:underline px-3 py-1"
                    >
                      {activeSlotIndex === idx ? 'Close Picker' : 'Change Shade'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Shade Picker dropdown if slot active */}
              {activeSlotIndex !== null && (
                <div className="p-4 bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-300 dark:border-stone-700 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Select Shade for Slot 0{activeSlotIndex + 1}:
                    </span>
                    <button onClick={() => setActiveSlotIndex(null)} className="text-stone-400 hover:text-stone-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto pr-1">
                    {allShadePairs.map((pair, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSelectShadeForSlot(pair, activeSlotIndex)}
                        className="flex flex-col items-center p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-stone-900 dark:hover:border-amber-400 transition-all text-center"
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-black/10 shadow-2xs mb-1"
                          style={{ backgroundColor: pair.shade.hex }}
                        />
                        <span className="text-[10px] font-medium text-stone-800 dark:text-stone-200 truncate w-full">
                          {pair.shade.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Keepsake Box Finish */}
            <div className="bg-white dark:bg-[#181614] rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                2. Choose Vanity Keepsake Box Finish
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'Obsidian Gold', label: 'Obsidian Gold', desc: 'Noir velvet with 24k gold foil' },
                  { id: 'Champagne Rose', label: 'Champagne Rose', desc: 'Warm nude pink with pearl sheen' },
                  { id: 'Velvet Noir', label: 'Velvet Noir', desc: 'Midnight berry with rose gold foil' }
                ].map((box) => (
                  <button
                    key={box.id}
                    onClick={() => setBoxFinish(box.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      boxFinish === box.id
                        ? 'border-stone-900 dark:border-amber-400 bg-stone-50 dark:bg-stone-900 ring-2 ring-stone-900/10 dark:ring-amber-400/20'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">{box.label}</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">{box.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Complimentary Monogram Engraving */}
            <div className="bg-white dark:bg-[#181614] rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  3. Complimentary Monogram Stamp
                </h3>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                  Free Service
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. M.M."
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  className="w-32 text-center text-sm font-serif font-bold uppercase tracking-widest p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Up to 4 characters gold-embossed on the center wax-seal emblem.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
