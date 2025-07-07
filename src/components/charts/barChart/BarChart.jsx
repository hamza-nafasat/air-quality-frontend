// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const BarChart = () => {
//   const [series, setSeries] = useState([
//     {
//       name: "Temperature",
//       data: [40, 80, 70, 50, 30, 60, 80],
//     },
//   ]);

//   const [options, setOptions] = useState({
//     chart: {
//       height: 350,
//       type: "bar",
//       toolbar: {
//         show: false,
//       },
//     },
//     colors: [({ value }) => (value >= 70 ? "#F90909" : "#33B5E5")],
//     plotOptions: {
//       bar: {
//         columnWidth: "45%",
//         borderRadius: 5,
//         distributed: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     xaxis: {
//       categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     },
//     yaxis: {
//       title: {
//         text: "Temperature",
//       },
//     },

//     legend: {
//       show: true,
//       position: "bottom",
//       labels: {
//         colors: "#000",
//       },
//       markers: {
//         fillColors: ["#F90909", "#33B5E5"],
//       },
//     },
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="bar"
//           height={350}
//         />
//       </div>
//     </div>
//   );
// };

// export default BarChart;

import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

// ── helpers ─────────────────────────────────────────────────────────────
const round2 = (n) => Math.round(n * 100) / 100;
const pad7 = (arr) => (arr.length < 7 ? [...arr, ...Array(7 - arr.length).fill(null)] : arr);

// colour palette (looped if you have >7 series)
const palette = [
  '#33B5E5', // blue
  '#F44336', // red
  '#4CAF50', // green
  '#FFC107', // amber
  '#9C27B0', // purple
  '#8D6E63', // brown‑grey
  '#00BCD4', // cyan
];

const BarChart = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [colors, setColors] = useState([]);

  // build series & colour list whenever data changes
  useEffect(() => {
    if (data?.weekly) {
      const dynamicSeries = Object.entries(data.weekly).map(([key, values], i) => ({
        name: key.toUpperCase(),
        data: pad7(values.map(round2)),
      }));
      setSeries(dynamicSeries);
      setColors(dynamicSeries.map((_, i) => palette[i % palette.length]));
    }
  }, [data]);

  const options = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: { show: false },
    },
    colors, // ← new dynamic colours
    plotOptions: {
      bar: { columnWidth: '45%', borderRadius: 5, distributed: false },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yaxis: {
      title: { text: 'Value' },
      labels: { formatter: (v) => v.toFixed(2) },
    },
    tooltip: {
      y: { formatter: (v) => (v == null ? '' : v.toFixed(2)) },
    },
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: '#000' },
      markers: { fillColors: colors },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
