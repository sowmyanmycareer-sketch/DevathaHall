import React from 'react';
import { Heart, ShoppingBag, ArrowLeft, Trash2, Phone, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { STORE_DETAILS } from '../data/products';

interface WishlistProps {
  wishlistProducts: Product[];
  onQuickView: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  onClearWishlist: () => void;
  onBackToStore: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({
  wishlistProducts,
  onQuickView,
  onToggleWishlist,
  onClearWishlist,
  onBackToStore,
}) => {
  const whatsappBulkInquiryUrl = `https://wa.me/${STORE_DETAILS.whatsapp}?text=Hello%20Devatha%20Hall%20Kolar,%20I%20have%20${wishlistProducts.length}%20items%20in%20my%20wishlist:%20${encodeURIComponent(
    wishlistProducts.map((p) => `${p.name} (SKU: ${p.sku})`).join(', ')
  )}.%20Can%20you%20confirm%20their%20availability%20and%20prices?`;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 min-h-[60vh]">
      {/* Header Banner */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xs border border-[#F0CFC3] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        <div>
          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#C8563E] hover:text-[#9E3E28] uppercase tracking-wider mb-2 sm:mb-3 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Catalog
          </button>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-3 bg-[#FFE8DE] text-[#C8563E] rounded-full border border-[#F8CBB8] shrink-0">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-[#E06B52]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-[#2C1E1A] tracking-tight">
                My Wishlist & Favorites
              </h1>
              <p className="text-[11px] sm:text-sm text-[#7A645D] mt-0.5">
                {wishlistProducts.length === 1
                  ? '1 item saved in your collection'
                  : `${wishlistProducts.length} items saved in your collection`}
              </p>
            </div>
          </div>
        </div>

        {wishlistProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
            <a
              href={whatsappBulkInquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#E06B52] hover:bg-[#C8563E] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-center"
            >
              <Phone className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="truncate">Inquire All</span>
            </a>

            <button
              onClick={onClearWishlist}
              className="px-3 sm:px-3.5 py-2.5 sm:py-3 bg-[#FFF0E8] hover:bg-[#FFE5D9] text-[#2C1E1A] border border-[#F0CFC3] text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
              title="Clear all wishlist items"
            >
              <Trash2 className="w-3.5 h-3.5 text-[#C8563E] shrink-0" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Wishlist Items Content */}
      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-xs p-8 sm:p-14 text-center border border-[#F0CFC3] shadow-xs space-y-3 sm:space-y-4 max-w-2xl mx-auto my-4 sm:my-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FFF0E8] text-[#E06B52] rounded-full flex items-center justify-center mx-auto border border-[#F0CFC3]">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#E06B52]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#2C1E1A]">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-[#7A645D] max-w-md mx-auto leading-relaxed">
            You haven't saved any items yet. Browse Devatha Hall's authentic silks, sarees, and clothing, then tap the heart icon on any item to save it here.
          </p>
          <div className="pt-2">
            <button
              onClick={onBackToStore}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#E06B52] hover:bg-[#C8563E] text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Explore Kolar Catalog
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};
