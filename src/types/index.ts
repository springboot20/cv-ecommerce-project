export type UserTypes = {
  _id?: string;
  avatar?: {
    url: string;
    localPath: string;
    _id: string;
  };
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  role?: string;
};

export type ProductType = {
  _id: string;
  owner: UserTypes | null;
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
    owner: UserTypes;
  };
  stock: number;
};

export type CartTypes = {
  _id: string;
  owner: UserTypes | null;
  items:
    | Array<{
        _id: string;
        quantity: number;
        product: ProductType;
      }>
    | [];
  discountedPrice: number;
  cartTotal: number;
};

export type AuthRegisterPayload = { username: string; email: string; password: string };

export type AuthLoginPayload = { username?: string; email?: string; password: string };

export type ProductPayload = {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
};

export type AuthStateType = {
  userData: UserTypes | null;
  tokens: { accessToken: string; refreshToken: string } | null;
  isAuthenticated: boolean;
};

export type ResponseObj = {
  statusCode: number | undefined;
  message: string | undefined;
};

export type showPasswordProps = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export type InputProps = React.ComponentProps<'input'>;
export type ButtonProps = React.ComponentProps<'button'>;

export type FeaturedCardProps = {
  cards: Array<{
    icon: string;
    title: string;
    description: string;
    alt: string;
  }>;
};

export type NavRoutesType = {
  routes: Array<{ title: string; to: string; current: boolean }>;
};

export interface SignUpInitialValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInInitialValues {
  username?: string;
  email?: string;
  password: string;
}
