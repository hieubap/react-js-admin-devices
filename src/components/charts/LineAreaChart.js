import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ chartData, chartOptions, height } = {}) => {
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height={height}
      // height="100%"
    />
  );
};

export default LineChart;
