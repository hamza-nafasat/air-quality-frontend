// /* eslint-disable react/prop-types */
// import { useState } from 'react';
// import Chart from 'react-apexcharts';
// import Slider from 'react-slick';
// import ChevronIcon from '../../../../assets/svgs/buildings/ChevronIcon';
// import { NextArrow, PrevArrow } from '../../CustomArrows';

// const CurrentHumidityChart = ({ floorData }) => {
//   // console.log('floorData', floorData);

//   const colors = [
//     '#3300FF',
//     '#17FF00',
//     '#FF0061',
//     '#00ABFF',
//     '#F6FF00',
//     '#BD00FF',
//     '#00FF72',
//     '#FF2800',
//     '#0021FF',
//     '#6CFF00',
//     '#FF00B6',
//     '#00FFFC',
//     '#FFB200',
//     '#6700FF',
//     '#00FF1D',
//     '#FF002C',
//     '#0077FF',
//     '#C1FF00',
//     '#F100FF',
//     '#00FFA7',
//     '#FF5D00',
//     '#1200FF',
//     '#37FF00',
//     '#FF0082',
//     '#00CCFF',
//   ];

//   // console.log("data", floorData);
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
//           Current Air Quality
//         </h2>
//         {/* <CustomDropDown lists={["Week", "Month", "Year"]} /> */}
//       </div>
//       <div>
//         <Slider {...settings}>
//           {floorData?.map((item, index) => {
//             return (
//               <div key={index} className="flex justify-center items-center">
//                 <div>
//                   <ChartComponent
//                     value={item[1]?.level}
//                     colors={[colors[Math.round(Math.random() * 12)]]}
//                   />
//                   <div className="text-center">
//                     <p className="text-sm font-medium text-[#060606cc]">{item[0]?.toUpperCase()}</p>
//                     {/* <p className="text-lg md:text-[24px] font-semibold text-primary-lightBlue">{item[1]?.level}</p> */}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default CurrentHumidityChart;

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
//     <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height="300" />
//   );
// };

// const CustomDropDown = ({ lists }) => {
//   const [isOptionOpen, setIsOptionOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('Week');
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

/* eslint-disable react/prop-types */
// import { useState } from 'react';
// import Chart from 'react-apexcharts';
// import Slider from 'react-slick';

// import ChevronIcon from '../../../../assets/svgs/buildings/ChevronIcon';
// import { NextArrow, PrevArrow } from '../../CustomArrows';

// const CurrentHumidityChart = ({ floorData = [] }) => {
//   console.log('floorDatafloorData', floorData);

//   const colors = [
//     '#3300FF',
//     '#17FF00',
//     '#FF0061',
//     '#00ABFF',
//     '#F6FF00',
//     '#BD00FF',
//     '#00FF72',
//     '#FF2800',
//     '#0021FF',
//     '#6CFF00',
//     '#FF00B6',
//     '#00FFFC',
//     '#FFB200',
//     '#6700FF',
//     '#00FF1D',
//     '#FF002C',
//     '#0077FF',
//     '#C1FF00',
//     '#F100FF',
//     '#00FFA7',
//     '#FF5D00',
//     '#1200FF',
//     '#37FF00',
//     '#FF0082',
//     '#00CCFF',
//   ];

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
//       <div className="flex items-center justify-between gap-2 mb-2">
//         <h2 className="text-sm md:text-base font-semibold md:font-bold text-[#060606cc]">
//           Current Air Quality
//         </h2>
//         {/* <CustomDropDown lists={["Week", "Month", "Year"]} /> */}
//       </div>

//       <Slider {...settings}>
//         {floorData?.map((item, index) => {
//           const name = item?.[0]?.toUpperCase?.() || 'Unknown';
//           const value = item?.[1]?.level ?? 0;
//           const color = colors[index % colors.length];

//           return (
//             <div key={index} className="flex justify-center items-center">
//               <div>
//                 <ChartComponent value={value} colors={[color]} />
//                 <div className="text-center mt-2">
//                   <p className="text-sm font-medium text-[#060606cc]">{name}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Slider>
//     </div>
//   );
// };

// export default CurrentHumidityChart;

// /* ── Chart Renderer ─────────────────────── */
// const ChartComponent = ({ value, colors }) => {
//   const chartOptions = {
//     chart: {
//       type: 'radialBar',
//     },
//     plotOptions: {
//       radialBar: {
//         hollow: { size: '60%' },
//         dataLabels: {
//           show: true,
//           value: {
//             fontWeight: '600',
//             fontSize: '34px',
//             color: 'rgba(3, 165, 224, 1)',
//             formatter: () => `${value}`,
//           },
//         },
//       },
//     },
//     series: [value],
//     labels: [''],
//     colors,
//   };

//   return (
//     <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height="300" />
//   );
// };

// /* ── Optional: Dropdown (currently not used) ───────────────────── */
// const CustomDropDown = ({ lists }) => {
//   const [isOptionOpen, setIsOptionOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('Week');

//   return (
//     <div className="relative z-50">
//       <div
//         className="flex items-center justify-between text-sm text-[#060606cc] font-semibold gap-3 cursor-pointer
//         border border-[#060606cc] py-1 px-2 rounded-[8px] text-nowrap"
//         onClick={() => setIsOptionOpen(!isOptionOpen)}
//       >
//         {selectedOption}
//         <div className={`transition-all duration-300 ${isOptionOpen ? 'rotate-180' : 'rotate-0'}`}>
//           <ChevronIcon />
//         </div>
//       </div>

//       {isOptionOpen && (
//         <ul className="absolute top-[30px] left-0 w-full bg-white rounded-lg shadow-md z-10">
//           {lists.map((list, i) => (
//             <li
//               key={i}
//               className="py-1 px-2 border-b text-sm font-semibold cursor-pointer text-[#060606f7] hover:bg-gray-100"
//               onClick={() => {
//                 setSelectedOption(list);
//                 setIsOptionOpen(false);
//               }}
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
import { useState } from 'react';
import Chart from 'react-apexcharts';
import Slider from 'react-slick';

import ChevronIcon from '../../../../assets/svgs/buildings/ChevronIcon';
import { NextArrow, PrevArrow } from '../../CustomArrows';

/* ────────────────────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                                   */
/* ────────────────────────────────────────────────────────────────── */
export default function CurrentHumidityChart({ floorData = [] }) {
  /* 25 bright, visually distinct colours */
  const colors = [
    '#3300FF',
    '#17FF00',
    '#FF0061',
    '#00ABFF',
    '#F6FF00',
    '#BD00FF',
    '#00FF72',
    '#FF2800',
    '#0021FF',
    '#6CFF00',
    '#FF00B6',
    '#00FFFC',
    '#FFB200',
    '#6700FF',
    '#00FF1D',
    '#FF002C',
    '#0077FF',
    '#C1FF00',
    '#F100FF',
    '#00FFA7',
    '#FF5D00',
    '#1200FF',
    '#37FF00',
    '#FF0082',
    '#00CCFF',
  ];

  /* slider settings */
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm md:text-base font-bold text-[#060606cc]">Current Air Quality</h2>
        {/* <CustomDropDown lists={['Week', 'Month', 'Year']} /> */}
      </div>

      {/* ────────────────────── CAROUSEL ─────────────────────────── */}
      <Slider {...settings}>
        {Array.isArray(floorData) && floorData.length ? (
          floorData.map(([rawName, rawValue], idx) => {
            /* 1) Normalise field name + value */
            const name = typeof rawName === 'string' ? rawName.toUpperCase() : 'UNKNOWN';
            const value =
              typeof rawValue === 'number'
                ? rawValue
                : typeof rawValue === 'object' && rawValue !== null && 'level' in rawValue
                ? Number(rawValue.level) || 0
                : 0;

            /* 2) Pick a colour that stays the same for each index */
            const colour = colors[idx % colors.length];

            return (
              <div key={idx} className="flex justify-center">
                <div>
                  <RadialGauge value={value} colour={colour} />
                  <p className="text-center mt-2 text-sm font-medium text-[#060606cc]">{name}</p>
                </div>
              </div>
            );
          })
        ) : (
          /* Graceful empty‑state */
          <div className="w-full text-center py-6 text-gray-500">No sensor data</div>
        )}
      </Slider>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  RADIAL‑GAUGE SUB‑COMPONENT                                       */
/* ────────────────────────────────────────────────────────────────── */
function RadialGauge({ value, colour }) {
  const options = {
    chart: { type: 'radialBar' },
    colors: [colour],
    series: [value],
    labels: [''],
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        dataLabels: {
          value: {
            fontSize: '34px',
            fontWeight: 600,
            color: 'rgba(3,165,224,1)',
            formatter: () => `${value}`,
          },
        },
      },
    },
  };

  return <Chart options={options} series={options.series} type="radialBar" height={300} />;
}

/* ────────────────────────────────────────────────────────────────── */
/*  OPTIONAL DROPDOWN (left commented for now)                       */
/* ────────────────────────────────────────────────────────────────── */
function CustomDropDown({ lists }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(lists?.[0] ?? 'Week');

  return (
    <div className="relative z-50">
      <div
        className="flex items-center gap-3 text-sm font-semibold text-[#060606cc] cursor-pointer
                   border border-[#060606cc] py-1 px-2 rounded-[8px]"
        onClick={() => setOpen(!open)}
      >
        {selected}
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <ChevronIcon />
        </span>
      </div>

      {open && (
        <ul className="absolute top-[30px] left-0 w-full bg-white rounded-lg shadow-md z-10">
          {lists.map((option) => (
            <li
              key={option}
              className="py-1 px-2 border-b text-sm font-semibold cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
