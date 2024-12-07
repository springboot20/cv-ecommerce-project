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

export const OrdersOverview = () => {
  const { isLoading, data } = useGetOrderStatsQuery();

  const response = data?.data as OrderStatsResponse;

  const statistics = response?.data?.statistics;

  const initialStats: Statistics = {
    weekly: [] as WeeklyStats[],
    monthly: [] as MonthlyStats[],
    yearly: [] as YearlyStats[],
  };

  const stats: Statistics = statistics?.reduce((acc, s) => {
    acc.weekly = s?.weekly;
    acc.monthly = s?.monthly;
    acc.yearly = s?.yearly;
    return acc;
  }, initialStats);

  const weeklyStats = stats?.weekly;
  const monthlyStats = stats?.monthly;
  const yearlyStats = stats?.yearly;

  const completedOrders = [
    ...weeklyStats?.filter((item) => item._id.status === "COMPLETED").map((item) => item.count),
    ...monthlyStats?.filter((item) => item._id.status === "COMPLETED").map((item) => item.count),
    ...yearlyStats?.filter((item) => item._id.status === "COMPLETED").map((item) => item.count),
  ];
  const pendingOrders = [
    ...weeklyStats?.filter((item) => item._id.status === "PENDING").map((item) => item.count),
    ...monthlyStats?.filter((item) => item._id.status === "PENDING").map((item) => item.count),
    ...yearlyStats?.filter((item) => item._id.status === "PENDING").map((item) => item.count),
  ];

  const pieSeries = [
    completedOrders.reduce((acc, count) => acc + count, 0),
    pendingOrders.reduce((acc, count) => acc + count, 0),
  ];

  const pieOptions = {
    labels: ["Completed Orders", "Pending Orders"],
    title: { text: "Order Status" },
  };

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
          width={1000}
        />
      )}
    </div>
  );
};
