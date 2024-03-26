import { useContext, createContext, useState } from 'react';
import { loginUser, logoutUser, registerUser } from '../api/Axios';
import { AuthContextInterface, AuthProviderProps } from '../types/context.types';
import { UserInterface } from '../types/user.types';
import { apiRequestHandler } from '../util';
import { Loader } from '../components/Loader';

const AuthContext = createContext<AuthContextInterface>({
  tokens: null,
  user: null,
  register: async () => Promise<void>,
  login: async () => Promise<void>,
  logout: async () => Promise<void>,
});

// function isTokenExpire(arg) {
//   let currentTime = Math.floor(new Date() / 1000);
//   if (arg && arg.exp) {
//     return currentTime >= arg.exp;
//   }
//   return false;
// }

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [tokens, setTokens] = useState<{ access_token: string; refresh_token: string } | null>(
    null
  );
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const register = async (data: { username: string; email: string; password: string }) => {
    await apiRequestHandler({
      api: async () => await registerUser(data),
      setLoading: setLoading,
      onSuccess: (res, message, toast) => {
        const { data } = res;

        setUser(data?.user);

        toast(message);
      },
      onError: (error, toast) => {
        toast(error);
      },
    });
  };

  const login = async (data: { username?: string; email?: string; password: string }) =>
    await apiRequestHandler({
      api: async () => await loginUser(data),
      setLoading: setLoading,
      onSuccess: (res, message, toast) => {
        const { data } = res;

        setUser(data?.user);

        toast(message);
      },
      onError: (error, toast) => {
        toast(error);
      },
    });

  const logout = async () =>
    await apiRequestHandler({
      api: async () => await logoutUser(),
      setLoading: setLoading,
      onSuccess: (__, message, toast) => {
        setUser(null);
        setTokens(null);

        toast(message);
      },
      onError: (error, toast) => {
        toast(error);
      },
    });

  return (
    <AuthContext.Provider
      value={{
        tokens,
        user,
        register,
        login,
        logout,
      }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
