import { ProductType } from "./product";

// Address interface
export interface AddressInterface {
  _id: string;
  owner: string;
  city: string;
  country: string;
  address_line_one: string;
  address_line_two: string;
  zipcode: string;
  state: string;
  phone: string;
  firstname: string;
  lastname: string;
  createdAt: string;
}

// Image source type
type ImageSrc = {
  url: string;
  public_id: string;
  _id: string;
};

// Product type
type Product = {
  _id: string;
  user: string;
  name: string;
  featured: boolean;
  price: number;
  description: string;
  imageSrc: ImageSrc;
  category: string;
  stock: number;
  subImgs: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Cart item type
type CartItem = {
  _id: string;
  product: Product;
  quantity: number;
};

// Cart type
type Cart = {
  _id: string;
  items: CartItem[];
  totalCart: number;
};

// Order item type
type OrderItem = {
  quantity: number;
  productId: string;
  _id: string;
};

// Order (for processing orders)
export type OrderProcessing = {
  _id: string;
  customer: string;
  address: string;
  items: OrderItem[];
  orderStatus: string;
  isPaymentDone: boolean;
  paymentId: string;
  paymentMethod: string;
  orderPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// OrderResponse type for returning orders and cart data
export type OrderResponse = {
  data: {
    cart: Cart;
    order: OrderProcessing;
  };
};

// Order status type (used in different statistics)
type OrderStatus = "COMPLETED" | "PENDING";

// Daily statistics type
export type DailyStats = {
  _id: {
    day: number;
    month: number;
    year: number;
    status: OrderStatus;
  };
  order_items: number;
  total_amount: number;
  count: number;
};

// Weekly statistics type
export type WeeklyStats = {
  _id: {
    week: number;
    year: number;
    status: OrderStatus;
  };
  order_items: number;
  total_amount: number;
  count: number;
};

// Monthly statistics type
export type MonthlyStats = {
  _id: {
    month: number;
    year: number;
    status: OrderStatus;
  };
  order_items: number;
  total_amount: number;
  count: number;
};

// Statistics type for daily, weekly, and monthly data
export type Statistics = {
  daily: DailyStats[];
  weekly: WeeklyStats[];
  monthly: MonthlyStats[];
};

// Order statistics response type
export type OrderStatsResponse = Statistics[];

// All stats interface
export interface AllStatsInterface {
  totalProducts: number;
  product: {
    averagePrice: number;
    totalSales: number;
  };
  totalOrders: number;
  customers: number;
}

// Customer type
export type Customer = {
  _id: string;
  username: string;
  email: string;
};

// Orders type (for tracking multiple orders)
export interface Orders {
  _id: string;
  customer: Customer;
  address?: AddressInterface;
  orderStatus: "COMPLETED" | "PENDING" | "CANCELLED";
  isPaymentDone: boolean;
  paymentId: string;
  paymentMethod: "PAYSTACK" | "OTHER_METHOD";
  orderPrice: number;
  createdAt: string;
  updatedAt: string;
  totalOrder?: number;
  __v: number;
}

// Order item type (for order details)
type OrderItems = {
  quantity: number;
  product: ProductType;
};

// General Order structure (for fetched orders)
export type OrderFetched = {
  items: OrderItems[];
} & Orders;
