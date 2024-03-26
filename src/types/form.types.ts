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
