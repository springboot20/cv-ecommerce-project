import React from "react";
import Chart from "react-apexcharts";

type ChartProps = {
  type?:
    | "area"
    | "line"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap"
    | undefined;
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
};

const ChartComponent: React.FC<ChartProps> = ({ type, ...rest }) => {
  return <Chart type={type} {...rest} />;
};

export default ChartComponent;
