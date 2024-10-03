import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = () => {
  const [series, setSeries] = useState([
    {
      name: "Temperature",
      data: [40, 80, 70, 50, 30, 60, 80],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: [({ value }) => (value >= 70 ? "#F90909" : "#33B5E5")],
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 5,
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yaxis: {
      title: {
        text: "Temperature",
      },
    },

    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: "#000",
      },
      markers: {
        fillColors: ["#F90909", "#33B5E5"],
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default BarChart;
