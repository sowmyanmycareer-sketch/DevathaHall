import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, Phone, Star, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../types';
import { STORE_DETAILS } from '../data/products';

interface ProductCardProps {
  product: Product;
  onQuickView: (p: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  isWishlisted,
  onToggleWishlist
}) => {
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

  const whatsappInquiryUrl = `https://wa.me/${STORE_DETAILS.whatsapp}?text=Hello%20Devatha%20Hall,%20I%20am%20interested%20in%20"${encodeURIComponent(product.name)}"%20(SKU:%20${product.sku},%20Price:%20₹${product.price}).%20Is%20it%20available?`;

  return (
    <div className="bg-white rounded-xs overflow-hidden border border-[#F0CFC3] hover:border-[#E06B52] shadow-xs transition-all duration-300 flex flex-col group relative">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.discountPercentage > 0 && (
          <span className="bg-[#E06B52] text-white text-[10px] font-bold px-2 py-1 rounded-xs uppercase tracking-widest shadow-xs">
            {product.discountPercentage}% OFF
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-[#FFE8DE] text-[#C8563E] text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-widest border border-[#F8CBB8]">
            New Arrival
          </span>
        )}
      </div>

      {/* Wishlist Toggle Button */}
      {onToggleWishlist && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-xs transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#E06B52] text-white shadow-xs'
              : 'bg-white/85 text-[#7A645D] hover:text-[#C8563E] hover:bg-white border border-[#F0CFC3]'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      )}

      {/* Image Gallery Showcase Container */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative h-64 sm:h-72 overflow-hidden bg-[#FFF0E8] cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Overlay Hover Effect */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2.5 bg-white text-[#2C1E1A] text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5 hover:bg-[#FFE8DE] transition-colors rounded-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#E06B52]" />
            Quick View
          </button>
        </div>

        {/* Fabric Tag overlay */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#F0CFC3] text-[10px] text-[#7A645D] flex items-center justify-between">
          <span className="truncate font-medium uppercase tracking-wider">{product.fabric}</span>
          <span className="text-[#C8563E] font-semibold shrink-0 ml-1">SKU: {product.sku}</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-[#7A645D] mb-1">
            <span className="uppercase tracking-widest text-[9px] font-bold text-[#C8563E]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#2C1E1A]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold">{product.rating}</span>
              <span className="text-[#A88E85] text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="text-sm font-serif text-[#2C1E1A] group-hover:text-[#C8563E] transition-colors line-clamp-2 cursor-pointer leading-snug font-normal"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#7A645D] mt-1 line-clamp-1">
            Color: {product.color}
          </p>
        </div>

        {/* Pricing & Stock Status */}
        <div className="pt-2 border-t border-[#F5E2DA]">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#2C1E1A]">
              {formattedPrice}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#A88E85] line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>

          {/* Stock badge */}
          <div className="mt-1 flex items-center justify-between text-[10px]">
            {product.inStock ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                In Stock ({product.stockQuantity})
              </span>
            ) : (
              <span className="text-rose-600 font-medium">Out of Stock</span>
            )}
            <span className="text-[#A88E85]">Kolar Hub</span>
          </div>
        </div>

        {/* Action buttons: View Details & WhatsApp Inquiry */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onQuickView(product)}
            className="px-2 py-2.5 min-h-[38px] bg-[#FFF0E8] hover:bg-[#FFE5D9] text-[#2C1E1A] border border-[#F0CFC3] rounded-xs text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C8563E] shrink-0" />
            <span className="truncate">View Details</span>
          </button>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="px-2 py-2.5 min-h-[38px] bg-[#E06B52] hover:bg-[#C8563E] text-white rounded-xs text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-1 transition-all shadow-2xs"
            title={`Inquire via WhatsApp ${STORE_DETAILS.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="truncate">Inquire</span>
          </a>
        </div>

      </div>
    </div>
  );
};
