export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  sku: string;
  stock: number;
  priceAdjustment: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  isFeatured: boolean;
  inStock: boolean;
  images: string[]; // parsed from JSON
  category: string;
  edition: string;
  primaryColor: string;
  specifications?: Record<string, string> | null;
  careInstructions?: string[] | null;
  createdAt: string;
  variants: ProductVariant[];
  reviews?: Review[];
  avgRating?: number;
  reviewCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item id in cart (e.g. productId-color-size)
  productId: string;
  variantId?: string;
  name: string;
  edition: string;
  slug: string;
  image: string;
  color?: string;
  size: string;
  price: number;
  quantity: number;
  maxStock: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string | null;
  productName: string;
  productImage: string;
  color?: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  postalCode: string;
  orderNotes?: string | null;
  subtotal: number;
  shippingFee: number;
  codCharge: number;
  discount: number;
  totalAmount: number;
  paymentMethod: 'COD' | 'UPI_ONLINE' | 'RAZORPAY';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  orderStatus: 'PLACED' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  trackingNotes?: string | null;
  createdAt: string;
  items: OrderItem[];
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  phone?: string | null;
}
