import React from 'react';
import { Sparkles, Heart, ShieldCheck, Droplet, Award, Quote } from 'lucide-react';
import { BRAND_VALUES, EDITORIAL_QUOTES } from '../data/products';

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story" className="py-20 lg:py-28 bg-[#F5EFEB] dark:bg-[#12100E] border-t border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        
        {/* Editorial Quotes Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDITORIAL_QUOTES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 dark:bg-[#1C1917]/90 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-rose-300 dark:text-amber-500/50 mb-4" />
                <p className="font-serif text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-900 dark:text-amber-300">
                  {item.source}
                </span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                  {item.city}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Founder Story Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Visual Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800 bg-stone-200 dark:bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Maryam - Founder & Creative Director of LuxeLips"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Signature Tag */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-white/95 dark:bg-[#1C1917]/95 border border-stone-200 dark:border-stone-700 rounded-2xl p-5 shadow-xl max-w-xs backdrop-blur-md">
                <div className="flex items-center space-x-2 text-rose-800 dark:text-amber-400 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Founder's Promise
                  </span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 italic font-serif">
                  "No compromise between high-fashion pigment and soothing lip nourishment."
                </p>
                <p className="text-[11px] font-bold text-stone-900 dark:text-stone-100 mt-2">
                  Maryam Mirza <span className="font-normal text-stone-500 dark:text-stone-400">— Founder</span>
                </p>
              </div>
            </div>
          </div>

          {/* Copy Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900">
              <Heart className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-rose-950 dark:text-rose-300">
                The LuxeLips Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
              Crafted For Every Complexion. <br />
              <span className="italic font-serif text-rose-900 dark:text-amber-300">Formulated Without Compromise.</span>
            </h2>

            <div className="space-y-4 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
              <p>
                LuxeLips was born out of Maryam's frustration with traditional luxury lipsticks that either cracked on the lips after an hour or washed out deeper skin tones. We set out to reimagine the lip ritual from the ground up.
              </p>
              <p>
                Every single formula begins with restorative skincare actives — botanical cold-pressed French camellia oil, sugarcane squalane, and multi-molecular hyaluronic acid spheres — before we infuse our micro-micronized couture pigments.
              </p>
              <p>
                The result is a featherweight, 16-hour cushion wear that treats your lips while turning heads wherever you smile.
              </p>
            </div>

            {/* Core Values 4-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {BRAND_VALUES.map((val, i) => (
                <div key={i} className="p-4 bg-white/70 dark:bg-[#181614]/80 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-1">
                    {val.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
