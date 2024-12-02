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
}

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
