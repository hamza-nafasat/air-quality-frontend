// /* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import ChevronIcon from '../../../assets/svgs/buildings/ChevronIcon';

// const DoubleAreaChart = ({ chartsData }) => {
//   const [selectedOption, setSelectedOption] = useState('Temp & Humi');
//   const [series, setSeries] = useState([]);
//   const [options] = useState({
//     chart: {
//       height: 350,
//       type: 'area',
//       toolbar: { show: false },
//     },
//     colors: ['#33B5E5', '#8E44AD'],
//     dataLabels: { enabled: false },
//     stroke: { curve: 'smooth', width: 2 },
//     fill: {
//       type: 'gradient',
//       gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 90, 100] },
//     },
//     xaxis: {
//       categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
//       labels: { style: { colors: '#9aa0ac' } },
//     },
//     yaxis: {
//       labels: {
//         formatter: function (value) {
//           return Number(value).toFixed(0);
//         },
//       },
//     },
//     grid: { show: true, borderColor: '#f1f1f1' },
//     tooltip: {
//       theme: 'light',
//       x: { format: 'dd/MM' },
//       marker: { show: true },
//       y: { formatter: (value) => `${value} C` },
//     },
//     legend: {
//       show: true,
//       position: 'top',
//       horizontalAlign: 'center',
//       markers: { fillColors: ['#33B5E5', '#8E44AD'] },
//     },
//   });
//   useEffect(() => {
//     if (selectedOption === 'Temp & Humi') {
//       setSeries([
//         { name: 'temperature', data: chartsData?.temperature },
//         { name: 'Humidity', data: chartsData?.humidity },
//       ]);
//     } else if (selectedOption === 'Co & Co2') {
//       setSeries([
//         { name: 'Co', data: chartsData?.co },
//         { name: 'Co2', data: chartsData?.co2 },
//       ]);
//     } else if (selectedOption === 'Tvoc & Ch') {
//       setSeries([
//         { name: 'Tvoc', data: chartsData?.tvoc },
//         { name: 'Ch', data: chartsData?.ch },
//       ]);
//     }
//   }, [selectedOption, chartsData]);

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//         <h5>Sensors Activity</h5>
//         <div className="flex items-center justify-between gap-2">
//           <CustomDropDown
//             selectedOption={selectedOption}
//             setSelectedOption={setSelectedOption}
//             lists={['Temp & Humi', 'Co & Co2', 'Tvoc & Ch']}
//           />
//         </div>
//       </div>
//       <ReactApexChart options={options} series={series} type="area" height={350} />
//     </div>
//   );
// };

// export default DoubleAreaChart;

// const CustomDropDown = ({ lists, selectedOption, setSelectedOption }) => {
//   const [isOptionOpen, setIsOptionOpen] = useState(false);
//   const selectHandler = (option) => {
//     setSelectedOption(option);
//     setIsOptionOpen(false);
//   };
//   const optionsHandler = () => setIsOptionOpen(!isOptionOpen);
//   return (
//     <div className="relative z-50">
//       <div
//         className="flex items-center justify-between text-sm text-[#060606cc] font-semibold gap-3 cursor-pointer
//         border border-[#060606cc] py-1 px-2 rounded-[8px] text-nowrap"
//         onClick={() => optionsHandler()}
//       >
//         {selectedOption}
//         <div className={`transition-all duration-300 ${isOptionOpen ? 'rotate-180' : 'rotate-0'}`}>
//           <ChevronIcon />
//         </div>
//       </div>
//       {isOptionOpen && (
//         <ul className="flex flex-col bg-white rounded-lg shadow-md absolute top-[30px] left-0 w-full">
//           {lists?.map((list, i) => (
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

/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ChevronIcon from '../../../assets/svgs/buildings/ChevronIcon';

const DoubleAreaChart = ({ chartsData }) => {
  const [selectedOption, setSelectedOption] = useState('Temp & Humi');
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');
  const [series, setSeries] = useState([]);
  const [xCategories, setXCategories] = useState([]);
  console.log('chartsDatachartsData', chartsData);

  // const chartsData = {
  //   Daily: {
  //     categories: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
  //     temperature: [23, 25, 27, 28, 30, 29, 24, 22],
  //     humidity: [50, 55, 60, 58, 62, 61, 57, 56],
  //     co: [200, 220, 180, 190, 210, 230, 205, 195],
  //     co2: [400, 420, 410, 430, 440, 460, 450, 455],
  //     tvoc: [120, 130, 140, 125, 135, 145, 150, 155],
  //     ch: [30, 28, 27, 26, 29, 31, 32, 30],
  //   },
  //   Weekly: {
  //     categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //     temperature: [24, 26, 25, 27, 29, 28, 26],
  //     humidity: [53, 54, 56, 55, 58, 57, 56],
  //     co: [210, 215, 205, 208, 218, 220, 219],
  //     co2: [430, 435, 440, 445, 450, 455, 460],
  //     tvoc: [140, 142, 138, 145, 148, 150, 147],
  //     ch: [31, 30, 32, 33, 34, 35, 36],
  //   },
  //   Monthly: {
  //     categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  //     temperature: [25, 27, 29, 28],
  //     humidity: [55, 58, 60, 59],
  //     co: [215, 225, 235, 230],
  //     co2: [440, 450, 460, 455],
  //     tvoc: [150, 158, 165, 160],
  //     ch: [34, 36, 38, 37],
  //   },
  // };

  const chartOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: { show: false },
    },
    colors: ['#33B5E5', '#8E44AD'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 90, 100] },
    },
    xaxis: {
      categories: xCategories,
      labels: { style: { colors: '#9aa0ac' } },
    },
    yaxis: {
      labels: {
        formatter: (value) => Number(value).toFixed(0),
      },
    },
    grid: { show: true, borderColor: '#f1f1f1' },
    tooltip: {
      theme: 'light',
      x: { format: 'dd/MM' },
      marker: { show: true },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      markers: { fillColors: ['#33B5E5', '#8E44AD'] },
    },
  };
  useEffect(() => {
    if (!chartsData || !chartsData[selectedPeriod]) {
      setSeries([]);
      setXCategories([]);
      return;
    }

    const data = chartsData[selectedPeriod];
    setXCategories(data.categories || []);

    if (selectedOption === 'Temp & Humi') {
      setSeries([
        { name: 'Temperature', data: data.temperature || [] },
        { name: 'Humidity', data: data.humidity || [] },
      ]);
    } else if (selectedOption === 'Co & Co2') {
      setSeries([
        { name: 'CO', data: data.co || [] },
        { name: 'CO2', data: data.co2 || [] },
      ]);
    } else if (selectedOption === 'Tvoc & Ch') {
      setSeries([
        { name: 'TVOC', data: data.tvoc || [] },
        { name: 'CH', data: data.ch || [] },
      ]);
    }
  }, [selectedOption, selectedPeriod, chartsData]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h5 className="text-lg font-semibold">Sensors Activity</h5>
        <div className="flex items-center gap-2">
          <CustomDropDown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            lists={['Temp & Humi', 'Co & Co2', 'Tvoc & Ch']}
          />
          <CustomDropDown
            selectedOption={selectedPeriod}
            setSelectedOption={setSelectedPeriod}
            lists={['Daily', 'Weekly', 'Monthly']}
          />
        </div>
      </div>
      <ReactApexChart options={chartOptions} series={series} type="area" height={350} />
    </div>
  );
};

export default DoubleAreaChart;

const CustomDropDown = ({ lists, selectedOption, setSelectedOption }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const toggleDropdown = () => setIsOptionOpen(!isOptionOpen);
  const handleSelect = (value) => {
    setSelectedOption(value);
    setIsOptionOpen(false);
  };

  return (
    <div className="relative z-50">
      <div
        className="flex items-center justify-between text-sm text-[#060606cc] font-semibold gap-2 cursor-pointer border border-[#060606cc] py-1 px-3 rounded-[8px]"
        onClick={toggleDropdown}
      >
        {selectedOption}
        <div className={`transition-all duration-300 ${isOptionOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronIcon />
        </div>
      </div>
      {isOptionOpen && (
        <ul className="absolute w-full top-[35px] bg-white shadow-lg rounded-lg z-50">
          {lists.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSelect(item)}
              className="py-2 px-3 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
