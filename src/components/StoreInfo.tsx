import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Store, 
  Star, 
  ShieldCheck, 
  Truck, 
  Navigation, 
  MessageSquare, 
  CheckCircle2, 
  Award,
  ExternalLink
} from 'lucide-react';
import { STORE_DETAILS, INITIAL_REVIEWS } from '../data/products';

interface StoreInfoProps {
  onClose?: () => void;
}

export const StoreInfo: React.FC<StoreInfoProps> = ({ onClose }) => {
  return (
    <div className="bg-white text-[#2C1E1A] p-4 sm:p-6 md:p-8 rounded-xs border border-[#F0CFC3] shadow-xs max-w-5xl mx-auto space-y-6 sm:space-y-8 my-4 sm:my-6">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 border-b border-[#F0CFC3] pb-4 sm:pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#E06B52] text-white font-bold text-[9px] px-2 py-0.5 rounded-xs uppercase tracking-wider">
              Landmark Store in Kolar
            </span>
            <span className="text-[11px] sm:text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {STORE_DETAILS.statusText}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#2C1E1A] mt-1.5 sm:mt-2 tracking-tight">
            DEVATHA HALL CLOTHING CENTER
          </h2>
          <p className="text-xs sm:text-sm text-[#7A645D] mt-0.5">
            Premier clothing showroom, silk saree destination, and boutique in Kolar, Karnataka.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
          <a
            href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`}
            className="flex-1 md:flex-none px-3.5 sm:px-4 py-2.5 bg-[#E06B52] hover:bg-[#C8563E] text-white rounded-xs text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all uppercase tracking-wider cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>Call: {STORE_DETAILS.phone}</span>
          </a>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2.5 bg-[#FFF0E8] hover:bg-[#FFE5D9] text-[#2C1E1A] text-[11px] sm:text-xs font-bold rounded-xs border border-[#F0CFC3] transition-colors cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Address, Hours, Contact */}
        <div className="space-y-4">
          
          <div className="bg-[#FFF7F4] p-5 rounded-xs border border-[#F0CFC3] space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#FFE8DE] rounded-xs text-[#C8563E] shrink-0 border border-[#F8CBB8]">
                <MapPin className="w-5 h-5 text-[#C8563E]" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-[#C8563E] uppercase tracking-widest">Showroom Address</h3>
                <p className="text-sm font-bold text-[#2C1E1A] mt-1">{STORE_DETAILS.address}</p>
                <p className="text-xs text-[#7A645D] mt-0.5">Srinivasam Building, Doddapet Main Road, Kolar, KA 563101</p>
                
                <a
                  href={STORE_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C8563E] font-bold hover:underline mt-2.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Open in Google Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF7F4] p-5 rounded-xs border border-[#F0CFC3] space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#FFE8DE] rounded-xs text-[#C8563E] shrink-0 border border-[#F8CBB8]">
                <Clock className="w-5 h-5 text-[#C8563E]" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-[#C8563E] uppercase tracking-widest">Store Business Hours</h3>
                <p className="text-sm font-bold text-emerald-700 mt-1">{STORE_DETAILS.hours}</p>
                <div className="text-xs text-[#7A645D] space-y-0.5 mt-1">
                  <div>Monday – Saturday: 9:30 AM – 9:00 PM (21:00)</div>
                  <div>Sunday: 10:00 AM – 8:30 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF7F4] p-5 rounded-xs border border-[#F0CFC3] space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-xs text-emerald-800 shrink-0 border border-emerald-200">
                <Phone className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Online Ordering & Customer Helpline</h3>
                <p className="text-sm font-bold text-[#2C1E1A] mt-1">{STORE_DETAILS.phone}</p>
                <p className="text-xs text-[#7A645D] mt-0.5">
                  Direct WhatsApp ordering, saree video call inquiries, stock checks & inventory assistance available daily.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Google Maps Simulation & Guarantees */}
        <div className="space-y-4">
          
          <div className="relative rounded-xs overflow-hidden border border-[#F0CFC3] bg-[#FFF0E8] h-60 group shadow-xs">
            {/* Map visual graphic */}
            <div className="absolute inset-0 bg-[#FFF7F4] p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#2C1E1A] bg-white/90 px-2.5 py-1 rounded-xs border border-[#F0CFC3] uppercase tracking-widest">
                  📍 Kolar City Center Map
                </span>
                <span className="text-[10px] text-[#7A645D] font-mono">Doddapet Rd</span>
              </div>

              <div className="bg-white/95 p-3.5 rounded-xs border border-[#F0CFC3] shadow-xs space-y-1">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#C8563E]" />
                  <span className="text-xs font-bold text-[#2C1E1A] font-serif">Devatha Hall Showroom</span>
                </div>
                <p className="text-[11px] text-[#7A645D]">Srinivasam, Doddapet Road, Kolar</p>
                <p className="text-[10px] text-emerald-700 font-bold">★ 4.9 Rating (500+ Local Reviews in Kolar)</p>
              </div>
            </div>

            <a
              href={STORE_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center"
            >
              <span className="bg-[#E06B52] text-white text-xs font-bold px-4 py-2 rounded-xs shadow-md uppercase tracking-widest">
                View Location on Google Maps
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#FFF7F4] p-3.5 rounded-xs border border-[#F0CFC3] space-y-1">
              <Award className="w-4 h-4 text-[#E06B52]" />
              <span className="font-bold text-[#2C1E1A] block">100% Pure Silk Mark</span>
              <span className="text-[11px] text-[#7A645D]">Certified authentic silk weaves</span>
            </div>

            <div className="bg-[#FFF7F4] p-3.5 rounded-xs border border-[#F0CFC3] space-y-1">
              <Truck className="w-4 h-4 text-[#E06B52]" />
              <span className="font-bold text-[#2C1E1A] block">Fast Dispatch</span>
              <span className="text-[11px] text-[#7A645D]">Kolar & Karnataka-wide shipping</span>
            </div>
          </div>

        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="border-t border-[#F0CFC3] pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-semibold text-[#2C1E1A] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#E06B52]" />
            What Kolar Patrons Say About Devatha Hall
          </h3>
          <span className="text-xs font-bold text-[#C8563E] bg-[#FFE8DE] px-2.5 py-0.5 rounded-xs border border-[#F8CBB8]">4.9 ★ Rating</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INITIAL_REVIEWS.map((rev) => (
            <div key={rev.id} className="bg-[#FFF7F4] p-4 rounded-xs border border-[#F0CFC3] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2C1E1A] font-serif">{rev.userName}</span>
                <span className="text-[10px] text-[#A88E85]">{rev.date}</span>
              </div>

              <div className="flex text-amber-500 text-xs">
                {'★'.repeat(rev.rating)}
              </div>

              <p className="text-[#7A645D] leading-relaxed font-light text-[11px]">
                "{rev.comment}"
              </p>

              {rev.verifiedPurchase && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold pt-1 uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
