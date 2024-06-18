import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';

export const useAuth = () => {
  const { userData, tokens, isAuthenticated } = useAppSelector((state) => state.auth);

  return useMemo(
    () => ({
      userData,
      tokens,
      isAuthenticated,
    }),
    [userData, tokens, isAuthenticated]
  );
};
