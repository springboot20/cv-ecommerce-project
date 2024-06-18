import { ApiSlice } from '../../app/services/api.service';
import { CartTypes } from '../../types';

type Carts = CartTypes[];

const CART_URL = '/cart';

const CartEndpoints = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCart: builder.mutation<CartTypes, string | number>({
      query: (id) => `${CART_URL}/${id}`,
    }),

    getCarts: builder.query<Carts, void>({
      query: () => `${CART_URL}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cart' as const, id })),
              { type: 'Cart', id: 'LIST' },
            ]
          : [{ type: 'Cart', id: 'LIST' }],
    }),
  }),
});

export const { useGetSingleCartMutation, useGetCartsQuery } = CartEndpoints;
