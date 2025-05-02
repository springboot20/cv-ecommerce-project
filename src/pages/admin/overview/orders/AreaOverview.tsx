import { useEffect, useState } from "react";
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

const OrderCountsChart = () => {
  const { data, refetch, isLoading } = useGetOrderStatsQuery();
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">("daily");
  const response: OrderStatsResponse = data?.data?.statistics;
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

  const activeStats =
    activeTab === "daily"
      ? dailyStats
      : activeTab === "weekly"
      ? weeklyStats
      : activeTab === "monthly"
      ? monthlyStats
      : [];

  const series = [
    {
      name: "Completed Orders",
      data: activeStats
        ?.filter((item) => item?._id.status === "COMPLETED")
        .map((item) => item?.count),
    },
    {
      name: "Pending Orders",
      data: activeStats
        ?.filter((item) => item?._id.status === "PENDING")
        .map((item) => item?.count),
    },
  ];

  const options = {
    xaxis: {
      categories: activeStats.map((item) => {
        const id = item?._id;

        if (activeTab === "daily" && "day" in id && "month" in id) {
          return `Day ${id.day}, ${id.month}/${id.year}`;
        } else if (activeTab === "weekly" && "week" in id) {
          return `Week ${id.week}, ${id.year}`;
        } else if (activeTab === "monthly" && "month" in id) {
          return `Month ${id.month}, ${id.year}`;
        } else {
          return ""; // Fallback in case of invalid data
        }
      }),
    },
    title: {
      text: "Order Counts",
      style: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "20px",
      },
    },
    colors: ["#28A745", "#FF5733"],
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
        fontFamily: "Poppins, sans-serif",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return isLoading || !data || statistics.length ? (
    <div className="flex items-center justify-center h-full">
      <Loading />
    </div>
  ) : (
    <div>
      {/* Tabs for Switching Data */}
      <div className="flex justify-end mb-2">
        {["daily", "weekly", "monthly"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1.5 mx-2 font-semibold border rounded ${
              activeTab === tab ? "bg-green-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab(tab as "daily" | "weekly" | "monthly")}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <ChartComponent
        options={{
          ...options,
          chart: {
            ...options.chart,
            animations: {
              animateGradually: {
                delay: 300,
              },
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 15,
              distributed: true,
            },
          },
          grid: {
            show: true,
            borderColor: "#E5E7EB",
            strokeDashArray: 4,
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 0,
              right: 10,
              bottom: 0,
              left: 10,
            },
          },
        }}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default OrderCountsChart;
