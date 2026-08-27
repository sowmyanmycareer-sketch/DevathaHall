import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Building2, 
  Store, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Printer, 
  Download, 
  Package, 
  Truck, 
  Clock,
  Sparkles
} from 'lucide-react';
import { CartItem, CustomerDetails, PaymentMethod, Order } from '../types';
import { STORE_DETAILS } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  deliveryMethod: 'doorstep' | 'store_pickup';
  discountAmount: number;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  deliveryMethod,
  discountAmount,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');

  // Customer Form State
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Kolar',
    pincode: '563101',
    deliveryMethod: deliveryMethod,
    notes: ''
  });

  // Card details mock
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Completed Order state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = customer.deliveryMethod === 'doorstep' ? (subtotal > 4999 ? 0 : 150) : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

  const formattedPrice = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phone) {
      alert('Please fill in your Full Name and Contact Phone Number.');
      return;
    }
    setStep('payment');
  };

  const handleProcessPayment = () => {
    setStep('processing');

    setTimeout(() => {
      const newOrder: Order = {
        id: `DH-KOLAR-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...cartItems],
        customer: { ...customer },
        paymentMethod: paymentMethod,
        subtotal: subtotal,
        discountAmount: discountAmount,
        deliveryFee: deliveryFee,
        totalAmount: totalAmount,
        status: 'Received',
        paymentStatus: paymentMethod === 'cod_store' ? 'Pending at Store' : 'Paid',
        transactionId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`
      };

      setCompletedOrder(newOrder);
      onOrderCompleted(newOrder);
      setStep('success');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAFAF8] text-[#1A1A1A] rounded-sm border border-stone-300 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-base font-serif font-semibold text-[#1A1A1A]">
                {step === 'success' ? 'Order Receipt & Invoice' : 'Devatha Hall Checkout Portal'}
              </h2>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest">Srinivasam, Doddapet Road, Kolar</p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Multi-Step Wizard Indicator */}
        {step !== 'success' && (
          <div className="bg-[#FAFAF8] px-4 py-2 border-b border-stone-200 flex items-center justify-between text-[10px] uppercase tracking-widest font-semibold">
            <span className={step === 'details' ? 'text-[#1A1A1A] font-bold underline' : 'text-stone-400'}>
              1. Customer Info
            </span>
            <span className="text-stone-300">•</span>
            <span className={step === 'payment' ? 'text-[#1A1A1A] font-bold underline' : 'text-stone-400'}>
              2. Payment Selection
            </span>
            <span className="text-stone-300">•</span>
            <span className={step === 'processing' ? 'text-emerald-700 font-bold' : 'text-stone-400'}>
              3. Confirmation
            </span>
          </div>
        )}

        {/* Modal Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">

          {/* STEP 1: Customer & Shipping Details */}
          {step === 'details' && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="bg-white p-4 rounded-xs border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest text-[10px]">Order Overview</span>
                  <p className="text-[11px] text-stone-500">{cartItems.length} items in shopping bag</p>
                </div>
                <span className="text-base font-bold text-[#1A1A1A]">{formattedPrice(totalAmount)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sowmya N. Gowda"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full bg-white text-[#1A1A1A] placeholder-stone-400 text-xs px-3 py-2.5 rounded-xs border border-stone-200 focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-600 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 85532 99639"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-white text-[#1A1A1A] placeholder-stone-400 text-xs px-3 py-2.5 rounded-xs border border-stone-200 focus:outline-none focus:border-[#1A1A1A] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-600 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. customer@example.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full bg-white text-[#1A1A1A] placeholder-stone-400 text-xs px-3 py-2.5 rounded-xs border border-stone-200 focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              {customer.deliveryMethod === 'doorstep' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-600 mb-1">Delivery Address *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Door No, Street Name, Landmark (e.g. Near Doddapet Temple)"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full bg-white text-[#1A1A1A] placeholder-stone-400 text-xs p-3 rounded-xs border border-stone-200 focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-600 mb-1">City / Town</label>
                      <input
                        type="text"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full bg-white text-[#1A1A1A] text-xs px-3 py-2 rounded-xs border border-stone-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-stone-600 mb-1">Pincode</label>
                      <input
                        type="text"
                        value={customer.pincode}
                        onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                        className="w-full bg-white text-[#1A1A1A] text-xs px-3 py-2 rounded-xs border border-stone-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-xs border border-stone-200 space-y-1">
                  <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
                    <Store className="w-4 h-4 text-stone-800" />
                    Store Pickup Details
                  </span>
                  <p className="text-xs text-stone-700 font-medium">Devatha Hall, Srinivasam, Doddapet Road, Kolar, KA</p>
                  <p className="text-[11px] text-stone-500">Timings: 9:30 AM – 9:00 PM • Phone: {STORE_DETAILS.phone}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded-xs text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all mt-4 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Secure Payment Method Selection */}
          {step === 'payment' && (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between text-xs text-stone-700 bg-white p-3.5 rounded-xs border border-stone-200">
                <span>Paying to: <strong className="text-[#1A1A1A]">Devatha Hall Kolar</strong></span>
                <span className="text-sm font-bold text-[#1A1A1A]">{formattedPrice(totalAmount)}</span>
              </div>

              {/* Payment Methods selector */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Select Payment Method</div>

                {/* UPI / QR Code */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'upi' ? 'bg-white border-[#1A1A1A] shadow-xs' : 'bg-white border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#1A1A1A] flex items-center justify-between">
                      <span>UPI / QR Code (GPay, PhonePe, Paytm, BHIM)</span>
                      <span className="text-[9px] text-emerald-700 font-bold uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">Instant</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Scan UPI QR Code directly with your smartphone</p>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3 p-4 bg-[#FAFAF8] rounded-xs border border-stone-200 flex flex-col items-center text-center">
                        <div className="w-32 h-32 bg-white p-2 rounded-xs shadow-xs border border-stone-200 flex items-center justify-center">
                          {/* QR Code SVG */}
                          <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M0,0 h30 v30 h-30 z M10,10 v10 h10 v-10 z" />
                            <path d="M70,0 h30 v30 h-30 z M80,10 v10 h10 v-10 z" />
                            <path d="M0,70 h30 v30 h-30 z M10,80 v10 h10 v-10 z" />
                            <rect x="40" y="40" width="20" height="20" />
                            <rect x="35" y="10" width="10" height="20" />
                            <rect x="75" y="45" width="15" height="15" />
                            <rect x="5" y="45" width="15" height="15" />
                            <rect x="50" y="75" width="20" height="20" />
                          </svg>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#1A1A1A] mt-2">UPI ID: devathahall@upi</span>
                        <span className="text-[10px] text-stone-500 uppercase tracking-widest mt-0.5">Scan with any UPI app & complete order</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Credit / Debit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'card' ? 'bg-white border-[#1A1A1A] shadow-xs' : 'bg-white border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-stone-700 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#1A1A1A]">Credit / Debit Card</div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Visa, Mastercard, RuPay & Maestro</p>

                    {paymentMethod === 'card' && (
                      <div className="mt-3 space-y-2 text-xs">
                        <input
                          type="text"
                          placeholder="Card Number (e.g. 4532 •••• •••• 8912)"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#FAFAF8] text-[#1A1A1A] placeholder-stone-400 p-2.5 rounded-xs border border-stone-200 font-mono focus:outline-none focus:border-[#1A1A1A]"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="bg-[#FAFAF8] text-[#1A1A1A] placeholder-stone-400 p-2.5 rounded-xs border border-stone-200 font-mono focus:outline-none focus:border-[#1A1A1A]"
                          />
                          <input
                            type="password"
                            placeholder="CVV"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="bg-[#FAFAF8] text-[#1A1A1A] placeholder-stone-400 p-2.5 rounded-xs border border-stone-200 font-mono focus:outline-none focus:border-[#1A1A1A]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Net Banking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'netbanking' ? 'bg-white border-[#1A1A1A] shadow-xs' : 'bg-white border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-stone-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#1A1A1A]">Net Banking</div>
                    <p className="text-[11px] text-stone-500 mt-0.5">SBI, Canara, HDFC, ICICI, Karnataka Bank & All Major Banks</p>
                  </div>
                </div>

                {/* Store Pickup / Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod_store')}
                  className={`p-3.5 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'cod_store' ? 'bg-white border-[#1A1A1A] shadow-xs' : 'bg-white border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <Store className="w-5 h-5 text-stone-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#1A1A1A]">
                      {customer.deliveryMethod === 'store_pickup' ? 'Pay at Devatha Hall Store (Cash/Card/UPI)' : 'Cash on Delivery (COD)'}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {customer.deliveryMethod === 'store_pickup' ? 'Pay upon collecting your order at Srinivasam, Doddapet Road' : 'Pay in cash upon doorstep delivery'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-5 py-3.5 bg-stone-100 hover:bg-stone-200 text-[#1A1A1A] font-bold rounded-xs text-xs uppercase tracking-widest border border-stone-300 cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleProcessPayment}
                  className="flex-1 py-3.5 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded-xs text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirm Order ({formattedPrice(totalAmount)})</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Simulated Payment Processing */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-stone-300 border-t-[#1A1A1A] animate-spin flex items-center justify-center" />
                <Lock className="w-6 h-6 text-[#1A1A1A] absolute inset-0 m-auto animate-pulse" />
              </div>

              <div>
                <h3 className="text-lg font-serif text-[#1A1A1A]">Confirming Your Order...</h3>
                <p className="text-xs text-stone-500 max-w-sm mt-1">
                  Reserving items at Devatha Hall Kolar & updating inventory records.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-xs border border-stone-200 text-[10px] text-stone-700 font-semibold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                256-Bit SSL Encrypted Channel
              </div>
            </div>
          )}

          {/* STEP 4: Order Receipt & Tax Invoice Success */}
          {step === 'success' && completedOrder && (
            <div className="space-y-4">
              
              {/* Success Alert Banner */}
              <div className="bg-emerald-50 p-4 rounded-xs border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-serif font-bold text-emerald-900">
                    Order Successfully Placed!
                  </h3>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Thank you, {completedOrder.customer.fullName}! Your order is recorded at Devatha Hall Kolar.
                  </p>
                  <p className="text-[10px] text-emerald-800 font-mono mt-1 font-bold">
                    Order ID: {completedOrder.id} • Txn ID: {completedOrder.transactionId}
                  </p>
                </div>
              </div>

              {/* Printable Tax Invoice Container */}
              <div className="bg-white p-5 rounded-xs border border-stone-200 space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#1A1A1A]">DEVATHA HALL</h4>
                    <p className="text-[10px] text-stone-500 uppercase tracking-wider">Srinivasam, Doddapet Road, Kolar, KA 563101</p>
                    <p className="text-[10px] text-stone-500 font-mono">Phone: {STORE_DETAILS.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest bg-stone-100 px-2.5 py-1 rounded-xs border border-stone-200">
                      TAX INVOICE
                    </span>
                    <p className="text-[10px] text-stone-400 mt-1">{completedOrder.date}</p>
                  </div>
                </div>

                {/* Customer & Fulfillment Info */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#FAFAF8] p-3 rounded-xs border border-stone-200">
                  <div>
                    <span className="text-stone-400 uppercase tracking-widest text-[9px] font-bold block">Customer:</span>
                    <span className="text-[#1A1A1A] font-semibold block">{completedOrder.customer.fullName}</span>
                    <span className="text-stone-600 block">Phone: {completedOrder.customer.phone}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase tracking-widest text-[9px] font-bold block">Fulfillment:</span>
                    <span className="text-[#1A1A1A] font-semibold block">
                      {completedOrder.customer.deliveryMethod === 'store_pickup' 
                        ? 'In-Store Pickup (Doddapet Rd)' 
                        : `Doorstep Shipping (${completedOrder.customer.city})`}
                    </span>
                    <span className="text-emerald-700 font-semibold block">
                      Status: {completedOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Ordered Items Table */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Items Purchased:</span>
                  <div className="divide-y divide-stone-100 border-t border-b border-stone-200 py-1">
                    {completedOrder.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex justify-between items-center text-xs">
                        <div className="truncate pr-2">
                          <span className="text-[#1A1A1A] font-medium">{item.product.name}</span>
                          <span className="text-stone-400 text-[10px] block">Qty: {item.quantity} × {formattedPrice(item.product.price)}</span>
                        </div>
                        <span className="font-bold text-[#1A1A1A]">
                          {formattedPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Invoice Total */}
                <div className="space-y-1 pt-1 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal:</span>
                    <span>{formattedPrice(completedOrder.subtotal)}</span>
                  </div>
                  {completedOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount:</span>
                      <span>-{formattedPrice(completedOrder.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping:</span>
                    <span>{completedOrder.deliveryFee === 0 ? 'FREE' : formattedPrice(completedOrder.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-stone-200">
                    <span>Total Paid:</span>
                    <span className="text-base">{formattedPrice(completedOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Print, WhatsApp Notify, Close */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-[#1A1A1A] font-bold rounded-xs text-[10px] uppercase tracking-widest flex items-center gap-1.5 border border-stone-300 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </button>

                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsapp}?text=Hello%20Devatha%20Hall,%20I%20placed%20order%20${completedOrder.id}%20for%20₹${completedOrder.totalAmount}.%20Please%20confirm!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-white hover:bg-stone-50 text-stone-800 font-bold rounded-xs text-[10px] uppercase tracking-widest flex items-center gap-1.5 border border-stone-300"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  WhatsApp Store ({STORE_DETAILS.phone})
                </a>

                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded-xs text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
