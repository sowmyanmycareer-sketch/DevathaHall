import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MapPin, Truck, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_DETAILS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (deliveryMethod: 'doorstep' | 'store_pickup', discountAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [deliveryMethod, setDeliveryMethod] = useState<'doorstep' | 'store_pickup'>('doorstep');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'KOLAR10' || couponCode.trim().toUpperCase() === 'DEVATHA10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else if (couponCode.trim().toUpperCase() === 'SILK20' && subtotal >= 10000) {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "KOLAR10" for 10% off.');
      setCouponApplied(false);
      setDiscountPercent(0);
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = deliveryMethod === 'doorstep' ? (subtotal > 4999 ? 0 : 150) : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

  const formattedPrice = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAFAF8] text-[#1A1A1A] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Cart Drawer Header */}
          <div className="p-4 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1A1A1A]" />
              <h2 className="text-lg font-serif font-semibold text-[#1A1A1A] tracking-tight">Current Cart</h2>
              <span className="bg-stone-100 text-stone-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-xs border border-stone-200">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Choice Switcher */}
          <div className="p-4 bg-white border-b border-stone-200">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Fulfillment Mode</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDeliveryMethod('doorstep')}
                className={`p-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  deliveryMethod === 'doorstep'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Truck className="w-4 h-4" />
                Home Delivery
              </button>

              <button
                onClick={() => setDeliveryMethod('store_pickup')}
                className={`p-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  deliveryMethod === 'store_pickup'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Store Pickup
              </button>
            </div>

            {deliveryMethod === 'store_pickup' && (
              <div className="mt-2 text-[11px] text-stone-600 bg-stone-100 p-2.5 rounded-xs border border-stone-200">
                📍 Collect at Devatha Hall, Srinivasam, Doddapet Road, Kolar (Open till 21:00)
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 border border-stone-200">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif text-[#1A1A1A]">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Discover Devatha Hall's pure Kanjeevaram silk sarees, designer dresses, dhotis, and festive collections!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-black transition-all cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3.5 rounded-xs border border-stone-200 flex gap-3 relative group shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-xs bg-stone-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-serif text-[#1A1A1A] truncate font-semibold">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] uppercase tracking-wider text-stone-400">{item.product.fabric}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-[#1A1A1A]">
                        {formattedPrice(item.product.price)}
                      </span>

                      <div className="flex items-center bg-stone-100 rounded-xs border border-stone-200 px-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-6 h-6 text-xs text-stone-700 hover:text-black font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-6 h-6 text-xs text-stone-700 hover:text-black font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-4">
              
              {/* Coupon input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. KOLAR10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-[#FAFAF8] text-[#1A1A1A] placeholder-stone-400 text-xs px-3 py-2 rounded-xs border border-stone-200 uppercase font-mono focus:outline-none focus:border-[#1A1A1A]"
                  />
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-[#1A1A1A] text-xs font-bold uppercase tracking-widest rounded-xs border border-stone-300 cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {couponApplied && (
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center justify-between bg-emerald-50 p-2.5 rounded-xs border border-emerald-200">
                  <span>🎉 Coupon applied! {discountPercent}% Off</span>
                  <span>-{formattedPrice(discountAmount)}</span>
                </div>
              )}

              {couponError && (
                <div className="text-[11px] text-rose-600 font-medium">{couponError}</div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A]">{formattedPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Festive Discount</span>
                    <span>-{formattedPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    Delivery ({deliveryMethod === 'store_pickup' ? 'Store Pickup' : 'Home Delivery'})
                  </span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[10px] tracking-widest">FREE</span>
                    ) : (
                      formattedPrice(deliveryFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-3 border-t border-stone-200">
                  <span className="font-serif">Total Estimate</span>
                  <span className="font-serif text-[#1A1A1A] text-base">{formattedPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={() => onProceedToCheckout(deliveryMethod, discountAmount)}
                className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded-xs text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 uppercase tracking-widest pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Secure Checkout • Devatha Hall Kolar</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
