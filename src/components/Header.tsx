import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Heart, 
  SlidersHorizontal, 
  Sparkles,
  LayoutDashboard,
  Store
} from 'lucide-react';
import { ProductCategory } from '../types';
import { STORE_DETAILS } from '../data/products';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;
  wishlistCount: number;
  activeView: 'store' | 'wishlist';
  onOpenWishlist: () => void;
  onOpenStore: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  onOpenStoreInfo: () => void;
}

const CATEGORIES: ProductCategory[] = [
  'All',
  'Kanjeevaram Silk',
  'Soft Silk Sarees',
  'Designer Sarees',
  'Menswear & Dhotis',
  'Women Kurtis & Dress',
  'Kids Ethnic Wear',
  'Wedding Special'
];

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  wishlistCount,
  activeView,
  onOpenWishlist,
  onOpenStore,
  isAdminMode,
  setIsAdminMode,
  onOpenStoreInfo
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white text-[#2C1E1A] border-b border-[#F0CFC3] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#FFEFE8] text-[#7A645D] text-xs py-2 px-3 sm:px-4 border-b border-[#F5D8CD]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-left text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-[#7A645D]">
              <MapPin className="w-3.5 h-3.5 text-[#C8563E] shrink-0" />
              <span>Srinivasam, Doddapet Road, Kolar</span>
            </span>
            <span className="hidden md:inline-block text-[#E5BFB1]">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-emerald-700 font-semibold tracking-wide text-[11px] uppercase">{STORE_DETAILS.statusText}</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <button
              onClick={onOpenWishlist}
              className="flex items-center gap-1.5 text-[#2C1E1A] hover:text-[#C8563E] font-medium transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-[#E06B52] fill-[#E06B52]" />
              <span>Wishlist ({wishlistCount})</span>
            </button>
            <span className="text-[#E5BFB1]">|</span>
            <a 
              href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#C8563E] transition-colors font-medium text-[#2C1E1A]"
            >
              <Phone className="w-3.5 h-3.5 text-[#E06B52] shrink-0" />
              <span>{STORE_DETAILS.phone}</span>
            </a>
            <span className="text-[#E5BFB1]">|</span>
            <button 
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                if (!isAdminMode) onOpenStore();
              }}
              className={`text-[10px] px-2.5 sm:px-3 py-1 rounded-xs transition-all flex items-center gap-1.5 font-medium uppercase tracking-widest cursor-pointer ${
                isAdminMode 
                  ? 'bg-[#E06B52] text-white font-semibold' 
                  : 'bg-white hover:bg-[#FFF0E8] text-[#2C1E1A] border border-[#F0CFC3]'
              }`}
            >
              <LayoutDashboard className="w-3 h-3 text-[#E06B52]" />
              {isAdminMode ? 'Customer Store' : 'Staff Portal'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo & Store Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { onOpenStore(); setActiveCategory('All'); setIsAdminMode(false); }}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#E06B52] text-white rounded-full flex items-center justify-center shrink-0 shadow-xs">
              <Store className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h1 className="text-lg sm:text-2xl font-serif font-semibold text-[#2C1E1A] tracking-tight leading-none">
                  DEVATHA HALL
                </h1>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-[#C8563E] uppercase font-bold">
                  Kolar • Since 1984
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#7A645D] font-normal mt-0.5">
                Authentic Silk Sarees & Premium Clothing Center
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            <button
              onClick={onOpenWishlist}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 text-[11px] sm:text-xs font-bold rounded-xs border transition-all uppercase tracking-widest cursor-pointer shadow-2xs ${
                activeView === 'wishlist'
                  ? 'bg-[#E06B52] text-white border-[#E06B52]'
                  : 'bg-[#FFF0E8] text-[#2C1E1A] hover:bg-[#FFE5D9] border-[#F0CFC3]'
              }`}
              title="View My Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 shrink-0 ${activeView === 'wishlist' ? 'fill-white text-white' : 'fill-[#E06B52] text-[#E06B52]'}`} />
              <span>Wishlist</span>
              <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeView === 'wishlist' ? 'bg-white text-[#E06B52]' : 'bg-[#E06B52] text-white'
              }`}>
                {wishlistCount}
              </span>
            </button>

            <button
              onClick={onOpenStoreInfo}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 text-[11px] sm:text-xs font-bold text-[#2C1E1A] bg-[#FFF0E8] hover:bg-[#FFE5D9] rounded-xs border border-[#F0CFC3] transition-all uppercase tracking-widest cursor-pointer shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8563E] shrink-0" />
              <span className="hidden sm:inline">Store Location & Hours</span>
              <span className="sm:hidden">Store Info</span>
            </button>

            <a
              href={`https://wa.me/${STORE_DETAILS.whatsapp}?text=Hello%20Devatha%20Hall%20Kolar,%20I%20have%20an%20inquiry%20about%20your%20clothing%20catalog.`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none px-3 sm:px-3.5 py-2 bg-[#E06B52] hover:bg-[#C8563E] text-white rounded-xs text-[11px] sm:text-xs tracking-widest uppercase font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="hidden sm:inline">WhatsApp Inquiry</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-full sm:max-w-lg pt-0.5">
          <input
            type="text"
            placeholder="Search Kanjeevaram sarees, soft silk, dhotis, kurtis, dress materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFF7F4] text-[#2C1E1A] placeholder-[#A88E85] pl-10 pr-16 py-2.5 sm:py-2 rounded-xs border border-[#F0CFC3] focus:outline-none focus:border-[#E06B52] focus:bg-white text-xs sm:text-sm transition-all shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#C8563E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#C8563E] hover:text-[#9E3E28] font-bold uppercase tracking-wider bg-[#FFE8DE] px-2 py-0.5 rounded-xs border border-[#F8CBB8] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation Bar */}
      {!isAdminMode && (
        <div className="bg-[#FFF7F4] border-t border-[#F0CFC3] overflow-x-auto scrollbar-none py-2.5 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-4 sm:gap-6 min-w-max text-xs font-medium tracking-wide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={(e) => {
                  setActiveCategory(cat);
                  onOpenStore();
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  setTimeout(() => {
                    const catalogGrid = document.getElementById('catalog-grid');
                    if (catalogGrid) {
                      catalogGrid.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 50);
                }}
                className={`pb-1 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer text-xs ${
                  activeCategory === cat
                    ? 'border-b-2 border-[#E06B52] text-[#C8563E] font-bold'
                    : 'text-[#7A645D] hover:text-[#C8563E]'
                }`}
              >
                {cat === 'Wedding Special' && <Sparkles className="w-3.5 h-3.5 text-[#E06B52]" />}
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
