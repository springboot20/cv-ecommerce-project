```tsx
import { createContext, useContext, useMemo } from 'react';
import { AuthContextType, AuthContextProps } from '../types/context.types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from '../features/auth/auth.endpoints';
import { setCredentials } from '../features/auth/auth.slice';
import { AuthLoginPayload, AuthRegisterPayload } from '../types/redux.types';
import { LocalStorage, isBrowser } from '../util';
import { toast } from 'react-toastify';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  tokens: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const dispatch = useAppDispatch();

  const [registerMutation] = useRegisterMutation();
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const { userData, tokens } = useAppSelector((state) => state.auth);

  const user = useMemo(() => userData, [userData]);
  const _tokens = useMemo(() => tokens, [tokens]);

  const register = async (data: AuthRegisterPayload) => {
    const response = registerMutation(data).unwrap();

    response
      .then((payload) => {
        toast.success(payload.message);
      })
      .catch((error: any) => {
        if ([401, 403].includes(error?.response?.data.statusCode)) {
          LocalStorage.clear();
          if (isBrowser) window.location.href = '/auth/register';
        }

        toast.error(error.message);
      });
  };

  const login = async (data: AuthLoginPayload) => {
    const response = loginMutation(data).unwrap();

    response
      .then((payload) => {
        dispatch(setCredentials({ userData: payload.userData, tokens: payload.tokens }));

        toast.success(payload.message);
      })
      .catch((error: any) => {
        if ([401, 403].includes(error?.response?.data.statusCode)) {
          LocalStorage.clear();
          if (isBrowser) window.location.href = '/auth/register';
        }

        toast.error(error.message);
      });
  };

  const logout = async () => {
    const response = await logoutMutation(undefined).unwrap();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens: _tokens,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

    ````