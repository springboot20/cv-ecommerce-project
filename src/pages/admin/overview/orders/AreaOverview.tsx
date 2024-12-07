import { useEffect } from "react";
import ChartComponent from "../../../../components/chart/Chart";
import { useGetOrderStatsQuery } from "../../../../features/order/order.slice";
import {
  DailyStats,
  MonthlyStats,
  OrderStatsResponse,
  Statistics,
  WeeklyStats,
} from "../../../../types/redux/order";
import { LocalStorage } from "../../../../util";
import { Loading } from "../../../../components/loaders/Loading";

const OrderCountsChart = () => {
  const { data, refetch, isLoading } = useGetOrderStatsQuery();

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
    acc.daily = s?.daily;
    acc.weekly = s?.weekly;
    acc.monthly = s?.monthly;
    return acc;
  }, initialStats);

  const dailyStats = stats?.daily ?? [];
  const weeklyStats = stats?.weekly ?? [];
  const monthlyStats = stats?.monthly ?? [];

  const series = [
    {
      name: "Completed Orders",
      data: [
        ...dailyStats
          ?.filter((item) => item?._id.status === "COMPLETED")
          .map((item) => item?.count),
        ...weeklyStats
          ?.filter((item) => item?._id.status === "COMPLETED")
          .map((item) => item?.count),
        ...monthlyStats
          ?.filter((item) => item?._id.status === "COMPLETED")
          .map((item) => item?.count),
      ],
    },
    {
      name: "Pending Orders",
      data: [
        ...dailyStats?.filter((item) => item?._id.status === "PENDING").map((item) => item?.count),
        ...weeklyStats?.filter((item) => item?._id.status === "PENDING").map((item) => item?.count),
        ...monthlyStats
          ?.filter((item) => item?._id?.status === "PENDING")
          .map((item) => item?.count),
      ],
    },
  ];

  const options = {
    xaxis: {
      categories: [
        ...dailyStats?.map(
          (item) => `Day ${item?._id?.day}, ${item?._id?.month}/${item?._id?.year}`,
        ),
        ...weeklyStats?.map((item) => `Week ${item?._id?.week}, ${item?._id?.year}`),
        ...monthlyStats?.map((item) => `Month ${item?._id?.month}, ${item?._id?.year}`),
      ],
    },
    title: {
      text: "Order? Counts",
      style: {
        fontFamily: "Roboto, sans-serif",
      },
    },
    colors: ["#28A745", "#FF5733"],

    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    tooltip: {
      style: {
        fontFamily: "Roboto, sans-serif",
      },
    },
    dataLabels: {
      enabled: false,
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
      options={{
        ...options,
      }}
      series={series}
      type="area"
      height={350}
    />
  );
};

export default OrderCountsChart;
