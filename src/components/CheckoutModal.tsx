import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  ArrowRight,
  PackageCheck,
  Building,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    formatPrice,
    cartTotal,
    discountAmount,
    shippingFee,
    promoCode,
    clearCart
  } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  
  // Shipping Form State
  const [formData, setFormData] = useState({
    firstName: 'Maryam',
    lastName: 'Mirza',
    email: 'maryamirzawork@gmail.com',
    phone: '+1 (555) 234-8901',
    address: '450 Haute Boulevard, Apt 12B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    shippingMethod: 'standard'
  });

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [cardData, setCardData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'Maryam Mirza',
    expiry: '08/28',
    cvv: '892'
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate Order ID
    const randomOrder = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrder);
    setStep('confirmed');

    // Fire luxury celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#be185d', '#d4af37', '#1c1917', '#f43f5e']
      });
    } catch {
      // ignore
    }
  };

  const handleFinish = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 dark:bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-[#181614] w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-stone-900 dark:text-stone-100"
      >
        {/* Header */}
        <div className="bg-[#FAF7F5] dark:bg-[#12100E] border-b border-stone-200 dark:border-stone-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            <span className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
              {step === 'confirmed' ? 'Order Confirmed' : 'LuxeLips Secure Checkout'}
            </span>
          </div>

          {step !== 'confirmed' && (
            <button
              id="close-checkout-btn"
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Checkout Steps Body */}
        <div className="p-6 sm:p-8">
          
          {/* Step 1: Shipping Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  1. Contact & Shipping Address
                </h4>
                <span className="text-xs text-stone-500 dark:text-stone-400">Step 1 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address (for order tracking)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* Delivery method options */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Shipping Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-stone-900 dark:border-amber-400 bg-stone-50 dark:bg-stone-900 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-stone-900 dark:text-amber-300" />
                      <div>
                        <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Standard Delivery</div>
                        <div className="text-[10px] text-stone-500 dark:text-stone-400">3-5 Business Days</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">FREE</span>
                  </div>

                  <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 flex items-center justify-between opacity-80">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <div>
                        <div className="text-xs font-bold">Express White Glove</div>
                        <div className="text-[10px]">1-2 Business Days</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold">$12.00</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
                <span className="font-serif text-lg font-bold text-stone-900 dark:text-amber-300">
                  Total: {formatPrice(cartTotal)}
                </span>

                <button
                  type="submit"
                  id="continue-to-payment-btn"
                  className="inline-flex items-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment Method */}
          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  2. Select Payment Method
                </h4>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-rose-700 dark:text-rose-400 hover:underline font-medium cursor-pointer"
                >
                  Edit Shipping
                </button>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'applepay', label: 'Digital Pay', icon: Smartphone },
                  { id: 'cod', label: 'Cash on Deliv.', icon: Building }
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                        isSelected
                          ? 'border-stone-900 dark:border-amber-400 bg-stone-50 dark:bg-stone-900 ring-2 ring-stone-900/10 dark:ring-amber-400/20 shadow-xs'
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-stone-800 dark:text-stone-200" />
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Card inputs */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        required
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'applepay' && (
                <div className="p-6 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 text-center space-y-2">
                  <Smartphone className="w-8 h-8 mx-auto text-stone-800 dark:text-stone-200" />
                  <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    Instant 1-Click Checkout with Apple Pay / Google Pay
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Biometric authentication will be initiated upon order placement.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-6 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 text-center space-y-2">
                  <Building className="w-8 h-8 mx-auto text-stone-800 dark:text-stone-200" />
                  <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    Cash on Delivery Available
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Pay safely at your doorstep upon inspecting your luxury package.
                  </p>
                </div>
              )}

              {/* Order items preview summary */}
              <div className="p-3 bg-white dark:bg-[#12100E] rounded-xl border border-stone-200 dark:border-stone-800 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {cart.length} item(s) selected
                  </span>
                  {promoCode && (
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-bold">
                      Code {promoCode} applied (-{formatPrice(discountAmount)})
                    </span>
                  )}
                </div>
                <span className="font-serif text-base font-bold text-stone-900 dark:text-amber-300">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  id="place-order-btn"
                  className="inline-flex items-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-stone-950" />
                  <span>Place Order • {formatPrice(cartTotal)}</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Order Confirmed Receipt */}
          {step === 'confirmed' && (
            <div className="space-y-6 text-center animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-700 dark:text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
                  Thank You For Your Order!
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Your luxury package is being prepared with white-glove care.
                </p>
                <div className="mt-3 inline-block bg-stone-100 dark:bg-stone-800 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-stone-800 dark:text-stone-200">
                  Order ID: {orderNumber}
                </div>
              </div>

              {/* Order Details Receipt Card */}
              <div className="bg-[#FAF7F5] dark:bg-[#12100E] rounded-2xl p-5 border border-stone-200 dark:border-stone-800 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Shipping to:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 text-right">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}, {formData.city}
                  </span>
                </div>

                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Estimated Delivery:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    3-5 Business Days
                  </span>
                </div>

                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Payment Status:</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    Verified & Confirmed
                  </span>
                </div>

                <div className="flex justify-between font-bold text-stone-900 dark:text-stone-100 text-sm pt-1">
                  <span>Grand Total:</span>
                  <span className="font-serif text-base text-stone-900 dark:text-amber-300">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="confirm-continue-shopping-btn"
                  onClick={handleFinish}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>Continue Exploring LuxeLips</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
