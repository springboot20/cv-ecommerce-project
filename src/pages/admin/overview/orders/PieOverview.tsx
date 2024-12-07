import { useEffect } from "react";
import ChartComponent from "../../../../components/chart/Chart";
import {
  DailyStats,
  MonthlyStats,
  OrderStatsResponse,
  Statistics,
  WeeklyStats,
} from "../../../../types/redux/order";
import { LocalStorage } from "../../../../util";
import { Loading } from "../../../../components/loaders/Loading";
import { useGetOrderStatsQuery } from "../../../../features/statistics/statistics.slice";

export const PieOverview = () => {
  const { data, isLoading, refetch } = useGetOrderStatsQuery();

  const response =
    data?.data?.statistics ?? (LocalStorage.get("order-stats") as OrderStatsResponse);

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
        fontFamily: "Roboto, sans-serif",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Roboto, sans-serif",
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
          fontFamily: "Roboto",
          fontWeight: "medium",
        },
      ],
    },
  };

  useEffect(() => {
    refetch();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center h-full">
      <Loading />
    </div>
  ) : (
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
              size: "50%",
            },
          },
        },
      }}
      series={pieSeries}
      height={"100%"}
    />
  );
};
