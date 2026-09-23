import React, { useState, useMemo } from 'react';
import { 
  CartProvider, 
  useCart 
} from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VirtualTryOn } from './components/VirtualTryOn';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ShadeQuizModal } from './components/ShadeQuizModal';
import { BrandStory } from './components/BrandStory';
import { ReviewsSection } from './components/ReviewsSection';
import { CommunityGallery } from './components/CommunityGallery';
import { Footer } from './components/Footer';

// New high-craft editorial components
import { CustomBundleBuilder } from './components/CustomBundleBuilder';
import { ArmSwatchComparison } from './components/ArmSwatchComparison';
import { RunwayTrends } from './components/RunwayTrends';
import { LipRitualGuide } from './components/LipRitualGuide';
import { IngredientsDeepDive } from './components/IngredientsDeepDive';
import { FAQSection } from './components/FAQSection';

import { PRODUCTS } from './data/products';
import { ProductCategory, ShadeFamily } from './types';
import { 
  Sparkles, 
  Search, 
  X, 
  ArrowUpDown,
  CheckCircle2
} from 'lucide-react';

const MainShop: React.FC = () => {
  const { toastMessage, setIsQuizOpen } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedShadeFamily, setSelectedShadeFamily] = useState<ShadeFamily | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.finish.toLowerCase().includes(q) ||
          p.shades.some(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              s.family.toLowerCase().includes(q) ||
              s.swatchNote.toLowerCase().includes(q)
          )
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Shade family filter
    if (selectedShadeFamily !== 'all') {
      list = list.filter((p) => p.shades.some((s) => s.family === selectedShadeFamily));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, selectedCategory, selectedShadeFamily, sortBy]);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Formulations' },
    { id: 'matte', label: 'Velvet Matte' },
    { id: 'satin', label: 'Silk Satin' },
    { id: 'oil', label: 'Plumping Lip Oil' },
    { id: 'gloss', label: 'High-Shine Gloss' },
    { id: 'liner', label: 'Lip Definers' },
    { id: 'sets', label: 'Vault Sets' },
  ];

  const shadeFamilies: { id: ShadeFamily | 'all'; label: string; hex?: string }[] = [
    { id: 'all', label: 'All Shades' },
    { id: 'Nude', label: 'Nudes & Caramels', hex: '#c28773' },
    { id: 'Red', label: 'Classic Scarlet Reds', hex: '#9e1b24' },
    { id: 'Pink', label: 'Roses & Pinks', hex: '#cc6b7a' },
    { id: 'Berry', label: 'Berries & Wine', hex: '#5c1b2f' },
    { id: 'Coral', label: 'Warm Terracotta', hex: '#b95138' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] dark:bg-[#0D0C0B] text-stone-900 dark:text-stone-100 selection:bg-rose-200 dark:selection:bg-amber-900 transition-colors">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-[#1C1917] dark:bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 border border-stone-700 dark:border-stone-800 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header with Dark / Light toggle & Currency Switcher */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateSection={scrollToSection}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={() => scrollToSection('shop-section')}
        onTryOnClick={() => scrollToSection('virtual-try-on')}
      />

      {/* Main Collection / Shop Section */}
      <main id="shop-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-950 dark:text-rose-300">
                The Curated Wardrobe
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 dark:text-stone-50 leading-tight">
              Explore The Formulations
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm mt-1 max-w-md">
              Each lipstick bullet is encased in an ultra-luxurious magnetic closure with precision tear-drop bullet.
            </p>
          </div>

          {/* Quick Quiz Callout */}
          <button
            id="catalog-shade-finder-btn"
            onClick={() => setIsQuizOpen(true)}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-rose-900 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-950/50 hover:bg-rose-200/70 dark:hover:bg-rose-900/60 px-4 py-2.5 rounded-full border border-rose-200 dark:border-rose-800 transition-colors self-start md:self-auto cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Not sure which shade? Take the 1-Min Quiz</span>
          </button>
        </div>

        {/* Filter Bar: Categories */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 shadow-xs font-semibold'
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Bar: Shade Color Families & Sort Selector */}
        <div className="bg-white dark:bg-[#181614] rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-2xs mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Shade Families */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mr-1">
              Shade Family:
            </span>
            {shadeFamilies.map((fam) => (
              <button
                key={fam.id}
                id={`filter-shade-${fam.id.toLowerCase()}`}
                onClick={() => setSelectedShadeFamily(fam.id)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedShadeFamily === fam.id
                    ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold border border-stone-900 dark:border-amber-400'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900 border border-transparent'
                }`}
              >
                {fam.hex && (
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 inline-block"
                    style={{ backgroundColor: fam.hex }}
                  />
                )}
                <span>{fam.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 self-end lg:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Sort by:</span>
            <select
              id="product-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-1.5 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-400 cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Active Filter Chips */}
        {(selectedCategory !== 'all' || selectedShadeFamily !== 'all' || searchQuery) && (
          <div className="flex items-center space-x-2 mb-6 text-xs text-stone-600 dark:text-stone-400 flex-wrap gap-2">
            <span className="font-semibold text-stone-700 dark:text-stone-300">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-2.5 py-1 rounded-full text-[11px] font-medium text-stone-800 dark:text-stone-200">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="ml-1 text-stone-400 hover:text-stone-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedShadeFamily !== 'all' && (
              <span className="inline-flex items-center bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-2.5 py-1 rounded-full text-[11px] font-medium text-stone-800 dark:text-stone-200">
                {selectedShadeFamily}
                <button onClick={() => setSelectedShadeFamily('all')} className="ml-1 text-stone-400 hover:text-stone-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-2.5 py-1 rounded-full text-[11px] font-medium text-stone-800 dark:text-stone-200">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="ml-1 text-stone-400 hover:text-stone-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedShadeFamily('all');
                setSearchQuery('');
              }}
              className="text-rose-800 dark:text-amber-400 hover:underline font-semibold ml-2 text-[11px] cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-[#181614] rounded-3xl p-12 text-center border border-stone-200 dark:border-stone-800 max-w-lg mx-auto space-y-4 my-8 shadow-xs">
            <Search className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-200">
              No matching lip products found
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Try resetting your category or shade filter to discover all LuxeLips shades.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedShadeFamily('all');
                setSearchQuery('');
              }}
              className="bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider py-2.5 px-6 rounded-full"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </main>

      {/* Bespoke 3-Piece Vault Custom Bundle Builder (New Feature) */}
      <CustomBundleBuilder />

      {/* Interactive Virtual Lip Studio */}
      <VirtualTryOn />

      {/* 5-Tone Arm Swatch Studio (New Feature) */}
      <ArmSwatchComparison />

      {/* 4-Step Haute Lip Ritual Masterclass (New Feature) */}
      <LipRitualGuide />

      {/* High Fashion Runway Trends & Look Pairings (New Feature) */}
      <RunwayTrends />

      {/* Clean Botanical Alchemy & Active Ingredient Deep Dive (New Feature) */}
      <IngredientsDeepDive />

      {/* Brand Story & Founder's Note */}
      <BrandStory />

      {/* Verified Reviews Section */}
      <ReviewsSection />

      {/* Instagram / Community Gallery */}
      <CommunityGallery />

      {/* Client Concierge & FAQ Section (New Feature) */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Global Modals & Slide-out Drawers */}
      <ProductQuickView />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <ShadeQuizModal />

    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainShop />
    </CartProvider>
  );
}

