import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Gift, 
  CheckCircle,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    formatPrice,
    cartSubtotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    cartTotal,
    promoCode,
    applyPromoCode,
    setIsCheckoutOpen
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isGiftNote, setIsGiftNote] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  if (!isCartOpen) return null;

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const result = applyPromoCode(inputCode);
    if (result.success) {
      setCouponSuccess(result.message);
      setCouponError(null);
      setInputCode('');
    } else {
      setCouponError(result.message);
      setCouponSuccess(null);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F5] dark:bg-[#12100E] shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 transition-colors">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 bg-white dark:bg-[#181614] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-stone-900 dark:text-stone-100" />
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-50">
                Your Shopping Bag
              </h3>
              <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold px-2 py-0.5 rounded-full">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              id="close-cart-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Ribbon */}
          <div className="bg-stone-50 dark:bg-[#151311] border-b border-stone-200/80 dark:border-stone-800 px-6 py-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center text-stone-700 dark:text-stone-300 font-medium">
                <Truck className="w-3.5 h-3.5 mr-1.5 text-stone-500 dark:text-stone-400" />
                {amountToFreeShipping > 0 ? (
                  <>
                    Add <span className="font-bold text-stone-900 dark:text-amber-300 mx-1">{formatPrice(amountToFreeShipping)}</span> for Free Shipping
                  </>
                ) : (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                    Unlocked: Complimentary Free Worldwide Shipping!
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            
            <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-700 dark:bg-amber-400 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900 flex items-center justify-center text-rose-800 dark:text-rose-300">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs">
                  Discover our couture lipsticks, hydrating velvets, and glass glaze oils to begin your luxury ritual.
                </p>
                <button
                  id="empty-cart-shop-now-btn"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full shadow-xs transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="bg-white dark:bg-[#181614] rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-2xs flex space-x-4 relative group"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0 border border-stone-200 dark:border-stone-700 relative">
                      <img
                        src={item.selectedShade.image}
                        alt={item.selectedShade.name}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                        style={{ backgroundColor: item.selectedShade.hex }}
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 truncate pr-2">
                            {item.product.name}
                          </h4>
                          <button
                            id={`remove-item-${item.id}`}
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                          Shade: <span className="font-semibold text-stone-900 dark:text-stone-200">{item.selectedShade.name}</span>
                        </p>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                          {item.product.finish}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-0.5 bg-stone-50 dark:bg-stone-900">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 p-0.5 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-900 dark:text-stone-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 p-0.5 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-serif text-sm font-bold text-stone-900 dark:text-amber-300">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Gift Option Checkbox */}
                <div className="bg-white dark:bg-[#181614] rounded-2xl p-3.5 border border-stone-200 dark:border-stone-800 text-xs">
                  <label className="flex items-center space-x-2 cursor-pointer font-medium text-stone-800 dark:text-stone-200">
                    <input
                      type="checkbox"
                      checked={isGiftNote}
                      onChange={(e) => setIsGiftNote(e.target.checked)}
                      className="rounded text-rose-700 focus:ring-rose-700"
                    />
                    <Gift className="w-4 h-4 text-rose-700 dark:text-rose-400" />
                    <span>Complimentary gift box & personal note</span>
                  </label>
                  {isGiftNote && (
                    <div className="mt-2.5">
                      <textarea
                        rows={2}
                        placeholder="Write a heartfelt note for the recipient..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="w-full text-xs p-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-800 dark:focus:ring-amber-400"
                      />
                    </div>
                  )}
                </div>

                {/* Promo Code Form */}
                <div className="bg-white dark:bg-[#181614] rounded-2xl p-3.5 border border-stone-200 dark:border-stone-800">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Promo code (e.g. LUXE15)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg uppercase text-stone-800 dark:text-stone-200 placeholder:normal-case placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-800 dark:focus:ring-amber-400"
                      />
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
                    </div>
                    <button
                      type="submit"
                      className="bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {couponSuccess && (
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1.5 font-medium">
                      {couponSuccess}
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-1.5 font-medium">
                      {couponError}
                    </p>
                  )}
                  {promoCode && (
                    <div className="mt-2 inline-flex items-center space-x-1 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      <span>Applied: {promoCode}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white dark:bg-[#181614] border-t border-stone-200 dark:border-stone-800 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                    <span>Discount ({promoCode})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                </div>

                <div className="flex justify-between text-stone-900 dark:text-stone-100 font-bold text-sm pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg text-stone-900 dark:text-amber-300">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                id="drawer-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full inline-flex items-center justify-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Proceed to Checkout • {formatPrice(cartTotal)}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[10px] text-center text-stone-400 dark:text-stone-500">
                Taxes calculated at checkout. Safe & Encrypted 256-Bit SSL Checkout.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
