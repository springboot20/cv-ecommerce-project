import { ApiSlice } from '../../app/services/api.service';
import { CartTypes, ResponseObj } from '../../types';

type Carts = CartTypes[];

const PRODUCT_URL = '/cart';

const CartEndpoints = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query<CartTypes, void>({
      query: () => ``,
    }),
  }),
});

export const { useGetUserCartQuery } = CartEndpoints;
