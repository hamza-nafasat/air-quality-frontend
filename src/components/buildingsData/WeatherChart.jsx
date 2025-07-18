// import React, { useState } from "react";
// import ChevronIcon from "../../assets/svgs/buildings/ChevronIcon";
// import Slider from "react-slick";
// import Chart from 'react-apexcharts';
// import { NextArrow, PrevArrow } from "./CustomArrows";

// const data = [
//   {
//     value: 78,
//     label: "Humidity",
//     colors: ["#FF4560", "#008FFB", "#00E396", "#FEB019"],
//   },
//   {
//     value: 55,
//     label: "Temperature",
//     colors: ["#FF5733", "#33FF57", "#5733FF", "#FFC300"],
//   },
//   {
//     value: 90,
//     label: "Air Quality",
//     colors: ["#FF33A6", "#A633FF", "#33FFC1", "#C1FF33"],
//   },
// ];

// const WeatherChart = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };
//   return (
//     <div className="relative">
//       <div className="flex items-center justify-between gap-2">
//         <h2 className="text-sm md:text-base font-semibold md:font-bold text-[#060606cc]">
//           Current Humidity
//         </h2>
//         <CustomDropDown lists={["Week", "Month", "Year"]} />
//       </div>
//       <div>
//         <Slider {...settings}>
//           {data.map((item, index) => (
//             <div key={index} className="flex justify-center items-center">
//               <div>
//                 <ChartComponent value={item.value} colors={item.colors} />
//                 <div className="text-center">
//                   <p className="text-sm font-medium text-[#060606cc]">{item.label}</p>
//                   <p className="text-lg md:text-[24px] font-semibold text-primary-lightBlue">
//                     {item.value}%
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default WeatherChart;

// const ChartComponent = ({ value, colors }) => {
//     const chartOptions = {
//       chart: {
//         type: 'radialBar',
//       },
//       plotOptions: {
//         radialBar: {
//           dataLabels: {
//             show: true,
//             value: {
//               fontWeight: '600',
//               fontSize: '34px',
//               color: 'rgba(3, 165, 224, 1)',
//               offsetY: 0,
//               show: true,
//               formatter: () => `${value}%`,
//             },
//           },
//         },
//       },
//       series: [value],
//       labels: [''],
//       colors: colors,
//     };

//     return <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height="250" />;
//   };

// const CustomDropDown = ({ lists }) => {
//   const [isOptionOpen, setIsOptionOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("Week");
//   const selectHandler = (option) => {
//     setSelectedOption(option);
//     setIsOptionOpen(false);
//   };
//   const optionsHandler = () => setIsOptionOpen(!isOptionOpen);
//   return (
//     <div className="relative z-50">
//       <div
//         className="flex items-center justify-between text-sm text-[#060606cc] font-semibold gap-3 cursor-pointer border border-[#060606cc] py-1 px-2 rounded-[8px] text-nowrap"
//         onClick={() => optionsHandler()}
//       >
//         {selectedOption}
//         <div
//           className={`transition-all duration-300 ${
//             isOptionOpen ? "rotate-180" : "rotate-0"
//           }`}
//         >
//           <ChevronIcon />
//         </div>
//       </div>
//       {isOptionOpen && (
//         <ul className="flex flex-col bg-white rounded-lg shadow-md absolute top-[30px] left-0 w-full">
//           {lists.map((list, i) => (
//             <li
//               key={i}
//               className="py-1 px-2 border-b text-sm font-semibold cursor-pointer text-[#060606f7] hover:bg-gray-100"
//               onClick={() => selectHandler(list)}
//             >
//               {list}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import ChevronIcon from '../../assets/svgs/buildings/ChevronIcon';
// import Slider from 'react-slick';
// import Chart from 'react-apexcharts';
// import { NextArrow, PrevArrow } from './CustomArrows';

// // Full data set for each time range
// const fullDataSet = {
//   Day: [
//     { value: 60, label: 'Humidity', colors: ['#FF4560'] },
//     { value: 30, label: 'Temperature', colors: ['#33FF57'] },
//     { value: 80, label: 'Air Quality', colors: ['#33FFC1'] },
//   ],
//   Week: [
//     { value: 78, label: 'Humidity', colors: ['#FF4560'] },
//     { value: 55, label: 'Temperature', colors: ['#33FF57'] },
//     { value: 90, label: 'Air Quality', colors: ['#33FFC1'] },
//   ],
//   Month: [
//     { value: 72, label: 'Humidity', colors: ['#FF4560'] },
//     { value: 47, label: 'Temperature', colors: ['#33FF57'] },
//     { value: 70, label: 'Air Quality', colors: ['#33FFC1'] },
//   ],
// };

// const WeatherChart = ({ data ,loading }) => {
//   // const sData = data?.overAverageAllDataOfSensor || fullDataSet;
//   const [sData, setSData] = useState(fullDataSet);
//   const [selectedRange, setSelectedRange] = useState('Week');
//   const [chartData, setChartData] = useState(fullDataSet['Week']); // init chartData

//   // ✅ Update sData when API data is available
//   useEffect(() => {
//     if (data?.overAverageAllDataOfSensor) {
//       setSData(data.overAverageAllDataOfSensor);
//     }
//   }, [data]);

//   // ✅ Recompute chartData when sData or selectedRange changes
//   useEffect(() => {
//     setChartData(sData[selectedRange] || []);
//   }, [sData, selectedRange]);
//   const handleRangeChange = (range) => {
//     setSelectedRange(range);
//     setChartData(sData[range]);
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   return (
//     <div className="relative">
//       <div className="flex items-center justify-between gap-2">
//         <h2 className="text-sm md:text-base font-semibold md:font-bold text-[#060606cc]">
//           Weather Summary - {selectedRange}
//         </h2>
//         <CustomDropDown
//           lists={['Day', 'Week', 'Month']}
//           selectedOption={selectedRange}
//           onSelect={handleRangeChange}
//         />
//       </div>
//       <div>
//         <Slider {...settings}>
//           {chartData.map((item, index) => (
//             <div key={index} className="flex justify-center items-center">
//               <div>
//                 <ChartComponent value={item.value} colors={item.colors} />
//                 <div className="text-center">
//                   <p className="text-sm font-medium text-[#060606cc]">{item.label}</p>
//                   <p className="text-lg md:text-[24px] font-semibold text-primary-lightBlue">
//                     {item.value}%
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default WeatherChart;

// // Chart Component
// const ChartComponent = ({ value, colors }) => {
//   const chartOptions = {
//     chart: {
//       type: 'radialBar',
//     },
//     plotOptions: {
//       radialBar: {
//         dataLabels: {
//           show: true,
//           value: {
//             fontWeight: '600',
//             fontSize: '34px',
//             color: 'rgba(3, 165, 224, 1)',
//             offsetY: 0,
//             show: true,
//             formatter: () => `${value}`,
//           },
//         },
//       },
//     },
//     series: [value],
//     labels: [''],
//     colors: colors,
//   };

//   return (
//     <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height="250" />
//   );
// };

// // Dropdown Component
// const CustomDropDown = ({ lists, selectedOption, onSelect }) => {
//   const [isOptionOpen, setIsOptionOpen] = useState(false);
//   const selectHandler = (option) => {
//     onSelect(option);
//     setIsOptionOpen(false);
//   };

//   return (
//     <div className="relative z-50">
//       <div
//         className="flex items-center justify-between text-sm text-[#060606cc] font-semibold gap-3 cursor-pointer border border-[#060606cc] py-1 px-2 rounded-[8px] text-nowrap"
//         onClick={() => setIsOptionOpen(!isOptionOpen)}
//       >
//         {selectedOption}
//         <div className={`transition-all duration-300 ${isOptionOpen ? 'rotate-180' : 'rotate-0'}`}>
//           <ChevronIcon />
//         </div>
//       </div>
//       {isOptionOpen && (
//         <ul className="flex flex-col bg-white rounded-lg shadow-md absolute top-[30px] left-0 w-full">
//           {lists.map((list, i) => (
//             <li
//               key={i}
//               className="py-1 px-2 border-b text-sm font-semibold cursor-pointer text-[#060606f7] hover:bg-gray-100"
//               onClick={() => selectHandler(list)}
//             >
//               {list}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import ChevronIcon from '../../assets/svgs/buildings/ChevronIcon';
import Slider from 'react-slick';
import Chart from 'react-apexcharts';
import { NextArrow, PrevArrow } from './CustomArrows';

// Chart Component
const ChartComponent = ({ value, colors }) => {
  const chartOptions = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: true,
          value: {
            fontWeight: '600',
            fontSize: '34px',
            color: 'rgba(3, 165, 224, 1)',
            offsetY: 0,
            formatter: () => `${value}`,
          },
        },
      },
    },
    series: [value],
    labels: [''],
    colors: colors,
  };

  return (
    <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height="250" />
  );
};

// Dropdown Component
const CustomDropDown = ({ lists, selectedOption, onSelect }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const selectHandler = (option) => {
    onSelect(option);
    setIsOptionOpen(false);
  };

  return (
    <div className="relative z-50">
      <div
        className="flex items-center justify-between text-sm text-[#060606cc] font-semibold gap-3 cursor-pointer border border-[#060606cc] py-1 px-2 rounded-[8px] text-nowrap"
        onClick={() => setIsOptionOpen(!isOptionOpen)}
      >
        {selectedOption}
        <div className={`transition-all duration-300 ${isOptionOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronIcon />
        </div>
      </div>
      {isOptionOpen && (
        <ul className="flex flex-col bg-white rounded-lg shadow-md absolute top-[30px] left-0 w-full">
          {lists.map((list, i) => (
            <li
              key={i}
              className="py-1 px-2 border-b text-sm font-semibold cursor-pointer text-[#060606f7] hover:bg-gray-100"
              onClick={() => selectHandler(list)}
            >
              {list}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const WeatherChart = ({ data, loading }) => {
  const [sData, setSData] = useState({});
  const [selectedRange, setSelectedRange] = useState('Week');
  const [chartData, setChartData] = useState([]);

  const labelToMaxKey = {
    Temperature: 'Current Temperature',
    Humidity: 'Current Humidity',
    CO: 'CO',
    CH: 'CH',
    TVOC: 'TVOC',
    CO2: 'CO2',
  };

  // Max values
  const maxValues = {
    'Current Temperature': 150,
    'Current Humidity': 100,
    CO: 1000,
    CH: 100,
    TVOC: 10000,
    CO2: 50000,
  };

  // Add percentage field to each value
  const withPercentages = {};
  if (data?.overAverageAllDataOfSensor && typeof data?.overAverageAllDataOfSensor === 'object') {
    Object?.entries(data?.overAverageAllDataOfSensor).forEach(([period, readings]) => {
      withPercentages[period] = readings?.map((sensor) => {
        const fullKey = labelToMaxKey[sensor.label];
        const max = maxValues[fullKey];
        const percentage = max ? (sensor.value / max) * 100 : null;

        return {
          ...sensor,
          percentage: percentage?.toFixed(2) ?? null,
        };
      });
    });
  }
  console.log('withPercentages', withPercentages);

  // ✅ Update state when real API data is available
  useEffect(() => {
    if (data?.overAverageAllDataOfSensor) {
      setSData(withPercentages);
    }
  }, [data]);

  // ✅ Update chart data when range or sensor data changes
  useEffect(() => {
    setChartData(sData[selectedRange] || []);
  }, [sData, selectedRange]);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    setChartData(sData[range] || []);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // ✅ Show loader while waiting for data
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-1 2xl:grid-cols-1 gap-4">
        {Array.from({ length: 1 }).map((_, idx) => (
          <div
            key={idx}
            className="min-w-full min-h-full p-2 pb-8 bg-gray-100 animate-pulse rounded-[16px] shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="h-6 w-36 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 w-20 bg-gray-300 rounded mb-2"></div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 h-full">
              <div className="w-36 h-36 bg-gray-300 rounded-full"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm md:text-base font-semibold md:font-bold text-[#060606cc]">
          Weather Summary - {selectedRange}
        </h2>
        <CustomDropDown
          lists={['Day', 'Week', 'Month']}
          selectedOption={selectedRange}
          onSelect={handleRangeChange}
        />
      </div>
      <div>
        <Slider {...settings}>
          {chartData.map((item, index) => (
            <div key={index} className="flex justify-center items-center">
              <div>
                <ChartComponent value={item.percentage} colors={item.colors} />
                <div className="text-center">
                  <p className="text-sm font-medium text-[#060606cc]">{item.label}</p>
                  <p className="text-lg md:text-[24px] font-semibold text-primary-lightBlue">
                    {item.percentage}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default WeatherChart;
