// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const LineChart = ({ seriesData, xLabels }) => {
//   const options = {
//     chart: {
//       height: 162,
//       type: 'line',
//       toolbar: {
//         show: false,
//       },
//     },
//     legend: {
//       show: false,
//     },
//     stroke: {
//       width: [0, 3],
//       colors: ['rgba(3, 165, 224, 1)'],
//     },
//     title: {
//       text: 'Weekly',
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     markers: {
//       size: 4,
//     },
//     fill: {
//       type: ['solid', 'gradient'],
//       gradient: {
//         shade: 'light',
//         type: 'horizontal',
//         shadeIntensity: 0.5,
//         gradientToColors: ['#025A7A'],
//         inverseColors: false,
//         opacityFrom: 0.9,
//         opacityTo: 0.9,
//         stops: [0, 100],
//       },
//     },
//     colors: ['#03A5E0'],
//     labels: xLabels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   };

//   const series = seriesData || [
//     {
//       name: 'Website Blog',
//       type: 'column',
//       data: [90, 40, 55, 50, 99, 60, 70],
//     },
//     {
//       name: 'Social Media',
//       type: 'line',
//       data: [90, 40, 55, 50, 99, 60, 70],
//     },
//   ];

//   return (
//     <div className="h-full">
//       <ReactApexChart options={options} series={series} type="line" height={162} />
//     </div>
//   );
// };

// export default LineChart;

import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ seriesData, xLabels, loading }) => {
  const options = {
    chart: {
      height: 162,
      type: 'line',
      toolbar: { show: false },
    },
    legend: { show: false },
    stroke: {
      width: [0, 3],
      colors: ['rgba(3, 165, 224, 1)'],
    },
    title: {
      text: 'Weekly',
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
    },
    fill: {
      type: ['solid', 'gradient'],
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#025A7A'],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    colors: ['#03A5E0'],
    labels: xLabels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  };

  const defaultSeries = [
    {
      name: 'Website Blog',
      type: 'column',
      data: [90, 40, 55, 50, 99, 60, 70],
    },
    {
      name: 'Social Media',
      type: 'line',
      data: [90, 40, 55, 50, 99, 60, 70],
    },
  ];

  const series = seriesData?.length ? seriesData : defaultSeries;

  // Show loading skeleton if loading is true
  if (loading) {
    return (
      <div className="min-h-[180px] w-full p-4 bg-gray-100 animate-pulse rounded-[16px] shadow-md">
        <div className="h-4 w-28 bg-gray-300 rounded mb-4"></div>
        <div className="h-[120px] w-full bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <ReactApexChart options={options} series={series} type="line" height={162} />
    </div>
  );
};

export default LineChart;
