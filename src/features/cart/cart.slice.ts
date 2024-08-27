import { ApiService } from "../../app/services/api.service";
import { CartInterface } from "../../types/redux/cart";

interface CartRequest {
  productId: string;
  quantity: number;
}

interface Response {
  data: CartInterface[] | any;
  statusCode: number;
  message: string;
  success: boolean;
}

export const CartSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    addItemToCart: builder.mutation<
      Response,
      Pick<CartRequest, "productId"> & Partial<CartRequest>
    >({
      query: (productId, ...patch) => ({
        url: `/carts/${productId}`,
        method: "POST",
        body: patch,
      }),
      invalidatesTags: [{ type: "Cart", id: "CART_ITEM" }],
    }),

    getUserCart: builder.query<Response, void>({
      query: () => "/carts",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: CartInterface) => ({ type: "Cart" as const, id: _id })),
              { type: "Cart", id: "CART_ITEM" },
            ]
          : [{ type: "Cart", id: "CART_ITEM" }],
    }),

    removeItemToCart: builder.mutation<
      Response,
      Pick<CartRequest, "productId"> & Partial<CartRequest>
    >({
      query: (productId, ...patch) => ({
        url: `/carts/${productId}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: [{ type: "Cart", id: "CART_ITEM" }],
    }),

    clearCart: builder.mutation<Response, void>({
      query: () => ({
        url: `/carts/`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Cart", id: "CART_ITEM" }],
    }),
  }),
});

export const {
  useAddItemToCartMutation,
  useGetUserCartQuery,
  useRemoveItemToCartMutation,
  useClearCartMutation,
} = CartSlice;
