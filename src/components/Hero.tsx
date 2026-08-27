import React from 'react';
import { MapPin, Phone, ShieldCheck, Sparkles, Clock, Truck, Award, ShoppingBag } from 'lucide-react';
import { STORE_DETAILS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenStoreInfo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenStoreInfo }) => {
  return (
    <div className="bg-[#FFF7F4] text-[#2C1E1A] border-b border-[#F0CFC3]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 text-[#C8563E] text-[11px] sm:text-xs tracking-widest uppercase font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#E06B52]" />
                <span>Kolar • Since 1984</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal leading-[1.15] sm:leading-[1.1] text-[#2C1E1A] tracking-tight">
                Traditional <br />
                <span className="italic font-light text-[#E06B52]">Elegance</span> redefined.
              </h1>

              <p className="text-[#7A645D] text-xs sm:text-base leading-relaxed max-w-lg font-normal">
                Located at Srinivasam, Doddapet Road, Devatha Hall brings Kolar's finest Kanjeevaram silks, soft sarees, mens dhotis, and contemporary festive wear to your wardrobe.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="bg-[#E06B52] text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs tracking-widest uppercase hover:bg-[#C8563E] transition-colors rounded-xs font-semibold cursor-pointer shadow-xs text-center"
              >
                Explore Catalog
              </button>

              <button
                onClick={onOpenStoreInfo}
                className="bg-white border border-[#F0CFC3] text-[#2C1E1A] px-5 sm:px-6 py-3.5 sm:py-4 text-xs tracking-widest uppercase hover:bg-[#FFF0E8] transition-colors rounded-xs font-medium cursor-pointer shadow-2xs text-center"
              >
                Store Location & Timings
              </button>
            </div>

            {/* Address bar item */}
            <div className="pt-3 sm:pt-4 border-t border-[#F0CFC3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#7A645D]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8563E] shrink-0" />
                <span>Srinivasam, Doddapet Road, Kolar</span>
              </div>
              <a 
                href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`} 
                className="font-semibold text-[#C8563E] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>{STORE_DETAILS.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Visual Image Grid (Clean Minimalist Collage) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-[#FFE8DE] rounded-xs overflow-hidden relative group h-[180px] sm:h-[260px] border border-[#F0CFC3]">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"
                alt="Traditional Silk Sarees"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs p-2 sm:p-2.5 rounded-xs border border-[#F0CFC3] shadow-xs">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#2C1E1A]">Pure Kanjeevaram</p>
                <p className="text-[11px] sm:text-xs text-[#C8563E] font-semibold">From ₹4,500</p>
              </div>
            </div>

            <div className="bg-[#FFE8DE] rounded-xs overflow-hidden relative group h-[180px] sm:h-[260px] border border-[#F0CFC3]">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800"
                alt="Menswear & Dhotis"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs p-2 sm:p-2.5 rounded-xs border border-[#F0CFC3] shadow-xs">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#2C1E1A]">Mens Ethnic & Dhotis</p>
                <p className="text-[11px] sm:text-xs text-[#C8563E] font-semibold">From ₹1,200</p>
              </div>
            </div>

            <div className="col-span-2 bg-[#FFE8DE] rounded-xs overflow-hidden relative group h-[150px] sm:h-[200px] border border-[#F0CFC3]">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200"
                alt="Bridal Lounge & Wedding Specials"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#FFECE3]">Handcrafted Heritage</p>
                <h3 className="text-lg sm:text-2xl font-serif">Wedding Specials & Festive Collections</h3>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#F0CFC3] text-center">
          <div className="flex flex-col items-center p-2 sm:p-3">
            <Award className="w-5 h-5 text-[#E06B52] mb-1.5" />
            <span className="text-xs font-semibold text-[#2C1E1A]">100% Authentic Quality</span>
            <span className="text-[10px] sm:text-[11px] text-[#7A645D]">Pure Silk Mark Certified</span>
          </div>

          <div className="flex flex-col items-center p-2 sm:p-3">
            <Truck className="w-5 h-5 text-[#E06B52] mb-1.5" />
            <span className="text-xs font-semibold text-[#2C1E1A]">Doorstep Delivery</span>
            <span className="text-[10px] sm:text-[11px] text-[#7A645D]">Karnataka & All-India</span>
          </div>

          <div className="flex flex-col items-center p-2 sm:p-3">
            <MapPin className="w-5 h-5 text-[#E06B52] mb-1.5" />
            <span className="text-xs font-semibold text-[#2C1E1A]">In-Store Pickup</span>
            <span className="text-[10px] sm:text-[11px] text-[#7A645D]">Doddapet Road, Kolar</span>
          </div>

          <div className="flex flex-col items-center p-2 sm:p-3">
            <Phone className="w-5 h-5 text-[#E06B52] mb-1.5" />
            <span className="text-xs font-semibold text-[#2C1E1A]">WhatsApp Inquiry</span>
            <span className="text-[10px] sm:text-[11px] text-[#7A645D]">Direct Video Call & Stock Checks</span>
          </div>
        </div>

      </div>
    </div>
  );
};
