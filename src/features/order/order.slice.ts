import { ApiService } from "../../app/services/api.service";

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

export const OrderSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createPaystackOrder: builder.mutation<Response, string>({
      query: (addressId) => ({
        url: "/orders/provider/paystack",
        method: "POST",
        body: { addressId },
      }),
    }),

    updatePaystackOrder: builder.mutation<Response, { orderId: string; status: string }>({
      query: ({ orderId, status }) => ({
        url: `/orders/status/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const { useCreatePaystackOrderMutation, useUpdatePaystackOrderMutation } = OrderSlice;
