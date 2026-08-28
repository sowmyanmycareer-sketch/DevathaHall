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
  Store,
  MessageCircle
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
      <div className="bg-[#FFEFE8] text-[#7A645D] text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#F5D8CD]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Location & Status */}
          <div className="flex items-center gap-1.5 sm:gap-4 text-[10px] sm:text-xs truncate">
            <span className="flex items-center gap-1 text-[#7A645D] truncate">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C8563E] shrink-0" />
              <span className="truncate">Doddapet Rd, Kolar</span>
            </span>
            <span className="hidden sm:inline-block text-[#E5BFB1]">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="text-emerald-700 font-semibold tracking-wide text-[10px] sm:text-[11px] uppercase">
                {STORE_DETAILS.statusText}
              </span>
            </span>
          </div>

          {/* Quick Top Links */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs shrink-0">
            <a 
              href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 hover:text-[#C8563E] transition-colors font-medium text-[#2C1E1A]"
              title="Call Store"
            >
              <Phone className="w-3 h-3 text-[#E06B52] shrink-0" />
              <span className="hidden xs:inline sm:inline">{STORE_DETAILS.phone}</span>
              <span className="xs:hidden">Call</span>
            </a>
            <span className="text-[#E5BFB1]">|</span>
            <button 
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                if (!isAdminMode) onOpenStore();
              }}
              className={`text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 rounded-xs transition-all flex items-center gap-1 font-medium uppercase tracking-wider cursor-pointer ${
                isAdminMode 
                  ? 'bg-[#E06B52] text-white font-semibold' 
                  : 'bg-white hover:bg-[#FFF0E8] text-[#2C1E1A] border border-[#F0CFC3]'
              }`}
            >
              <LayoutDashboard className="w-2.5 h-2.5 text-[#E06B52]" />
              <span>{isAdminMode ? 'Store' : 'Staff'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 space-y-2.5 sm:space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Logo & Store Title */}
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group" 
              onClick={() => { onOpenStore(); setActiveCategory('All'); setIsAdminMode(false); }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E06B52] text-white rounded-full flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Store className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                  <h1 className="text-base sm:text-xl md:text-2xl font-serif font-bold text-[#2C1E1A] tracking-tight leading-none">
                    DEVATHA HALL
                  </h1>
                  <span className="text-[8px] sm:text-[9px] tracking-widest text-[#C8563E] uppercase font-bold">
                    Kolar • 1984
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-[#7A645D] font-normal mt-0.5 truncate max-w-[240px] sm:max-w-none">
                  Authentic Silk Sarees & Clothing Center
                </p>
              </div>
            </div>

            {/* Mobile-only Wishlist quick badge in header */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                onClick={onOpenWishlist}
                className={`relative p-2 rounded-xs border transition-all cursor-pointer ${
                  activeView === 'wishlist'
                    ? 'bg-[#E06B52] text-white border-[#E06B52]'
                    : 'bg-[#FFF0E8] text-[#2C1E1A] hover:bg-[#FFE5D9] border-[#F0CFC3]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${activeView === 'wishlist' ? 'fill-white text-white' : 'fill-[#E06B52] text-[#E06B52]'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E06B52] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons (Desktop and Tablet) */}
          <div className="grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-3">
            <button
              onClick={onOpenWishlist}
              className={`hidden md:flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 text-[11px] sm:text-xs font-bold rounded-xs border transition-all uppercase tracking-wider cursor-pointer shadow-2xs ${
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
              className="flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-2 text-[10px] sm:text-xs font-bold text-[#2C1E1A] bg-[#FFF0E8] hover:bg-[#FFE5D9] rounded-xs border border-[#F0CFC3] transition-all uppercase tracking-wider cursor-pointer shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8563E] shrink-0" />
              <span className="hidden sm:inline">Store Location</span>
              <span className="sm:hidden">Store</span>
            </button>

            <a
              href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-2 text-[10px] sm:text-xs font-bold text-[#2C1E1A] bg-[#FFF0E8] hover:bg-[#FFE5D9] rounded-xs border border-[#F0CFC3] transition-all uppercase tracking-wider cursor-pointer shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#E06B52] shrink-0" />
              <span>Call</span>
            </a>

            <a
              href={`https://wa.me/${STORE_DETAILS.whatsapp}?text=Hello%20Devatha%20Hall%20Kolar,%20I%20have%20an%20inquiry%20about%20your%20clothing%20catalog.`}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 sm:px-3.5 py-2 bg-[#E06B52] hover:bg-[#C8563E] text-white rounded-xs text-[10px] sm:text-xs tracking-wider uppercase font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs col-span-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden">Chat</span>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-full">
          <input
            type="text"
            placeholder="Search Kanjeevaram sarees, kurtis, dhotis, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFF7F4] text-[#2C1E1A] placeholder-[#A88E85] pl-9 pr-14 py-2 sm:py-2.5 rounded-xs border border-[#F0CFC3] focus:outline-none focus:border-[#E06B52] focus:bg-white text-xs sm:text-sm transition-all shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8563E] absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] text-[#C8563E] hover:text-[#9E3E28] font-bold uppercase tracking-wider bg-[#FFE8DE] px-2 py-0.5 rounded-xs border border-[#F8CBB8] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation Bar - Horizontal Touch Scrollable */}
      {!isAdminMode && (
        <div className="bg-[#FFF7F4] border-t border-[#F0CFC3] overflow-x-auto scrollbar-none py-2 px-3 sm:px-4" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="max-w-7xl mx-auto flex items-center gap-2.5 sm:gap-5 min-w-max text-xs font-medium tracking-wide">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={(e) => {
                    setActiveCategory(cat);
                    onOpenStore();
                    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    setTimeout(() => {
                      const catalogGrid = document.getElementById('catalog-grid');
                      if (catalogGrid) {
                        const header = document.querySelector('header');
                        const headerHeight = header ? header.offsetHeight : 160;
                        const elementTop = catalogGrid.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = Math.max(0, elementTop - headerHeight - 20);
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }, 50);
                  }}
                  className={`px-2.5 py-1 rounded-xs transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-[#E06B52] text-white font-bold shadow-2xs'
                      : 'text-[#7A645D] hover:text-[#C8563E] hover:bg-[#FFE8DE]'
                  }`}
                >
                  {cat === 'Wedding Special' && <Sparkles className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-[#E06B52]'}`} />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
