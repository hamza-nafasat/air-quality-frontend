import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ seriesData, xLabels }) => {
  const options = {
    chart: {
      height: 162,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      width: [0, 3],
      colors: ['rgba(3, 165, 224, 1)']
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
        stops: [0, 100]
      }
    },
    colors: ['#03A5E0'],
    labels: xLabels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  const series = seriesData || [
    {
      name: 'Website Blog',
      type: 'column',
      data: [90, 40, 55, 50, 99, 60, 70],
    },
    {
      name: 'Social Media',
      type: 'line',
      data: [90, 30, 55, 35, 30, 40, 45], 
    },
  ];

  return (
    <div className='h-full'>
      <ReactApexChart options={options} series={series} type="line" height={162} />
    </div>
  );
};

export default LineChart;
