export type UserTypes = {
  id?: string | number;
  name: string;
  avatar: string;
  email: string;
};

export type ProductType = {
  id: string | number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
};

export type CartTypes = {
  product: ProductType;
  quantity: number;
};

export type AuthRegisterPayload = {
  avatar: string;
  name: string;
  email: string;
  password: string;
};

export type AuthLoginPayload = { email: string; password: string };

export type ProductPayload = {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
};

export type AuthStateType = {
  userData: UserTypes | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
};

export type Tokens = { access_token: string; refresh_token: string };

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
  [key: string]: string;
}

export interface SignInInitialValues {
  email: string;
  password: string;
}
