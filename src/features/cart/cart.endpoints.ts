import { ApiSlice } from '../../app/services/api.service';

const CartEndpoints = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: () => ``,
    }),
  }),
});

export const { useGetUserCartQuery } = CartEndpoints;
