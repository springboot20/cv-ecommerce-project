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

  const apexBarChartOptions = {
    series: [
      {
        name: "Weekly Orders",
        data: weeklyStats?.map((stat) => ({
          x: `Week ${stat._id.week} ${stat._id.year}`,
          y: stat?.count,
        })),
      },
      {
        name: "Monthly Orders",
        data: monthlyStats?.map((stat) => ({
          x: `Month ${stat._id.month} ${stat._id.year}`,
          y: stat?.count,
        })),
      },
      {
        name: "Yearly Orders",
        data: yearlyStats?.map((stat) => ({
          x: `Year ${stat._id.year}`,
          y: stat?.count,
        })),
      },
    ],
    options: {
      xaxis: {
        categories: weeklyStats?.map((stat) => `Week ${stat._id.week} ${stat._id.year}`),
        title: {
          text: "Bar Chart: Weekly, Monthly and Yearl Orders",
          align: "center",
        },
      },
    },
  };

  return (
    <div className="max-w-full">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <ChartComponent
          type="bar"
          options={apexBarChartOptions.options}
          series={apexBarChartOptions.series}
          height={350}
          width={1000}
        />
      )}
    </div>
  );
};
