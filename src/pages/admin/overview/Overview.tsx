import ChartComponent from "../../../components/chart/Chart";
import { OrdersOverview } from "./orders/OrdersOverview";

export default function Overview() {
  const seriesConfig = [35, 65];
  const options = {
    labels: ["Male", "Female"],
  };
  return (
    <div className="max-w-7xl mx-auto mt-4 grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg p-4 col-span-1 xl:col-span-2 w-full">
        <OrdersOverview />
      </div>
      <div className="bg-white rounded-lg p-4 col-span-1 w-full">
        <ChartComponent
          options={{
            ...options,
            colors: ["#5932EA", "#16C098"],
            legend: {
              show: false,
            },
            tooltip: {
              style: {
                fontFamily: "Nunito Sans, san-serif",
              },
            },
            dataLabels: {
              enabled: true,
              style: {
                fontFamily: "Nunito Sans, san-serif",
              },
            },
            responsive: [
              {
                breakpoint: 320,
                options: {
                  width: 200,
                  height: 200,
                },
              },
            ],
          }}
          series={seriesConfig}
          type="donut"
          width={300}
          height={500}
        />
      </div>
    </div>
  );
}
