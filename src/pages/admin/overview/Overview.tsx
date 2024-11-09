import ChartComponent from "../../../components/chart/Chart";

export default function Overview() {
  const seriesConfig = [35, 65];
  const options = {
    labels: ["Male", "Female"],
  };
  return (
    <div className="max-w-7xl mx-auto mt-4 grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg p-4 col-span-1 xl:col-span-2 w-full">
        <ChartComponent
          type="area"
          options={{
            tooltip: {
              style: {
                fontFamily: "Nunito Sans, san-serif",
              },
            },
            dataLabels: {
              enabled: false,
            },
            annotations: {
              texts: [
                {
                  y: 12,
                  x: 20,
                  fontSize: 16,
                  fontFamily: "Satoshi",
                  fontWeight: "bold",
                  text: "Revenue Impact over 6 months",
                },
              ],
            },
            labels: ["Course-1", "Course-2"],
            xaxis: {
              categories: ["January", "Feburary", "March", "April", "May", "June"],
            },
            stroke: {
              curve: "smooth",
              width: [2, 2],
            },
            colors: ["#5041BC", "#E26169"],
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
          }}
          height={350}
          series={[
            {
              name: "Course-1",
              data: [16, 25, 18, 30, 20, 42],
            },
            {
              name: "Course-2",
              data: [30, 15, 38, 19, 35, 20],
            },
          ]}
        />
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
