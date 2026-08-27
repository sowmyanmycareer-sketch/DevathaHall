import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      id="back-to-top-btn"
      aria-label="Back to top"
      title="Back to Top"
      className="fixed bottom-6 right-6 z-40 p-3 sm:p-3.5 bg-[#E06B52] text-white hover:bg-[#C8563E] active:scale-95 rounded-full shadow-lg border border-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer group hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#E06B52] focus:ring-offset-2"
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
};
