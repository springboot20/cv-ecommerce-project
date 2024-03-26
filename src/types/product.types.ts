import { UserInterface } from './user.types';

export interface ProductInterface {
  _id: string;
  owner: UserInterface | null;
  name: string;
  price: number;
  description: string;
  mainImg: {
    url: string;
    localPath: string;
  };
  subImgs: {
    url: string;
    localPath: string;
  }[];
  category: {
    name: string;
    owner: UserInterface;
  };
  stock: number;
}
