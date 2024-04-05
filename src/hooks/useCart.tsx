import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';

export const useCart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return useMemo(() => ({ cart }), [cart]);
};
