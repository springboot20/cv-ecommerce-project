import { UserTypes, AuthRegisterPayload, AuthLoginPayload } from './index';

export interface AuthContextType {
  token: string | null;
  user: UserTypes | null | void;
  register: (data: AuthRegisterPayload) => Promise<void>;
  login: (data: AuthLoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export type AuthContextProps = {
  children: React.ReactNode;
};
