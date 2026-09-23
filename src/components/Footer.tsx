import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Shield, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { showToast, setIsQuizOpen } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Welcome to the VIP Club! Use code LUXE15 at checkout.');
    setEmail('');
  };

  return (
    <footer className="bg-[#1C1917] dark:bg-[#0A0908] text-stone-300 pt-16 pb-12 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Newsletter Signup VIP Box */}
        <div className="bg-stone-900 dark:bg-[#12100E] border border-stone-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-300 bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The LuxeLips Circle</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight">
              Enjoy 15% Off Your First Couture Order
            </h3>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Receive secret archive drops, complimentary deluxe lip minis, and private invitations to Maryam's masterclasses.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-80 px-4 py-3 bg-stone-950/80 border border-stone-700 rounded-full text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="submit"
                id="footer-subscribe-btn"
                className="inline-flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <span>{subscribed ? 'Subscribed!' : 'Claim 15% Off'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-amber-300 font-medium flex items-center">
                <Check className="w-3.5 h-3.5 mr-1" />
                Check your inbox for your 15% welcome code or use <span className="font-bold ml-1">LUXE15</span>!
              </p>
            )}
          </div>
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="font-serif text-2xl tracking-[0.16em] font-semibold text-white">
              LUXE<span className="text-rose-500 font-normal">LIPS</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Couture, clean, and cruelty-free lip cosmetics crafted with skin-identical botanical care by Maryam.
            </p>
            <div className="pt-2 text-xs text-stone-400">
              <span className="text-stone-200 font-semibold block">Concierge Desk:</span>
              maryamirzawork@gmail.com
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Couture Lipsticks
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#shop-section" className="hover:text-white transition-colors">Luxe Velvet Rouge Matte</a></li>
              <li><a href="#shop-section" className="hover:text-white transition-colors">Silk Infusion Satin Glow</a></li>
              <li><a href="#shop-section" className="hover:text-white transition-colors">Glass Glaze Plumping Oil</a></li>
              <li><a href="#shop-section" className="hover:text-white transition-colors">Liquid Couture Matte Stain</a></li>
              <li><a href="#shop-section" className="hover:text-white transition-colors">The 4-Piece Icon Vault</a></li>
            </ul>
          </div>

          {/* Experience Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Services & Studio
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#virtual-try-on" className="hover:text-white transition-colors flex items-center">
                  <span>Virtual Lip Studio</span>
                  <span className="ml-1.5 text-[9px] bg-rose-900/60 text-rose-300 px-1.5 py-0.5 rounded">New</span>
                </a>
              </li>
              <li>
                <button onClick={() => setIsQuizOpen(true)} className="hover:text-white transition-colors text-left">
                  Find Your Signature Shade
                </button>
              </li>
              <li><a href="#brand-story" className="hover:text-white transition-colors">Founder’s Note</a></li>
              <li><a href="#reviews-section" className="hover:text-white transition-colors">Verified Customer Reviews</a></li>
              <li><span className="text-stone-500">Store Locator (Coming Soon)</span></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><span className="text-stone-300">Complimentary Shipping Over $50</span></li>
              <li><span>30-Day Hassle-Free Returns</span></li>
              <li><span>Clean & Leaping Bunny Certified</span></li>
              <li><span>Authentic Batch Guarantee</span></li>
              <li><span>Track Your Delivery</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center space-x-1">
            <span>© 2026 LuxeLips Cosmetics by Maryam (maryamworks521). All Rights Reserved.</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-stone-400">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
