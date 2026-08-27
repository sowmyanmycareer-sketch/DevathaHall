import { Product, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'dh-001',
    name: 'Pure Kanjeevaram Bridal Silk Saree in Royal Crimson & Pure Zari',
    category: 'Kanjeevaram Silk',
    price: 18500,
    originalPrice: 22000,
    discountPercentage: 16,
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    stockQuantity: 8,
    sku: 'DH-KANJEE-001',
    fabric: '100% Pure Mulberry Silk (Silk Mark Certified)',
    color: 'Crimson Red & Antique Gold',
    blousePiece: 'Included (Unstitched Pure Silk Brocade)',
    description: 'Exquisite handwoven Kanjeevaram silk saree from Devatha Hall, woven with 2G pure gold zari motifs featuring traditional peacock and chakra patterns. Perfect for grand weddings and Muhurtham ceremonies.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1610030469668-932dd5961904?auto=format&fit=crop&q=80&w=1000'
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'dh-002',
    name: 'Peacock Green Handloom Soft Silk Saree with Copper Zari Border',
    category: 'Soft Silk Sarees',
    price: 7450,
    originalPrice: 8990,
    discountPercentage: 17,
    rating: 4.8,
    reviewsCount: 35,
    inStock: true,
    stockQuantity: 12,
    sku: 'DH-SOFT-002',
    fabric: 'Lightweight Soft Silk',
    color: 'Peacock Green & Copper',
    blousePiece: 'Included (Contrast Copper Running Blouse)',
    description: 'Ultra-light, silky drape designed for effortless elegance. Rich peacock green body embellished with delicate floral copper zari vanki borders.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000'
    ],
    isFeatured: true
  },
  {
    id: 'dh-003',
    name: 'Traditional Royal Blue Pure Silk Dhoti & Angavastram Set for Men',
    category: 'Menswear & Dhotis',
    price: 3800,
    originalPrice: 4500,
    discountPercentage: 15,
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    stockQuantity: 15,
    sku: 'DH-MENS-003',
    fabric: 'Pure Mulberry Silk',
    color: 'Cream Gold with Royal Blue Zari Border',
    blousePiece: 'N/A (Includes Matching Angavastram)',
    description: 'Traditional 9x5 silk dhoti and shirt material set with rich gold and royal blue zari borders. Crafted for weddings, temple rituals, and grand festivals.',
    images: [
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=1000'
    ],
    isFeatured: true
  },
  {
    id: 'dh-004',
    name: 'Bridal Velvet & Raw Silk Designer Lehenga Choli Set',
    category: 'Wedding Special',
    price: 24900,
    originalPrice: 29900,
    discountPercentage: 16,
    rating: 5.0,
    reviewsCount: 19,
    inStock: true,
    stockQuantity: 4,
    sku: 'DH-WEDD-004',
    fabric: 'Micro Velvet & Net Dupatta',
    color: 'Deep Maroon & Antique Gold Threadwork',
    blousePiece: 'Custom Stitched Blouse Piece Included',
    description: 'Grand wedding lehenga handcrafted with intricate zardozi, sequins, and metallic dori embroidery. Comes with dual embroidered soft net dupattas.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1000'
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'dh-005',
    name: 'Pastel Pink Hand Embroidered Anarkali Kurti Set with Dupatta',
    category: 'Women Kurtis & Dress',
    price: 2950,
    originalPrice: 3600,
    discountPercentage: 18,
    rating: 4.7,
    reviewsCount: 51,
    inStock: true,
    stockQuantity: 20,
    sku: 'DH-KURTI-005',
    fabric: 'Georgette & Cotton Lining',
    color: 'Pastel Blush Pink',
    blousePiece: 'Fully Stitched Top, Pants & Organza Dupatta',
    description: 'Floor-length flowy Anarkali with intricate chikankari and mirror accent work. Perfect for festive gatherings, puja functions, and family occasions.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'dh-006',
    name: 'Kids Royal Jacquard Silk Sherwani Set with Dhoti Pants',
    category: 'Kids Ethnic Wear',
    price: 2200,
    originalPrice: 2800,
    discountPercentage: 21,
    rating: 4.8,
    reviewsCount: 16,
    inStock: true,
    stockQuantity: 10,
    sku: 'DH-KIDS-006',
    fabric: 'Soft Jacquard Silk Blend',
    color: 'Ivory Gold & Maroon',
    blousePiece: 'Stitched Sherwani, Dhoti & Stole',
    description: 'Comfortable cotton-lined festive kidswear for boys aged 2-10 years. Non-itchy skin-friendly fabric with soft gold brocade detailing.',
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'dh-007',
    name: 'Sunshine Yellow Mysore Silk Crepe Saree with Rich Zari Pallu',
    category: 'Designer Sarees',
    price: 9800,
    originalPrice: 11500,
    discountPercentage: 14,
    rating: 4.9,
    reviewsCount: 33,
    inStock: true,
    stockQuantity: 6,
    sku: 'DH-MYS-007',
    fabric: 'Pure Mysore Silk Crepe',
    color: 'Bright Mustard Yellow & Magenta',
    blousePiece: 'Included (Unstitched Pure Magenta Silk)',
    description: 'Authentic Mysore Silk saree with lightweight luster, contrast golden zari pallu and traditional solid zari borders. Ideal for Gowri-Ganesha, Varamahalakshmi & family functions.',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000'
    ],
    isFeatured: true
  },
  {
    id: 'dh-008',
    name: 'Men’s Handloom Silk Kurta & Jacquard Nehru Jacket Combo',
    category: 'Menswear & Dhotis',
    price: 3400,
    originalPrice: 4200,
    discountPercentage: 19,
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
    stockQuantity: 14,
    sku: 'DH-MENS-008',
    fabric: 'Art Silk & Raw Silk Vest',
    color: 'Emerald Green Kurta with Gold Jacket',
    blousePiece: 'Includes Kurta, Pyjama Pants & Nehru Jacket',
    description: 'Premium menswear ensemble featuring crisp stitched silk kurta, tailored churidar pants, and a brocade woven vest jacket.',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'dh-009',
    name: 'Kids Pattu Pavadai / Silk Lehenga Set for Girls',
    category: 'Kids Ethnic Wear',
    price: 2650,
    originalPrice: 3200,
    discountPercentage: 17,
    rating: 4.9,
    reviewsCount: 30,
    inStock: true,
    stockQuantity: 9,
    sku: 'DH-KIDS-009',
    fabric: 'Pure Kanchi Silk Blend',
    color: 'Magenta Pink & Peacock Blue',
    blousePiece: 'Fully Stitched Top & Skirt with Zari Border',
    description: 'Traditional South Indian Pattu Pavadai set for young girls with rich zari border motifs and comfortable inner lining.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1000'
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Savitramma Gowda (Kolar)',
    rating: 5,
    date: '2 days ago',
    comment: 'Purchased my daughter’s Muhurtham Kanjeevaram silk saree from Devatha Hall at Doddapet Road. The quality of pure gold zari and original silk is unmatched in Kolar! Online reservation was very convenient.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    userName: 'Kiran Kumar R. (Kolar Gold Fields)',
    rating: 5,
    date: '1 week ago',
    comment: 'Best traditional cloth store in Doddapet Kolar! Bought Silk Dhotis and Kurta jacket sets. Fast doorstep delivery and excellent customer service over WhatsApp 85532 99639.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    userName: 'Anusha Reddy (Bengaluru)',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Ordered soft silk saree online for a family puja. Delivered within 24 hours from Kolar to Bangalore. Beautiful colors exactly as shown in the picture gallery!',
    verifiedPurchase: true
  }
];

export const STORE_DETAILS = {
  name: 'Devatha Hall',
  tagline: 'Clothing Center & Silk Saree Destination',
  address: 'Srinivasam, Doddapet Road, Kolar, Karnataka 563101',
  phone: '85532 99639',
  whatsapp: '918553299639',
  hours: 'Open Daily: 9:30 AM – 9:00 PM (21:00)',
  statusText: 'Open Now · Closes 21:00',
  googleMapsUrl: 'https://maps.google.com/?q=Srinivasam+Doddapet+Road+Kolar+Karnataka'
};
