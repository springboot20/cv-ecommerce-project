import { useEffect, useState } from "react";
import ChartComponent from "../../../../components/chart/Chart";
import { OrderStatsResponse, Statistics } from "../../../../types/redux/order";
import { Loading } from "../../../../components/loaders/Loading";
import { useGetOrderStatsQuery } from "../../../../features/statistics/statistics.slice";

interface GroupedStat {
  timeData: {
    status?: string;
    day?: number;
    month?: number;
    year?: number;
    week?: number;
    [key: string]: any;
  };
  COMPLETED: number;
  PENDING: number;
  [key: string]: any;
}

interface GroupedStats {
  [key: string]: GroupedStat;
}

const OrderCountsChart = () => {
  const { data, refetch, isLoading } = useGetOrderStatsQuery();
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">("daily");
  const response: OrderStatsResponse = data?.data?.statistics || [];
  const statistics = Array.isArray(response) ? response : [response];

  console.log(statistics);

  const initialStats: Statistics = {
    daily: [],
    weekly: [],
    monthly: [],
  };

  const stats: Statistics = statistics?.reduce((acc: Statistics, stat: any) => {
    if (stat) {
      if (Array.isArray(stat.daily)) acc.daily = stat.daily;
      if (Array.isArray(stat.weekly)) acc.weekly = stat.weekly;
      if (Array.isArray(stat.monthly)) acc.monthly = stat.monthly;
    }
    return acc;
  }, initialStats);

  // Get current active stats
  const activeStats = stats[activeTab] || [];

  // Group data by time period (day/week/month) to ensure matching data points
  const groupedStats: GroupedStats = activeStats.reduce<GroupedStats>((acc, stat) => {
    if (!stat || !stat._id) return acc;

    // Create a unique key based on the time period
    let timeKey = "";
    if (activeTab === "daily" && stat._id.day && stat._id.month && stat._id.year) {
      timeKey = `${stat._id.day}-${stat._id.month}-${stat._id.year}`;
    } else if (activeTab === "weekly" && stat._id.week && stat._id.year) {
      timeKey = `${stat._id.week}-${stat._id.year}`;
    } else if (activeTab === "monthly" && stat._id.month && stat._id.year) {
      timeKey = `${stat._id.month}-${stat._id.year}`;
    } else {
      return acc; // Skip entries with missing data
    }

    // Initialize the time entry if it doesn't exist
    if (!acc[timeKey]) {
      acc[timeKey] = {
        timeData: stat._id,
        COMPLETED: 0,
        PENDING: 0,
      };
    }

    // Add the count for the appropriate status
    if (stat._id.status) {
      acc[timeKey][stat._id.status] = stat.count || 0;
    }

    return acc;
  }, {} satisfies GroupedStats);

  // Convert the grouped data to sorted arrays for display
  const sortedTimeKeys = Object.keys(groupedStats).sort((a, b) => {
    const aData = groupedStats[a].timeData;
    const bData = groupedStats[b].timeData;

    if (activeTab === "daily") {
      // Sort by year, then month, then day
      return aData.year! - bData.year! || aData.month! - bData.month! || aData.day! - bData.day!;
    } else if (activeTab === "weekly") {
      // Sort by year, then week
      return aData.year! - bData.year! || aData.week! - bData.week!;
    } else {
      // Sort by year, then month
      return aData.year! - bData.year! || aData.month! - bData.month!;
    }
  });

  // Create series data from sorted groups
  const completedOrders = sortedTimeKeys.map((key) => groupedStats[key].COMPLETED);
  const pendingOrders = sortedTimeKeys.map((key) => groupedStats[key].PENDING);

  // Generate formatted categories for x-axis
  const categories = sortedTimeKeys.map((key) => {
    const timeData = groupedStats[key].timeData;

    try {
      if (activeTab === "daily") {
        return `${timeData.day}/${timeData.month}/${timeData.year}`;
      } else if (activeTab === "weekly") {
        return `Week ${timeData.week}, ${timeData.year}`;
      } else if (activeTab === "monthly") {
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
        const monthIndex = parseInt(String(timeData.month || 0)) - 1;
        const monthName = monthNames[monthIndex] || `Month ${timeData.month || 0}`;
        return `${monthName} ${timeData.year || 0}`;
      }
    } catch (error) {
      console.error("Error formatting category:", error);
    }

    return "Unknown";
  });

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

  const options = {
    xaxis: {
      categories,
      labels: {
        style: {
          fontFamily: "Poppins, sans-serif",
        },
        rotate: -45,
        rotateAlways: categories.length > 0 && categories.some((c) => c.length > 10),
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
