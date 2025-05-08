export interface ProductType {
  _id: string;
  name: string;
  user: string;
  price: number;
  stock: number;
  featured: boolean;
  description: string;
  imageSrc: { url: string; public_id: string };
  subImgs: { url: string; public_id: string }[];
  category: ProductCategory;
  rating: Rating;
  sizes: {
    name: string;
    inStock: boolean;
  }[];
  colors: string[];
}

type Rating = {
  _id: string;
  productId: string;
  rate: number;
  comment?:string;
  createdAt: string;
  updatedAt: string;
};

export interface InitialState {
  products: ProductType[];
  product: ProductType;
  requestedId?: string;
  error: null;
}

export interface ProductCategory {
  _id: string;
  name: string;
}
