import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';

export const useProduct = () => {
  const { data } = useAppSelector((state) => state.product);

  return useMemo(() => ({ data }), [data]);
};
