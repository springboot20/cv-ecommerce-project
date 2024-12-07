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

type ImageSrc = {
  url: string;
  public_id: string;
  _id: string;
};

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

type CartItem = {
  _id: string;
  product: Product;
  quantity: number;
};

type Cart = {
  _id: string;
  items: CartItem[];
  totalCart: number;
};

type OrderItem = {
  quantity: number;
  productId: string;
  _id: string;
};

type Order = {
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

export type OrderResponse = {
  data: {
    cart: Cart;
    order: Order;
  };
};

type OrderStatus = "COMPLETED" | "PENDING";

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

export type YearlyStats = {
  _id: {
    year: number;
    status: OrderStatus;
  };
  order_items: number;
  total_amount: number;
  count: number;
};

export type Statistics = {
  weekly: WeeklyStats[];
  monthly: MonthlyStats[];
  yearly: YearlyStats[];
};

export type OrderStatsResponse = Statistics[];
