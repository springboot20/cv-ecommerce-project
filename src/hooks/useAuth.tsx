import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';

export const useAuth = () => {
  const { userData, token, isAuthenticated } = useAppSelector((state) => state.auth);

  return useMemo(
    () => ({
      userData,
      token,
      isAuthenticated,
    }),
    [userData, token, isAuthenticated]
  );
};
