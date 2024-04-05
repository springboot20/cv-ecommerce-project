import { ApiSlice } from '../../app/services/api.service';
import { ProductPayload, ProductType, ResponseObj } from '../../types';

const PRODUCT_URL = '/products';

type ProductsResponse = ProductType[];

const ProductEndpoints = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<ProductType & ResponseObj, ProductPayload>({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    getProduct: builder.mutation<ProductType & ResponseObj, string | undefined>({
      query: (_id) => `${PRODUCT_URL}/${_id}`,
    }),

    getProducts: builder.query<ProductsResponse & ResponseObj, void>({
      query: () => `${PRODUCT_URL}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Product' as const, _id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery, useGetProductMutation } =
  ProductEndpoints;
