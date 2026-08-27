import React, { useState } from 'react';
import { X, ShoppingBag, Phone, ShieldCheck, Truck, Star, MapPin, Check, ChevronLeft, ChevronRight, Award } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FFF7F4] text-[#2C1E1A] rounded-xs border border-[#F0CFC3] shadow-2xl overflow-hidden my-auto max-h-[95vh] sm:max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#2C1E1A] hover:text-[#C8563E] transition-colors border border-[#F0CFC3] shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="md:w-1/2 p-3 sm:p-4 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#F0CFC3]">
          <div className="relative rounded-xs overflow-hidden bg-[#FFF0E8] h-60 sm:h-80 md:h-96 group">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Navigation Arrows if multiple images */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/85 text-[#2C1E1A] hover:text-[#C8563E] hover:bg-white transition-all border border-[#F0CFC3] cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/85 text-[#2C1E1A] hover:text-[#C8563E] hover:bg-white transition-all border border-[#F0CFC3] cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Silk Mark Badge */}
            <div className="absolute bottom-2.5 left-2.5 bg-white/95 text-[#2C1E1A] text-[9px] sm:text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-xs border border-[#F0CFC3] flex items-center gap-1.5 font-bold shadow-xs">
              <Award className="w-3.5 h-3.5 text-[#E06B52]" />
              Devatha Hall Kolar Collection
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1 max-w-full">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xs overflow-hidden border shrink-0 transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-[#E06B52] scale-102 shadow-xs' : 'border-[#F0CFC3] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Specs & Ordering */}
        <div className="md:w-1/2 p-4 sm:p-6 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-1">
              <span className="bg-[#FFE8DE] px-2 py-0.5 rounded-xs border border-[#F8CBB8] text-[#C8563E]">
                {product.category}
              </span>
              <span className="text-[#E0A898]">•</span>
              <span className="text-[#7A645D] font-mono">SKU: {product.sku}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif text-[#2C1E1A] leading-snug font-normal">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xs border border-[#F0CFC3] text-xs text-[#2C1E1A]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-[#A88E85] text-[10px]">({product.reviewsCount} reviews)</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-xs border border-emerald-200">
                Verified Stock
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-4 rounded-xs border border-[#F0CFC3] flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#2C1E1A]">
                  {formattedPrice}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-[#A88E85] line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#7A645D] uppercase tracking-wider mt-0.5">Inclusive of all taxes & GST</p>
            </div>

            {product.discountPercentage > 0 && (
              <span className="bg-[#E06B52] text-white font-bold text-[10px] px-3 py-1.5 rounded-xs uppercase tracking-widest">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xs border border-[#F0CFC3]">
              <span className="text-[#7A645D] block text-[9px] font-bold uppercase tracking-widest">Fabric</span>
              <span className="text-[#2C1E1A] font-medium">{product.fabric}</span>
            </div>

            <div className="bg-white p-2.5 rounded-xs border border-[#F0CFC3]">
              <span className="text-[#7A645D] block text-[9px] font-bold uppercase tracking-widest">Color</span>
              <span className="text-[#2C1E1A] font-medium">{product.color}</span>
            </div>

            <div className="col-span-2 bg-white p-2.5 rounded-xs border border-[#F0CFC3]">
              <span className="text-[#7A645D] block text-[9px] font-bold uppercase tracking-widest">Blouse / Companion Piece</span>
              <span className="text-[#2C1E1A] font-medium">{product.blousePiece}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#7A645D] leading-relaxed font-normal bg-white p-3 rounded-xs border border-[#F0CFC3]">
            {product.description}
          </p>

          {/* Store Availability Badge */}
          <div className="bg-[#FFF7F4] p-3 rounded-xs border border-[#F0CFC3] flex items-center justify-between text-xs">
            <span className="text-[#7A645D] font-medium">Kolar Store Availability:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-xs border border-emerald-200">
              {product.inStock ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock (Inquire)'}
            </span>
          </div>

          {/* Buttons: WhatsApp Inquiry & Call Showroom */}
          <div className="space-y-2.5 pt-1">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-[#E06B52] hover:bg-[#C8563E] text-white rounded-xs font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Phone className="w-4 h-4 text-white" />
              Inquire via WhatsApp ({STORE_DETAILS.phone})
            </a>

            <a
              href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`}
              className="w-full py-3 bg-white hover:bg-[#FFF0E8] text-[#2C1E1A] border border-[#F0CFC3] rounded-xs font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#C8563E]" />
              Call Showroom Directly: {STORE_DETAILS.phone}
            </a>
          </div>

          {/* Store Pickup & Delivery Guarantee */}
          <div className="pt-3 border-t border-[#F0CFC3] flex items-center justify-between text-[10px] uppercase tracking-wider text-[#7A645D]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C8563E]" />
              Store Pickup Available
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#C8563E]" />
              Fast Doorstep Shipping
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
