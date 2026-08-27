export type ProductCategory = 
  | 'All' 
  | 'Kanjeevaram Silk' 
  | 'Soft Silk Sarees' 
  | 'Designer Sarees' 
  | 'Menswear & Dhotis' 
  | 'Women Kurtis & Dress' 
  | 'Kids Ethnic Wear' 
  | 'Wedding Special';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  fabric: string;
  color: string;
  blousePiece: string; // e.g. "Included (Unstitched)", "Contrast Pink", etc.
  description: string;
  images: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  deliveryMethod: 'doorstep' | 'store_pickup';
  notes?: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod_store';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
  status: 'Received' | 'Processing' | 'Ready for Pickup' | 'Dispatched' | 'Delivered';
  paymentStatus: 'Paid' | 'Pending at Store';
  transactionId: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}
