import { ApiService } from "../../app/services/api.service";
import { Orders } from "../../types/redux/order";

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface Query {
  [key: string]: any;
}

export const OrderSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createPaystackOrder: builder.mutation<Response, void>({
      query: () => ({
        url: "/orders/provider/paystack",
        method: "POST",
      }),
    }),

    getAllOrders: builder.query<Response, Query>({
      query: ({ status, page = 1, limit = 10 }) => ({
        url: `/orders?status=${status}?page=${page}?limit=${limit}`,
        method: "GET",
      }),

      providesTags: (result) =>
        result?.data?.orders?.length
          ? [
              ...result?.data.orders.map((order: Orders) => ({
                type: "Product" as const,
                id: order._id,
              })),
              { type: "Order", id: "ORDER" },
            ]
          : [{ type: "Order", id: "ORDER" }],
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

export const {
  useCreatePaystackOrderMutation,
  useUpdatePaystackOrderMutation,
  useGetAllOrdersQuery,
} = OrderSlice;
