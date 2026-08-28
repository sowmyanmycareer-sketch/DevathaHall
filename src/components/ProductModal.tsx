import React, { useState } from 'react';
import { X, ShoppingBag, Phone, ShieldCheck, Truck, Star, MapPin, Check, ChevronLeft, ChevronRight, Award, Maximize2, Minimize2 } from 'lucide-react';
import { Product } from '../types';
import { STORE_DETAILS } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullFit, setIsFullFit] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.originalPrice);

  const whatsappInquiryUrl = `https://wa.me/${STORE_DETAILS.whatsapp}?text=Hello%20Devatha%20Hall%20Kolar,%20I%20am%20looking%20at%20"${encodeURIComponent(product.name)}"%20(SKU:%20${product.sku},%20Price:%20₹${product.price}).%20Please%20share%20more%20details%20or%20availability.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FFF7F4] text-[#2C1E1A] rounded-xs border border-[#F0CFC3] shadow-2xl overflow-y-auto max-h-[94vh] sm:max-h-[90vh] flex flex-col md:flex-row my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 p-2 rounded-full bg-white/95 hover:bg-white text-[#2C1E1A] hover:text-[#C8563E] transition-colors border border-[#F0CFC3] shadow-md cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="md:w-1/2 p-3 sm:p-4 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#F0CFC3]">
          <div className="relative rounded-xs overflow-hidden bg-[#FFF0E8] h-64 xs:h-72 sm:h-88 md:h-[420px] group flex items-center justify-center">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className={`w-full h-full ${isFullFit ? 'object-contain' : 'object-cover object-top'} transition-all duration-300`}
              referrerPolicy="no-referrer"
            />

            {/* Fit mode toggle */}
            <button
              onClick={() => setIsFullFit(!isFullFit)}
              className="absolute top-2 left-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#2C1E1A] hover:text-[#C8563E] border border-[#F0CFC3] text-[10px] flex items-center gap-1 shadow-xs transition-all cursor-pointer font-medium"
              title={isFullFit ? "Switch to Top-Focused View" : "View Entire Uncropped Image"}
            >
              {isFullFit ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Top View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Full Photo</span>
                </>
              )}
            </button>

            {/* Navigation Arrows if multiple images */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 text-[#2C1E1A] hover:text-[#C8563E] hover:bg-white transition-all border border-[#F0CFC3] cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 text-[#2C1E1A] hover:text-[#C8563E] hover:bg-white transition-all border border-[#F0CFC3] cursor-pointer shadow-xs"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}

            {/* Silk Mark Badge */}
            <div className="absolute bottom-2 left-2 bg-white/95 text-[#2C1E1A] text-[8px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 sm:py-1 rounded-xs border border-[#F0CFC3] flex items-center gap-1 font-bold shadow-xs">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E06B52]" />
              Devatha Hall Collection
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-1.5 sm:gap-2 mt-2 overflow-x-auto pb-1 max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xs overflow-hidden border shrink-0 transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-[#E06B52] scale-102 shadow-xs ring-1 ring-[#E06B52]' : 'border-[#F0CFC3] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Specs & Ordering */}
        <div className="md:w-1/2 p-3.5 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 flex-wrap">
              <span className="bg-[#FFE8DE] px-2 py-0.5 rounded-xs border border-[#F8CBB8] text-[#C8563E]">
                {product.category}
              </span>
              <span className="text-[#E0A898]">•</span>
              <span className="text-[#7A645D] font-mono">SKU: {product.sku}</span>
            </div>

            <h2 className="text-lg sm:text-2xl font-serif text-[#2C1E1A] leading-snug font-normal">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2">
              <div className="flex items-center gap-1 bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs border border-[#F0CFC3] text-[11px] sm:text-xs text-[#2C1E1A]">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-[#A88E85] text-[9px] sm:text-[10px]">({product.reviewsCount} reviews)</span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs border border-emerald-200">
                Verified Stock
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-3 sm:p-4 rounded-xs border border-[#F0CFC3] flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl font-bold text-[#2C1E1A]">
                  {formattedPrice}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs sm:text-sm text-[#A88E85] line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#7A645D] uppercase tracking-wider mt-0.5">Inclusive of all taxes & GST</p>
            </div>

            {product.discountPercentage > 0 && (
              <span className="bg-[#E06B52] text-white font-bold text-[9px] sm:text-[10px] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xs uppercase tracking-wider">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
            <div className="bg-white p-2 sm:p-2.5 rounded-xs border border-[#F0CFC3]">
              <span className="text-[#7A645D] block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Fabric</span>
              <span className="text-[#2C1E1A] font-medium">{product.fabric}</span>
            </div>

            <div className="bg-white p-2 sm:p-2.5 rounded-xs border border-[#F0CFC3]">
              <span className="text-[#7A645D] block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Color</span>
              <span className="text-[#2C1E1A] font-medium">{product.color}</span>
            </div>

            <div className="col-span-2 bg-white p-2 sm:p-2.5 rounded-xs border border-[#F0CFC3]">
              <span className="text-[#7A645D] block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Blouse / Companion Piece</span>
              <span className="text-[#2C1E1A] font-medium">{product.blousePiece}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-[#7A645D] leading-relaxed font-normal bg-white p-2.5 sm:p-3 rounded-xs border border-[#F0CFC3]">
            {product.description}
          </p>

          {/* Store Availability Badge */}
          <div className="bg-[#FFF7F4] p-2.5 sm:p-3 rounded-xs border border-[#F0CFC3] flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-[#7A645D] font-medium">Kolar Store Availability:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200 text-[10px] sm:text-xs">
              {product.inStock ? `In Stock (${product.stockQuantity} pcs)` : 'Out of Stock'}
            </span>
          </div>

          {/* Buttons: WhatsApp Inquiry & Call Showroom */}
          <div className="space-y-2 pt-1">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 sm:py-3.5 bg-[#E06B52] hover:bg-[#C8563E] text-white rounded-xs font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Phone className="w-4 h-4 text-white" />
              Inquire via WhatsApp
            </a>

            <a
              href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 sm:py-3 bg-white hover:bg-[#FFF0E8] text-[#2C1E1A] border border-[#F0CFC3] rounded-xs font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8563E]" />
              Call Showroom: {STORE_DETAILS.phone}
            </a>
          </div>

          {/* Store Pickup & Delivery Guarantee */}
          <div className="pt-2 sm:pt-3 border-t border-[#F0CFC3] flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-wider text-[#7A645D]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C8563E]" />
              Store Pickup Available
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-[#C8563E]" />
              Fast Doorstep Shipping
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
