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

  const dailyStats = stats.daily || [];
  const weeklyStats = stats.weekly || [];
  const monthlyStats = stats.monthly || [];

  const activeStats =
    activeTab === "daily" ? dailyStats : activeTab === "weekly" ? weeklyStats : monthlyStats;

  const completedOrders = activeStats
    .filter((item) => item?._id?.status === "COMPLETED")
    .map((item) => item?.count || 0);

  const pendingOrders = activeStats
    .filter((item) => item?._id?.status === "PENDING")
    .map((item) => item?.count || 0);

  const series = [
    {
      name: "Completed Orders",
      data: completedOrders,
    },
    {
      name: "Pending Orders",
      data: pendingOrders,
    },
  ];

  const categories = activeStats.map((item) => {
    const id = item?._id || {};

    try {
      if (activeTab === "daily" && "day" in id && "month" in id && "year" in id) {
        return `Day ${id.day}, ${id.month}/${id.year}`;
      } else if (activeTab === "weekly" && "week" in id && "year" in id) {
        return `Week ${id.week}, ${id.year}`;
      } else if (activeTab === "monthly" && "month" in id && "year" in id) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthName = monthNames[id?.month - 1] || id.month;
        return `${monthName} ${id.year}`;
      }
    } catch (error) {
      console.error("Error formatting category:", error);
    }

    return "Unknown";
  });

  console.log(categories.length);

  const options = {
    xaxis: {
      categories,
      labels: {
        style: {
          fontFamily: "Poppins, sans-serif",
        },
        rotate: -45,
        rotateAlways: categories.some((c) => c.length > 10),
      },
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
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return isLoading || !data || !statistics.length ? (
    <div className="flex items-center justify-center min-h-72">
      <Loading />
    </div>
  ) : (
    <>
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
              enabled: true,
              animateGradually: {
                enabled: true,
                delay: 300,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350,
              },
            },
            fontFamily: "Poppins, sans-serif",
          },
          tooltip: {
            style: {
              fontFamily: "Poppins, sans-serif",
            },
            y: {
              formatter: function (value) {
                return value.toString();
              },
            },
          },
          stroke: {
            curve: "smooth",
            width: [2, 2],
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
        type="area"
        height="100%"
        width="100%"
      />
    </>
  );
};

export default OrderCountsChart;
