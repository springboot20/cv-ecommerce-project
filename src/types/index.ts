export type UserTypes = {
  id?: string | number;
  username: string;
  avatar: string;
  email: string;
};

export type ProductType = {
  id: string | number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export type CartTypes = {
  id: string | number;
  userId: string | number;
  products: {
    quantity: number;
    id: string | number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }[];
  data: Date | string;
};

export type AuthRegisterPayload = {
  avatar: string;
  name: string;
  email: string;
  password: string;
};

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
  tokens: { access_token: string | undefined; refresh_token: string | undefined };
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
  name: string;
  avatar: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInInitialValues {
  email: string;
  password: string;
}
