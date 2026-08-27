import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Check, 
  X, 
  TrendingUp, 
  AlertTriangle, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  RefreshCw,
  Sparkles,
  Layers,
  Upload,
  Image as ImageIcon,
  Trash2,
  Camera,
  Link as LinkIcon
} from 'lucide-react';
import { Product, ProductCategory, Order } from '../types';
import { STORE_DETAILS } from '../data/products';

interface InventoryManagerProps {
  products: Product[];
  onUpdateStock: (productId: string, newStock: number) => void;
  onToggleInStock: (productId: string) => void;
  onAddProduct: (product: Product) => void;
  recentOrders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onExitAdmin: () => void;
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

export const InventoryManager: React.FC<InventoryManagerProps> = ({
  products,
  onUpdateStock,
  onToggleInStock,
  onAddProduct,
  recentOrders,
  onUpdateOrderStatus,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'add'>('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory>('All');

  // New Product Form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Kanjeevaram Silk',
    price: 5000,
    originalPrice: 6000,
    discountPercentage: 16,
    rating: 5.0,
    reviewsCount: 1,
    inStock: true,
    stockQuantity: 10,
    sku: `DH-${Math.floor(100 + Math.random() * 900)}`,
    fabric: 'Pure Silk Mark Certified',
    color: 'Red & Gold',
    blousePiece: 'Included (Unstitched)',
    description: 'Authentic silk product from Devatha Hall, Doddapet Road, Kolar.',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000']
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // File Upload Handlers
  const handleImageFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setNewProduct((prev) => ({
            ...prev,
            images: [...(prev.images || []), result]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleImageFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageFiles(e.dataTransfer.files);
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setNewProduct((prev) => ({
      ...prev,
      images: [...(prev.images || []), imageUrlInput.trim()]
    }));
    setImageUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleSetPrimaryImage = (index: number) => {
    setNewProduct((prev) => {
      const currentImages = [...(prev.images || [])];
      if (index <= 0 || index >= currentImages.length) return prev;
      const [selected] = currentImages.splice(index, 1);
      currentImages.unshift(selected);
      return { ...prev, images: currentImages };
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalCatalogItems = products.length;
  const lowStockCount = products.filter((p) => p.stockQuantity > 0 && p.stockQuantity <= 5).length;
  const outOfStockCount = products.filter((p) => !p.inStock || p.stockQuantity === 0).length;
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.stockQuantity, 0);

  const formattedCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in product name and price.');
      return;
    }

    const created: Product = {
      id: `dh-custom-${Date.now()}`,
      name: newProduct.name || 'Custom Silk Product',
      category: (newProduct.category as ProductCategory) || 'Kanjeevaram Silk',
      price: Number(newProduct.price) || 5000,
      originalPrice: Number(newProduct.originalPrice) || 6000,
      discountPercentage: Math.round(((Number(newProduct.originalPrice) - Number(newProduct.price)) / Number(newProduct.originalPrice)) * 100) || 10,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockQuantity: Number(newProduct.stockQuantity) || 10,
      sku: newProduct.sku || `DH-SKU-${Math.floor(100 + Math.random() * 900)}`,
      fabric: newProduct.fabric || 'Pure Silk',
      color: newProduct.color || 'Multicolor',
      blousePiece: newProduct.blousePiece || 'Included',
      description: newProduct.description || 'Devatha Hall clothing item.',
      images: newProduct.images?.length ? newProduct.images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000']
    };

    onAddProduct(created);
    alert(`Product "${created.name}" successfully added to Devatha Hall live inventory!`);
    
    // Reset form state
    setNewProduct({
      name: '',
      category: 'Kanjeevaram Silk',
      price: 5000,
      originalPrice: 6000,
      discountPercentage: 16,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockQuantity: 10,
      sku: `DH-${Math.floor(100 + Math.random() * 900)}`,
      fabric: 'Pure Silk Mark Certified',
      color: 'Red & Gold',
      blousePiece: 'Included (Unstitched)',
      description: 'Authentic silk product from Devatha Hall, Doddapet Road, Kolar.',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000']
    });
    setImageUrlInput('');
    setActiveTab('inventory');
  };

  return (
    <div className="bg-[#FFF7F4] text-[#2C1E1A] min-h-screen p-4 sm:p-6 space-y-6">
      
      {/* Top Staff Banner */}
      <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 rounded-xs border border-[#F0CFC3] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#E06B52] text-white font-bold text-[9px] px-2 py-0.5 rounded-xs uppercase tracking-widest">
              Staff Portal
            </span>
            <span className="text-[10px] text-[#7A645D] font-mono">Store Helpline: {STORE_DETAILS.phone}</span>
          </div>
          <h1 className="text-xl font-serif font-semibold text-[#2C1E1A] mt-1">
            Devatha Hall Inventory Management System
          </h1>
          <p className="text-xs text-[#7A645D]">
            Real-time stock control, SKU tracking & online order processing for Srinivasam, Doddapet Road, Kolar
          </p>
        </div>

        <button
          onClick={onExitAdmin}
          className="px-4 py-2.5 bg-[#E06B52] hover:bg-[#C8563E] text-white text-xs font-bold rounded-xs transition-all uppercase tracking-widest shrink-0 cursor-pointer"
        >
          ← Back to Customer Store
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xs border border-[#F0CFC3]">
          <div className="text-[10px] font-bold text-[#C8563E] uppercase tracking-widest">Total Catalog SKUs</div>
          <div className="text-2xl font-bold text-[#2C1E1A] mt-1">{totalCatalogItems}</div>
          <span className="text-[10px] text-[#7A645D]">Active in Kolar catalog</span>
        </div>

        <div className="bg-white p-4 rounded-xs border border-[#F0CFC3]">
          <div className="text-[10px] font-bold text-[#C8563E] uppercase tracking-widest">Total Inventory Value</div>
          <div className="text-xl font-bold text-[#2C1E1A] mt-1">{formattedCurrency(totalInventoryValue)}</div>
          <span className="text-[10px] text-[#7A645D]">At current store prices</span>
        </div>

        <div className="bg-white p-4 rounded-xs border border-[#F0CFC3]">
          <div className="text-[10px] font-bold text-[#C8563E] uppercase tracking-widest">Low Stock Warning</div>
          <div className="text-2xl font-bold text-[#2C1E1A] mt-1 flex items-center gap-2">
            <span>{lowStockCount}</span>
            {lowStockCount > 0 && <AlertTriangle className="w-4 h-4 text-amber-600" />}
          </div>
          <span className="text-[10px] text-[#7A645D] font-medium">≤ 5 pieces remaining</span>
        </div>

        <div className="bg-white p-4 rounded-xs border border-[#F0CFC3]">
          <div className="text-[10px] font-bold text-[#C8563E] uppercase tracking-widest">Recent Orders</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{recentOrders.length}</div>
          <span className="text-[10px] text-[#7A645D]">Received from website</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 border-b border-[#F0CFC3] pb-2">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xs text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'inventory' ? 'bg-[#E06B52] text-white shadow-xs' : 'bg-white text-[#2C1E1A] hover:bg-[#FFF0E8] border border-[#F0CFC3]'
          }`}
        >
          <Package className="w-4 h-4" />
          Live Stock Table ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xs text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'orders' ? 'bg-[#E06B52] text-white shadow-xs' : 'bg-white text-[#2C1E1A] hover:bg-[#FFF0E8] border border-[#F0CFC3]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Customer Online Orders ({recentOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded-xs text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'add' ? 'bg-[#E06B52] text-white shadow-xs' : 'bg-white text-[#2C1E1A] hover:bg-[#FFF0E8] border border-[#F0CFC3]'
          }`}
        >
          <Plus className="w-4 h-4" />
          Add New Clothing Item
        </button>
      </div>

      {/* TAB 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xs border border-stone-200">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Filter by SKU or item name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAFAF8] text-[#1A1A1A] placeholder-stone-400 text-xs pl-9 pr-3 py-2 rounded-xs border border-stone-200 focus:outline-none focus:border-[#1A1A1A]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <span className="text-xs text-stone-500 font-medium shrink-0">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as ProductCategory)}
                className="bg-[#FAFAF8] text-[#1A1A1A] text-xs px-3 py-2 rounded-xs border border-stone-200 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xs border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-[#FAFAF8] text-[#1A1A1A] uppercase text-[10px] tracking-widest font-semibold border-b border-stone-200">
                  <tr>
                    <th className="p-3">Product / Image</th>
                    <th className="p-3">SKU & Category</th>
                    <th className="p-3">Fabric & Color</th>
                    <th className="p-3">Price (₹)</th>
                    <th className="p-3">Stock Quantity</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAFAF8] transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded-xs bg-stone-100 border border-stone-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-medium text-[#1A1A1A] max-w-xs line-clamp-2">
                            {p.name}
                          </span>
                        </div>
                      </td>

                      <td className="p-3">
                        <span className="font-mono text-[#1A1A1A] font-bold block">{p.sku}</span>
                        <span className="text-[9px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-xs border border-stone-200 inline-block mt-0.5 uppercase tracking-wider">
                          {p.category}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className="block font-medium text-stone-800">{p.fabric}</span>
                        <span className="text-[10px] text-stone-400">{p.color}</span>
                      </td>

                      <td className="p-3 font-bold text-[#1A1A1A]">
                        {formattedCurrency(p.price)}
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateStock(p.id, Math.max(0, p.stockQuantity - 1))}
                            className="w-6 h-6 rounded-xs bg-stone-100 hover:bg-stone-200 text-[#1A1A1A] font-bold border border-stone-300 flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold font-mono text-[#1A1A1A]">
                            {p.stockQuantity}
                          </span>
                          <button
                            onClick={() => onUpdateStock(p.id, p.stockQuantity + 1)}
                            className="w-6 h-6 rounded-xs bg-stone-100 hover:bg-stone-200 text-[#1A1A1A] font-bold border border-stone-300 flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => onToggleInStock(p.id)}
                          className={`px-2.5 py-1 rounded-xs text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            p.inStock && p.stockQuantity > 0
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {p.inStock && p.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>

                      <td className="p-3 text-right">
                        <span className="text-[10px] text-stone-400">Synced</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Customer Online Orders */}
      {activeTab === 'orders' && (
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="bg-white rounded-xs border border-stone-200 p-4 space-y-4">
            <h3 className="text-base font-serif font-semibold text-[#1A1A1A] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-700" />
              Customer Orders Received Online
            </h3>

            {recentOrders.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">
                No online orders placed yet. Test placing an order from the customer store!
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((ord) => (
                  <div key={ord.id} className="bg-[#FAFAF8] p-4 rounded-xs border border-stone-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                      <div>
                        <span className="font-mono font-bold text-[#1A1A1A] text-xs">{ord.id}</span>
                        <span className="text-stone-400 text-[11px] ml-2">• {ord.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-600 font-semibold">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as Order['status'])}
                          className="bg-white text-[#1A1A1A] text-xs px-2.5 py-1 rounded-xs border border-stone-300 focus:outline-none"
                        >
                          <option value="Received">Received</option>
                          <option value="Processing">Processing</option>
                          <option value="Ready for Pickup">Ready for Pickup (Doddapet Rd)</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-stone-400 font-semibold block text-[10px] uppercase tracking-wider">Customer:</span>
                        <span className="text-[#1A1A1A] font-bold">{ord.customer.fullName}</span>
                        <span className="text-stone-600 block">Phone: {ord.customer.phone}</span>
                      </div>

                      <div>
                        <span className="text-stone-400 font-semibold block text-[10px] uppercase tracking-wider">Fulfillment Mode:</span>
                        <span className="text-stone-800">
                          {ord.customer.deliveryMethod === 'store_pickup'
                            ? 'Store Pickup at Srinivasam Doddapet Road'
                            : `Doorstep Shipping (${ord.customer.city})`}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-stone-400 font-semibold block text-[10px] uppercase tracking-wider">Total Amount:</span>
                        <span className="text-base font-bold text-[#1A1A1A]">{formattedCurrency(ord.totalAmount)}</span>
                      </div>
                    </div>

                    <div className="text-xs text-stone-700 bg-white p-2.5 rounded-xs border border-stone-200">
                      <strong>Ordered Items:</strong> {ord.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Add New Product Form */}
      {activeTab === 'add' && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xs border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-lg font-serif font-semibold text-[#1A1A1A] flex items-center gap-2">
            <Plus className="w-5 h-5 text-stone-800" />
            Add New Item to Devatha Hall Catalog
          </h3>

          <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-widest text-[10px]">Clothing Item Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Pure Tissue Silk Saree with Copper Zari Border"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full bg-[#FAFAF8] text-[#1A1A1A] placeholder-stone-400 p-2.5 rounded-xs border border-stone-200 focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-widest text-[10px]">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as ProductCategory })}
                  className="w-full bg-[#FAFAF8] text-[#1A1A1A] p-2.5 rounded-xs border border-stone-200 focus:outline-none"
                >
                  {CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-widest text-[10px]">SKU Code</label>
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="w-full bg-[#FAFAF8] text-[#1A1A1A] p-2.5 rounded-xs border border-stone-200 font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-widest text-[10px]">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="w-full bg-[#FAFAF8] text-[#1A1A1A] p-2.5 rounded-xs border border-stone-200 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-widest text-[10px]">MRP Price (₹)</label>
                <input
                  type="number"
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })}
                  className="w-full bg-[#FAFAF8] text-[#1A1A1A] p-2.5 rounded-xs border border-stone-200 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-widest text-[10px]">Initial Stock Qty</label>
                <input
                  type="number"
                  value={newProduct.stockQuantity}
                  onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: Number(e.target.value) })}
                  className="w-full bg-[#FAFAF8] text-[#1A1A1A] p-2.5 rounded-xs border border-stone-200 font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-widest text-[10px]">Fabric Specification</label>
                <input
                  type="text"
                  value={newProduct.fabric}
                  onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                  className="w-full bg-[#FAFAF8] text-[#1A1A1A] p-2.5 rounded-xs border border-stone-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-widest text-[10px]">Color Shade</label>
                <input
                  type="text"
                  value={newProduct.color}
                  onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                  className="w-full bg-[#FAFAF8] text-[#1A1A1A] p-2.5 rounded-xs border border-stone-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-widest text-[10px]">Description & Craftsmanship Details</label>
              <textarea
                rows={3}
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full bg-[#FAFAF8] text-[#1A1A1A] p-2.5 rounded-xs border border-stone-200 focus:outline-none"
              />
            </div>

            {/* PRODUCT IMAGES UPLOAD SECTION */}
            <div className="space-y-3 border-t border-b border-stone-200 py-3 my-2">
              <div className="flex items-center justify-between">
                <label className="block text-stone-600 font-semibold uppercase tracking-widest text-[10px] flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-stone-700" />
                  Product Images & Photo Upload *
                </label>
                <span className="text-[10px] text-stone-500 font-medium">
                  {newProduct.images?.length || 0} image(s) attached
                </span>
              </div>

              {/* Upload Drop Zone & Drag-and-Drop */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xs p-4 text-center transition-all flex flex-col items-center justify-center gap-2 relative ${
                  isDragging 
                    ? 'border-[#1A1A1A] bg-stone-100' 
                    : 'border-stone-300 hover:border-stone-500 bg-[#FAFAF8]'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 border border-stone-200">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">
                    Click to Upload Images or Drag & Drop Photo Files
                  </p>
                  <p className="text-[10px] text-stone-500 mt-0.5">
                    Supports PNG, JPG, WEBP • Upload multiple photos for saree pleats, border & pallu details
                  </p>
                </div>
                <span className="px-3 py-1 bg-white border border-stone-300 rounded-xs text-[10px] font-bold text-stone-800 uppercase tracking-wider shadow-xs hover:bg-stone-50">
                  Browse Files from Device
                </span>
              </div>

              {/* Alternative: Add Image URL */}
              <div className="flex gap-2 pt-1">
                <div className="relative flex-1">
                  <input
                    type="url"
                    placeholder="Or paste direct image URL (https://...)"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="w-full bg-[#FAFAF8] text-[#1A1A1A] placeholder-stone-400 text-xs pl-8 pr-3 py-2 rounded-xs border border-stone-200 focus:outline-none focus:border-[#1A1A1A]"
                  />
                  <LinkIcon className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-[#1A1A1A] font-bold rounded-xs text-xs border border-stone-300 uppercase tracking-wider cursor-pointer"
                >
                  Add URL
                </button>
              </div>

              {/* Sample High-Res Silk Photo Presets */}
              <div className="pt-1 space-y-1">
                <span className="text-[9px] text-stone-500 uppercase tracking-widest font-semibold block">Quick Sample High-Res Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: '+ Red Silk', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000' },
                    { name: '+ Royal Blue', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000' },
                    { name: '+ Green Kanjeevaram', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000' },
                    { name: '+ Gold Zari', url: 'https://images.unsplash.com/photo-1610030469668-932dd5961904?auto=format&fit=crop&q=80&w=1000' }
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setNewProduct(prev => ({
                          ...prev,
                          images: [...(prev.images || []), preset.url]
                        }));
                      }}
                      className="text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded-xs border border-stone-200 cursor-pointer font-medium"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Previews Grid */}
              {newProduct.images && newProduct.images.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] text-stone-600 font-bold uppercase tracking-widest block mb-1.5">
                    Attached Photos ({newProduct.images.length})
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {newProduct.images.map((imgUrl, index) => (
                      <div
                        key={index}
                        className="relative group rounded-xs border border-stone-300 overflow-hidden bg-stone-100 aspect-3/4 flex flex-col justify-between shadow-xs"
                      >
                        <img
                          src={imgUrl}
                          alt={`Uploaded preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1">
                          <div className="flex justify-between items-center">
                            {index === 0 ? (
                              <span className="bg-emerald-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                                Main Cover
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImage(index)}
                                className="bg-white/90 hover:bg-white text-stone-900 text-[8px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider cursor-pointer"
                              >
                                Set Main
                              </button>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="self-end p-1 bg-rose-600 text-white rounded-xs hover:bg-rose-700 transition-colors cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded-xs text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              Add Product to Live Catalog
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
