/* eslint-disable no-unsafe-optional-chaining */
import { useEffect } from "react";
import ChartComponent from "../../../../components/chart/Chart";
import {
  DailyStats,
  MonthlyStats,
  OrderStatsResponse,
  Statistics,
  WeeklyStats,
} from "../../../../types/redux/order";
import { Loading } from "../../../../components/loaders/Loading";
import { useGetOrderStatsQuery } from "../../../../features/statistics/statistics.slice";

export const PieOverview = () => {
  const { data, isLoading, refetch } = useGetOrderStatsQuery();

  const response: OrderStatsResponse = data?.data?.statistics;

  const statistics = Array.isArray(response) ? response : [response];

  console.log(statistics);

  const initialStats: Statistics = {
    daily: [] as DailyStats[],
    weekly: [] as WeeklyStats[],
    monthly: [] as MonthlyStats[],
  };

  const stats: Statistics = statistics?.reduce((acc: Statistics, s: any) => {
    acc.daily = s?.daily ?? [];
    acc.weekly = s?.weekly ?? [];
    acc.monthly = s?.monthly ?? [];
    return acc;
  }, initialStats);

  const dailyStats = stats?.daily ?? [];
  const weeklyStats = stats?.weekly ?? [];
  const monthlyStats = stats?.monthly ?? [];

  const completedOrders = [
    ...dailyStats?.filter((item) => item?._id?.status === "COMPLETED")?.map((item) => item?.count),
    ...weeklyStats?.filter((item) => item?._id?.status === "COMPLETED")?.map((item) => item?.count),
    ...monthlyStats
      ?.filter((item) => item?._id?.status === "COMPLETED")
      ?.map((item) => item?.count),
  ];

  const pendingOrders = [
    ...dailyStats?.filter((item) => item?._id?.status === "PENDING")?.map((item) => item?.count),
    ...weeklyStats?.filter((item) => item?._id?.status === "PENDING")?.map((item) => item?.count),
    ...monthlyStats?.filter((item) => item?._id?.status === "PENDING")?.map((item) => item?.count),
  ];

  const pieSeries = [
    completedOrders.reduce((acc, count) => acc + count, 0),
    pendingOrders.reduce((acc, count) => acc + count, 0),
  ];

  const pieOptions = {
    labels: ["Completed Orders", "Pending Orders"],
    title: {
      text: "Order Status",
      style: {
        fontFamily: "Poppins, sans-serif",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "14px",
      },
    },
    colors: ["#28A745", "#FF5733"],
    annotations: {
      texts: [
        {
          y: 12,
          x: 20,
          fontSize: 16,
          fontFamily: "Poppins, sans-serif",
          fontWeight: "medium",
        },
      ],
    },
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return isLoading || !data || statistics.length ? (
    <div className="flex items-center justify-center min-h-72">
      <Loading />
    </div>
  ) : (
    <div className="h-full">
      <ChartComponent
        type="donut"
        options={{
          ...pieOptions,
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "16px",
            fontFamily: "Roboto, sans-serif",
          },
          plotOptions: {
            pie: {
              donut: {
                size: "55%",
              },
            },
          },
        }}
        series={pieSeries}
        height="100%"
        width="100%"
      />
    </div>
  );
};
