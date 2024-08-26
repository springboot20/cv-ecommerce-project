export interface ProductType {
  _id: string;
  name: string;
  user: string;
  price: number;
  stock: number;
  featured: boolean;
  description: string;
  imageSrc: { url: string; localPath: string };
  subImgs: { url: string; localPath: string }[];
  category: string;
}

export interface InitialState {
  products: ProductType[];
  product: ProductType;
  requestedId?: string;
  error: null;
}
