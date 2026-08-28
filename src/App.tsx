import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { InventoryManager } from './components/InventoryManager';
import { StoreInfo } from './components/StoreInfo';
import { Wishlist } from './components/Wishlist';
import { BackToTop } from './components/BackToTop';
import { INITIAL_PRODUCTS, STORE_DETAILS } from './data/products';
import { Product, ProductCategory, Order } from './types';
import { ShoppingBag, Heart } from 'lucide-react';

export default function App() {
  // Store Catalog State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Active View State ('store' | 'wishlist')
  const [activeView, setActiveView] = useState<'store' | 'wishlist'>('store');

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Selected Product Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Completed Orders list
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  // Admin / Staff Portal Mode State
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Store Location Modal State
  const [isStoreInfoOpen, setIsStoreInfoOpen] = useState(false);

  // Wishlist Products List
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Filtered Products Logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.color.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= priceRange;
    const matchesStock = !onlyInStock || (p.inStock && p.stockQuantity > 0);

    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  // Wishlist Operation
  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
  };

  // Staff Inventory Operations
  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stockQuantity: newStock, inStock: newStock > 0 }
          : p
      )
    );
  };

  const handleToggleInStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, inStock: !p.inStock }
          : p
      )
    );
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setRecentOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF7F4] text-[#2C1E1A] font-sans selection:bg-[#E06B52] selection:text-white">
      
      {/* Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setActiveView('store');
          setTimeout(() => {
            const catalogSection = document.getElementById('catalog-grid');
            catalogSection?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        wishlistCount={wishlistIds.length}
        activeView={activeView}
        onOpenWishlist={() => {
          setActiveView('wishlist');
          setIsAdminMode(false);
        }}
        onOpenStore={() => setActiveView('store')}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        onOpenStoreInfo={() => setIsStoreInfoOpen(true)}
      />

      {/* STAFF PORTAL VIEW */}
      {isAdminMode ? (
        <InventoryManager
          products={products}
          onUpdateStock={handleUpdateStock}
          onToggleInStock={handleToggleInStock}
          onAddProduct={handleAddProduct}
          recentOrders={recentOrders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onExitAdmin={() => setIsAdminMode(false)}
        />
      ) : activeView === 'wishlist' ? (
        /* MY WISHLIST VIEW */
        <main className="pb-16">
          <Wishlist
            wishlistProducts={wishlistProducts}
            onQuickView={setSelectedProduct}
            onToggleWishlist={handleToggleWishlist}
            onClearWishlist={handleClearWishlist}
            onBackToStore={() => setActiveView('store')}
          />
        </main>
      ) : (
        /* CUSTOMER STOREFRONT VIEW */
        <main className="pb-16 space-y-12">
          
          {/* Hero Banner */}
          <Hero
            onExploreClick={() => {
              const catalogSection = document.getElementById('catalog-grid');
              if (catalogSection) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 160;
                const elementTop = catalogSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = Math.max(0, elementTop - headerHeight - 20);
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
            onOpenStoreInfo={() => setIsStoreInfoOpen(true)}
          />

          {/* Catalog Section */}
          <div id="catalog-grid" className="scroll-mt-44 sm:scroll-mt-48 md:scroll-mt-52 max-w-7xl mx-auto px-3 sm:px-4 space-y-4 sm:space-y-6 pt-1">
            
            {/* Catalog Controls & Filter Bar */}
            <div className="bg-white p-3 sm:p-5 rounded-xs border border-[#F0CFC3] shadow-xs space-y-3 sm:space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h2 className="text-lg sm:text-2xl font-serif font-medium text-[#2C1E1A] tracking-tight">
                    {activeCategory === 'All' ? 'Curated Collection' : activeCategory}
                  </h2>
                  <p className="text-[10px] sm:text-xs text-[#7A645D] uppercase tracking-wider mt-0.5">
                    Displaying {filteredProducts.length} items
                  </p>
                </div>

                {/* Filters Controls */}
                <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto text-xs">
                  {/* Sort Selector */}
                  <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2 bg-[#FFF7F4] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xs border border-[#F0CFC3]">
                    <span className="text-[#7A645D] font-medium uppercase text-[9px] sm:text-[10px] tracking-wider shrink-0">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-[#2C1E1A] focus:outline-none font-medium cursor-pointer text-[11px] sm:text-xs w-full"
                    >
                      <option value="featured">Featured</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  {/* Stock Toggle */}
                  <label className="flex items-center gap-1.5 sm:gap-2 bg-[#FFF7F4] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xs border border-[#F0CFC3] cursor-pointer text-[#2C1E1A] text-[11px] sm:text-xs shrink-0">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="accent-[#E06B52] rounded-xs"
                    />
                    <span className="font-medium whitespace-nowrap">In Stock</span>
                  </label>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-2.5 sm:pt-3 border-t border-[#F5E2DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 text-xs">
                <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
                  <span className="text-[#7A645D] text-[10px] sm:text-xs uppercase tracking-wider shrink-0">
                    Max: <strong className="text-[#C8563E] font-semibold">₹{priceRange.toLocaleString('en-IN')}</strong>
                  </span>
                  <input
                    type="range"
                    min={2000}
                    max={30000}
                    step={1000}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="flex-1 sm:w-48 accent-[#E06B52] cursor-pointer"
                  />
                </div>

                {wishlistIds.length > 0 && (
                  <button
                    onClick={() => setActiveView('wishlist')}
                    className="text-[11px] sm:text-xs font-medium bg-[#FFE8DE] hover:bg-[#FFE5D9] text-[#C8563E] px-2.5 sm:px-3 py-1 rounded-xs border border-[#F8CBB8] self-start sm:self-auto cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#E06B52]" />
                    <span>View {wishlistIds.length} Saved →</span>
                  </button>
                )}
              </div>
            </div>

            {/* Product Cards Grid - 2 columns on mobile for superior e-commerce UX */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xs p-8 sm:p-12 text-center border border-[#F0CFC3] space-y-3 shadow-xs">
                <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-[#D8B4A8] mx-auto" />
                <h3 className="text-lg sm:text-xl font-serif text-[#2C1E1A]">No products found</h3>
                <p className="text-xs text-[#7A645D] max-w-sm mx-auto">
                  Try clearing your search query or adjusting the price filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                    setPriceRange(30000);
                    setOnlyInStock(false);
                  }}
                  className="px-5 py-2.5 bg-[#E06B52] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#C8563E] transition-colors rounded-xs shadow-2xs cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Store Location & Landmark Section */}
          <div className="max-w-7xl mx-auto px-4">
            <StoreInfo />
          </div>

        </main>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#F0CFC3] text-[#7A645D] text-xs py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#C8563E] font-serif font-semibold text-base tracking-tight">
              DEVATHA HALL
            </div>
            <p className="text-xs text-[#7A645D] mt-1">
              Srinivasam, Doddapet Road, Kolar, Karnataka 563101 • Customer Care: {STORE_DETAILS.phone}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[#2C1E1A] text-xs font-medium">
            <button onClick={() => setIsStoreInfoOpen(true)} className="hover:text-[#C8563E] transition-colors">
              Store Timings & Directions
            </button>
            <span className="text-[#E0A898]">•</span>
            <button onClick={() => setIsAdminMode(!isAdminMode)} className="hover:text-[#C8563E] transition-colors">
              Staff Portal
            </button>
            <span className="text-[#E0A898]">•</span>
            <a href={`tel:${STORE_DETAILS.phone.replace(/\s+/g, '')}`} className="text-[#C8563E] font-semibold hover:underline">
              Call {STORE_DETAILS.phone}
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {isStoreInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto">
            <StoreInfo onClose={() => setIsStoreInfoOpen(false)} />
          </div>
        </div>
      )}

      {/* Floating Back to Top Button */}
      <BackToTop />

    </div>
  );
}
