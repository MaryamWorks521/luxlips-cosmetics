import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, Search, Mail, MessageSquare } from 'lucide-react';
import { FAQ_DATA } from '../data/expandedData';
import { FAQItem } from '../types';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const categories = ['All', 'Formulation', 'Shade Matching', 'Orders & Shipping', 'Ethics & Clean'];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq-section" className="py-20 lg:py-28 bg-white dark:bg-[#0D0C0B] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Client Concierge & FAQs</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-stone-500 dark:text-stone-400 text-xs sm:text-sm">
            Everything you need to know about our couture formulas, ethical sourcing, and white-glove shipping.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search questions (e.g. shipping, vegan, wear time)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-full text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="bg-[#FAF7F5] dark:bg-[#181614] rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1 rounded-full text-stone-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-stone-900 dark:text-amber-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-200/60 dark:border-stone-800/80 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Concierge Help Box */}
        <div className="bg-[#FAF7F5] dark:bg-[#181614] rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 text-center space-y-3">
          <h4 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            Have a Specific Shade or Formulation Question?
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Maryam’s personal beauty concierge is standing by to provide bespoke color matching advice.
          </p>
          <div className="pt-2">
            <a
              href="mailto:maryamirzawork@gmail.com"
              className="inline-flex items-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Maryam’s Concierge</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
