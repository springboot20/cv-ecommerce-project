import { ApiService } from "../../app/services/api.service";

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

export const OrderSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createPaypalOrder: builder.mutation<Response, { addressId: string }>({
      query: ({ addressId }) => ({
        url: "/orders/provider/paypal",
        method: "POST",
        body: { addressId },
      }),
    }),

    verifyPaypalOrder: builder.mutation<Response, string>({
      query: (orderId) => ({
        url: `/orders/provider/paypal/verify-payment/${orderId}`,
        method: "POST",
      }),
    }),

    updatePaypalOrder: builder.mutation<Response, { orderId: string; status: string }>({
      query: ({ orderId, status }) => ({
        url: `/orders/status/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useCreatePaypalOrderMutation,
  useVerifyPaypalOrderMutation,
  useUpdatePaypalOrderMutation,
} = OrderSlice;
