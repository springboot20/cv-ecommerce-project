import { ApiService } from "../../app/services/api.service";
import { CartInterface } from "../../types/redux/cart";

interface CartRequest {
  productId: string;
  quantity: number;
}

interface Response {
  data: CartInterface | any;
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
      query: ({ productId, quantity }) => ({
        url: `/carts/${productId}`,
        method: "POST",
        body: { quantity },
      }),
      invalidatesTags: [{ type: "Cart", id: "CART_ITEM" }],
    }),

    getUserCart: builder.query<Response, void>({
      query: () => "/carts",
      providesTags: (result) =>
        result?.data?.cart
          ? [{ type: "Cart", id: result?.data?.cart._id }]
          : [{ type: "Cart", id: "CART_ITEM" }],
    }),

    removeItemFromCart: builder.mutation<Response, string>({
      query: (productId) => ({
        url: `/carts/${productId}`,
        method: "PATCH",
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
  useRemoveItemFromCartMutation,
  useClearCartMutation,
} = CartSlice;
