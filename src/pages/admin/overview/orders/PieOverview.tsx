import { useEffect } from "react";
import ChartComponent from "../../../../components/chart/Chart";
import { Loader } from "../../../../components/Loader";
import { useGetOrderStatsQuery } from "../../../../features/order/order.slice";
import {
  MonthlyStats,
  OrderStatsResponse,
  Statistics,
  WeeklyStats,
  YearlyStats,
} from "../../../../types/redux/order";
import { LocalStorage } from "../../../../util";

export const PieOverview = () => {
  const { data, isLoading, refetch } = useGetOrderStatsQuery();

  const response =
    data?.data?.statistics ?? (LocalStorage.get("order-stats") as OrderStatsResponse);

  const statistics = Array.isArray(response) ? response : [response];

  console.log(statistics);

  const initialStats: Statistics = {
    weekly: [] as WeeklyStats[],
    monthly: [] as MonthlyStats[],
    yearly: [] as YearlyStats[],
  };

  const stats: Statistics = statistics?.reduce((acc: Statistics, s: any) => {
    acc.weekly = s?.weekly;
    acc.monthly = s?.monthly;
    acc.yearly = s?.yearly;
    return acc;
  }, initialStats);

  const weeklyStats = stats?.weekly;
  const monthlyStats = stats?.monthly;

  const completedOrders = [
    ...weeklyStats?.filter((item) => item?._id?.status === "COMPLETED")?.map((item) => item?.count),
    ...monthlyStats
      ?.filter((item) => item?._id?.status === "COMPLETED")
      ?.map((item) => item?.count),
  ];
  const pendingOrders = [
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
      },
    },
    colors: ["#28A745", "#FF5733"],
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="max-w-full">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <ChartComponent
          type="pie"
          options={pieOptions}
          series={pieSeries}
          height={350}
          width={"100%"}
        />
      )}
    </div>
  );
};
