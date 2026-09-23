import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Shade, CartItem, Currency, ThemeMode } from '../types';
import { CURRENCIES, PRODUCTS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  currency: Currency;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (t: ThemeMode) => void;
  setCurrency: (c: Currency) => void;
  addToCart: (product: Product, shade: Shade, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  promoCode: string;
  discountRate: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  formatPrice: (amountInUSD: number) => string;
  cartSubtotal: number; // in USD
  discountAmount: number; // in USD
  shippingFee: number; // in USD
  freeShippingThreshold: number; // 50 USD
  cartTotal: number; // in USD
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('luxelips_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('luxelips_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('luxelips_wishlist');
      return saved ? JSON.parse(saved) : ['luxe-velvet-rouge', 'glass-glaze-lip-oil'];
    } catch {
      return ['luxe-velvet-rouge', 'glass-glaze-lip-oil'];
    }
  });

  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('luxelips_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = "bg-[#0D0C0B] text-stone-100 font-sans antialiased selection:bg-rose-900 selection:text-white";
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = "bg-[#FAF7F5] text-stone-900 font-sans antialiased selection:bg-rose-200 selection:text-rose-950";
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
    showToast(theme === 'light' ? 'Switched to Luxury Noir Mode' : 'Switched to Champagne Light Mode');
  };

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
  };

  useEffect(() => {
    localStorage.setItem('luxelips_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxelips_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product: Product, shade: Shade, quantity = 1) => {
    const cartItemId = `${product.id}-${shade.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedShade: shade, quantity }];
    });
    showToast(`Added ${shade.name} to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from your bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from favorites' : 'Saved to favorites');
      return updated;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LUXE15') {
      setPromoCode('LUXE15');
      setDiscountRate(0.15);
      showToast('15% Welcome Discount applied!');
      return { success: true, message: '15% discount applied successfully!' };
    }
    if (clean === 'MARYAM20' || clean === 'GLAM20') {
      setPromoCode(clean);
      setDiscountRate(0.2);
      showToast('20% VIP code applied!');
      return { success: true, message: '20% VIP code applied successfully!' };
    }
    if (clean === 'FREESHIP') {
      setPromoCode('FREESHIP');
      setDiscountRate(0.01); // symbolic flag
      showToast('Free Worldwide Shipping unlocked!');
      return { success: true, message: 'Free shipping unlocked on your order!' };
    }
    return { success: false, message: 'Invalid code. Try "LUXE15" or "MARYAM20"' };
  };

  const formatPrice = (amountInUSD: number) => {
    const converted = amountInUSD * currency.rate;
    if (currency.code === 'PKR') {
      return `${currency.symbol} ${Math.round(converted).toLocaleString()}`;
    }
    if (currency.code === 'AED') {
      return `${currency.symbol} ${converted.toFixed(2)}`;
    }
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = promoCode === 'FREESHIP' ? 0 : cartSubtotal * discountRate;
  const freeShippingThreshold = 50;
  const shippingFee =
    cartSubtotal >= freeShippingThreshold || promoCode === 'FREESHIP' || cart.length === 0 ? 0 : 8;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        theme,
        toggleTheme,
        setTheme,
        setCurrency,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        isQuizOpen,
        setIsQuizOpen,
        promoCode,
        discountRate,
        applyPromoCode,
        formatPrice,
        cartSubtotal,
        discountAmount,
        shippingFee,
        freeShippingThreshold,
        cartTotal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
