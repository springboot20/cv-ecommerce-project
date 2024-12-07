import { ApiService } from "../../app/services/api.service";

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

export const StatisticsSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStats: builder.query<Response, void>({
      query: () => ({
        url: `/statistics/orders-stats`,
      }),
    }),

    getAllStats: builder.query<Response, void>({
      query: () => ({
        url: `/statistics`,
      }),
    }),
  }),
});

export const {useGetOrderStatsQuery} = StatisticsSlice;
