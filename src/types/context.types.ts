import { AuthRegisterPayload, AuthLoginPayload } from './redux.types';
import { UserTypes } from './user.types';

export interface AuthContextType {
  tokens: { accessToken: string; refreshToken: string } | null | void;
  user: UserTypes | null | void;
  register: (data: AuthRegisterPayload) => Promise<void>;
  login: (data: AuthLoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export type AuthContextProps = {
  children: React.ReactNode;
};
