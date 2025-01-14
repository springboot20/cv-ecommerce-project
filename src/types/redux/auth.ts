export interface User {
  _id: string;
  email: string;
  username: string;
  isEmailVerified: boolean;
  avatar?: {
    url: string;
    public_id: string;
  };
  updatedAt: string;
  createdAt: string;
  emailVerificationTokenExpiry?: string;
  forgotPasswordTokenExpiry?: string;
  role: string;
}

export type InitialState = {
  user: User | null;
  tokens: Token | null;
  isAuthenticated: boolean;
};

export type Token = {
  access_token: string;
  refresh_token: string;
};

export enum AcceptedRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}