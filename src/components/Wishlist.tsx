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
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8 min-h-[60vh]">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#F0CFC3] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#C8563E] hover:text-[#9E3E28] uppercase tracking-widest mb-3 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FFE8DE] text-[#C8563E] rounded-full border border-[#F8CBB8] shrink-0">
              <Heart className="w-6 h-6 fill-[#E06B52]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-[#2C1E1A] tracking-tight">
                My Wishlist & Saved Favorites
              </h1>
              <p className="text-xs sm:text-sm text-[#7A645D] mt-1">
                {wishlistProducts.length === 1
                  ? '1 item saved in your collection'
                  : `${wishlistProducts.length} items saved in your collection`}
              </p>
            </div>
          </div>
        </div>

        {wishlistProducts.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={whatsappBulkInquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-none px-4 py-3 bg-[#E06B52] hover:bg-[#C8563E] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Phone className="w-4 h-4 text-white" />
              Inquire All on WhatsApp
            </a>

            <button
              onClick={onClearWishlist}
              className="px-3.5 py-3 bg-[#FFF0E8] hover:bg-[#FFE5D9] text-[#2C1E1A] border border-[#F0CFC3] text-xs font-bold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Clear all wishlist items"
            >
              <Trash2 className="w-4 h-4 text-[#C8563E]" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Wishlist Items Content */}
      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-xs p-12 sm:p-16 text-center border border-[#F0CFC3] shadow-xs space-y-4 max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 bg-[#FFF0E8] text-[#E06B52] rounded-full flex items-center justify-center mx-auto border border-[#F0CFC3]">
            <Heart className="w-8 h-8 text-[#E06B52]" />
          </div>
          <h2 className="text-2xl font-serif text-[#2C1E1A]">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-[#7A645D] max-w-md mx-auto leading-relaxed">
            You haven’t saved any products yet. Browse Devatha Hall's traditional Kanjeevaram silks, soft sarees, kurtis, and dhotis, and click the heart icon on any product to save it here.
          </p>
          <div className="pt-2">
            <button
              onClick={onBackToStore}
              className="px-6 py-3 bg-[#E06B52] hover:bg-[#C8563E] text-white text-xs font-bold uppercase tracking-widest rounded-xs shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Explore Kolar Catalog
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
