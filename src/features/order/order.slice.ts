import { ApiService } from "../../app/services/api.service";

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

export const OrderSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createPaystackOrder: builder.mutation<Response, void>({
      query: () => ({
        url: "/orders/provider/paystack",
        method: "POST"
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
