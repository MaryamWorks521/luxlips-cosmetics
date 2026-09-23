import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  Check, 
  Copy,
  Sun,
  Moon,
  Layers,
  Gift
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CURRENCIES } from '../data/products';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  searchQuery,
  onNavigateSection
}) => {
  const { 
    cart, 
    wishlist, 
    currency, 
    setCurrency, 
    theme,
    toggleTheme,
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsQuizOpen,
    showToast
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('LUXE15');
    setCopiedCode(true);
    showToast('Promo code LUXE15 copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Streamlined primary links (compact & fits all screens)
  const primaryNavLinks = [
    { label: 'Collection', id: 'shop-section' },
    { label: 'Virtual Studio', id: 'virtual-try-on' },
    { label: 'Custom Vault', id: 'custom-vault' },
    { label: 'Reviews', id: 'reviews-section' }
  ];

  // Secondary items cleanly tucked in compact dropdown
  const moreLinks = [
    { label: 'Arm Swatches', id: 'arm-swatches' },
    { label: 'Lip Ritual Guide', id: 'lip-ritual' },
    { label: 'Runway Trends', id: 'runway-trends' },
    { label: 'Botanical Ingredients', id: 'ingredients-science' },
    { label: 'FAQs', id: 'faq-section' }
  ];

  const allNavLinks = [...primaryNavLinks, ...moreLinks];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F5]/95 dark:bg-[#0D0C0B]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      {/* Top Luxury Announcement Ribbon */}
      <div className="bg-[#1C1917] dark:bg-black text-stone-300 text-xs py-1.5 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-4">
            <span className="inline-flex items-center text-rose-300 font-medium tracking-wider uppercase text-[10px]">
              <Sparkles className="w-3 h-3 mr-1 text-amber-400" />
              100% Clean • Vegan • Cruelty-Free
            </span>
          </div>

          <div className="flex-1 text-center font-normal tracking-wide text-[11px] sm:text-xs">
            <span>Free Worldwide Shipping over $50</span>
            <span className="mx-2 text-stone-600">|</span>
            <span>Use code </span>
            <button 
              id="promo-code-btn"
              onClick={handleCopyCode}
              className="inline-flex items-center font-semibold text-amber-300 hover:text-amber-200 underline decoration-dotted underline-offset-2 ml-1 cursor-pointer transition-colors"
              title="Click to copy promo code"
            >
              LUXE15
              {copiedCode ? (
                <Check className="w-3 h-3 ml-1 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 ml-1 opacity-70" />
              )}
            </button>
            <span className="hidden sm:inline"> (15% Off)</span>
          </div>

          {/* Right Ribbon Controls: Currency Switcher */}
          <div className="flex items-center space-x-2">
            {/* Currency Switcher */}
            <div className="relative">
              <button
                id="currency-selector-btn"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center space-x-1 text-stone-300 hover:text-white text-[11px] font-medium tracking-wider transition-colors py-0.5 px-2 rounded hover:bg-stone-800 cursor-pointer"
              >
                <span>{currency.code} ({currency.symbol})</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isCurrencyDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-50"
                    onClick={() => setIsCurrencyDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-32 bg-stone-900 border border-stone-800 shadow-xl rounded-md py-1 z-50 text-left">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCurrency(c);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-stone-800 transition-colors ${
                          currency.code === c.code ? 'text-amber-400 font-semibold' : 'text-stone-300'
                        }`}
                      >
                        <span>{c.code}</span>
                        <span className="text-stone-400 text-[11px]">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              id="mobile-search-toggle"
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white ml-1 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo - Compact and elegant */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <button 
              id="brand-home-link"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block group text-left cursor-pointer"
            >
              <div className="flex items-baseline space-x-1">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.15em] font-semibold text-stone-900 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-amber-300 transition-colors">
                  LUXE<span className="text-rose-700 dark:text-rose-500 font-normal">LIPS</span>
                </span>
              </div>
              <p className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 font-medium">
                HAUTE LIP COSMETICS
              </p>
            </button>
          </div>

          {/* Desktop Navigation Links - Compact, fitting comfortably on any display */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-7">
            {primaryNavLinks.map((link) => (
              <button
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onNavigateSection(link.id)}
                className="text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-medium text-xs tracking-wider uppercase transition-colors py-1.5 relative group cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-700 dark:bg-amber-400 transition-all duration-200 group-hover:w-full" />
              </button>
            ))}

            {/* Compact More Dropdown */}
            <div className="relative">
              <button
                id="nav-more-dropdown-btn"
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className="text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-medium text-xs tracking-wider uppercase transition-colors py-1.5 flex items-center space-x-1 cursor-pointer"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {isMoreDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMoreDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-[#181614] border border-stone-200 dark:border-stone-800 shadow-xl rounded-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {moreLinks.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => {
                          onNavigateSection(link.id);
                          setIsMoreDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors cursor-pointer"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Bag */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Theme Switcher Icon Button */}
            <button
              id="main-theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-amber-300" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-stone-700" />
              )}
            </button>

            {/* Desktop Search */}
            <div className="relative hidden sm:block">
              {isSearchActive ? (
                <div className="relative flex items-center">
                  <input
                    id="desktop-search-input"
                    type="text"
                    placeholder="Search lipsticks, shades..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-40 sm:w-48 pl-8 pr-7 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-full text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-400 transition-all"
                    autoFocus
                  />
                  <Search className="w-3.5 h-3.5 absolute left-2.5 text-stone-400 pointer-events-none" />
                  <button
                    onClick={() => {
                      onSearchChange('');
                      setIsSearchActive(false);
                    }}
                    className="absolute right-2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="desktop-search-trigger"
                  onClick={() => setIsSearchActive(true)}
                  className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  aria-label="Search shades"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              id="wishlist-drawer-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              aria-label="View Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              id="cart-drawer-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-1.5 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-stone-100 dark:text-stone-950 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold tracking-wider transition-all shadow-sm group cursor-pointer"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-stone-200 dark:text-stone-950 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-4.5 h-4.5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center -mr-0.5">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search input dropdown */}
        {isSearchActive && (
          <div className="py-2.5 pb-4 md:hidden border-t border-stone-200 dark:border-stone-800">
            <div className="relative">
              <input
                id="mobile-search-input"
                type="text"
                placeholder="Search shades, matte, satin, gloss..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-800"
                autoFocus
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#FAF7F5] dark:bg-[#121110] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {allNavLinks.map((link) => (
              <button
                key={link.label}
                id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  onNavigateSection(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 text-xs uppercase tracking-wider font-medium text-stone-800 dark:text-stone-200 hover:text-rose-700 dark:hover:text-amber-300 transition-colors border-b border-stone-200/60 dark:border-stone-800/80 flex items-center justify-between"
              >
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl py-2.5 text-xs font-semibold uppercase tracking-wider"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
              <span>Toggle {theme === 'dark' ? 'Light Champagne' : 'Dark Noir'} Mode</span>
            </button>

            <button
              onClick={() => {
                setIsQuizOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-rose-900 dark:bg-rose-800 text-white rounded-xl py-2.5 text-xs font-semibold uppercase tracking-wider shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Find My Signature Shade</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
