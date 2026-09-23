import React, { useState } from 'react';
import { Sparkles, Droplets, Leaf, Shield, Sun, CheckCircle, Award } from 'lucide-react';
import { INGREDIENTS_DATA } from '../data/expandedData';

export const IngredientsDeepDive: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const icons = [Sparkles, Droplets, Leaf, Shield, Sun];

  return (
    <section id="ingredients-science" className="py-20 lg:py-28 bg-[#FAF7F5] dark:bg-[#121110] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full mb-3">
            <Leaf className="w-3.5 h-3.5" />
            <span>Clean Science & Botanical Alchemy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
            Formulated With Skincare Actives
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            We banish heavy petroleum byproducts and animal derivatives in favor of biomimetic botanicals that actively restore lip moisture.
          </p>
        </div>

        {/* 5 Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Ingredients selector list */}
          <div className="md:col-span-5 space-y-3">
            {INGREDIENTS_DATA.map((item, idx) => {
              const Icon = icons[idx % icons.length];
              const isSelected = selectedIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-stone-900 dark:border-amber-400 bg-white dark:bg-[#181614] shadow-md ring-2 ring-stone-900/10 dark:ring-amber-400/20'
                      : 'border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/40 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">
                        Origin: {item.origin}
                      </div>
                    </div>
                  </div>

                  <span className={`text-xs font-semibold ${isSelected ? 'text-amber-700 dark:text-amber-400' : 'text-stone-400'}`}>
                    {isSelected ? 'Viewing' : 'Details'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Active Focus Showcase */}
          <div className="md:col-span-7 bg-white dark:bg-[#181614] rounded-3xl p-8 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                  Origin: {INGREDIENTS_DATA[selectedIdx].origin}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
                  {INGREDIENTS_DATA[selectedIdx].name}
                </h3>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-2xl border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                <Award className="w-6 h-6" />
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 mb-1">
                Primary Physiological Function:
              </div>
              <div className="text-base font-semibold text-stone-900 dark:text-stone-200">
                {INGREDIENTS_DATA[selectedIdx].role}
              </div>
            </div>

            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              {INGREDIENTS_DATA[selectedIdx].description}
            </p>

            {/* Clinical stats callout */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl">
                <div className="font-serif text-2xl font-bold text-stone-900 dark:text-amber-300">+84%</div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Hydration retention after 8 hours</div>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl">
                <div className="font-serif text-2xl font-bold text-stone-900 dark:text-amber-300">100%</div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Leaping Bunny Certified Vegan</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
