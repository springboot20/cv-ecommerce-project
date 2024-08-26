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
  role: string;
}

export type InitialState = {
  loading: "idle" | "pending" | "succeeded" | "failed";
  isAuthenticated: boolean;
  data: {
    user: User | null;
    tokens: Token | null;
  };
  requestedId?: string;
  error: null;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};
