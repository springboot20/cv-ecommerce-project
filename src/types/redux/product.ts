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
  sizes: {
    name: string;
    inStock: boolean;
  }[];
  colors: string[];
  createdAt: string;
  updatedAt: string;
}

export type Rating = {
  _id: string;
  productId: string;
  userId:
    | string
    | {
      _id:string;
        name: string;
        avatar: {
          url: string;
          public_id: string;
        };
      };
  rate: number;
  isVerifiedPurchase:boolean;
  comment?: string;
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
