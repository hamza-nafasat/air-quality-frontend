// // import React from 'react';
// // import TemperatureIcon from '../../assets/svgs/dashboard/TemperatureIcon';
// // import StatusCard from '../shared/large/card/StatusCard';
// // import TvocIcon from '../../assets/svgs/dashboard/TvocIcon';
// // import Co2Icon from '../../assets/svgs/dashboard/Co2Icon';
// // import HumidityIcon from '../../assets/svgs/buildings/HumidityIcon';
// // import CarbonMonoxideIcon from '../../assets/svgs/buildings/CarbonMonoxideIcon';
// // import MethaneIcon from '../../assets/svgs/buildings/MethaneIcon';
// // import ProgressRadialChart from '../charts/ProgressRadialChart.jsx/ProgressRadialChart';
// // const statusData = [
// //   {
// //     type: 'Current Temperature',
// //     status: '16° F',
// //     from: '8',
// //     Icon: TemperatureIcon,
// //     progress: 10,
// //   },
// //   {
// //     type: 'TVOC',
// //     status: '50° F',
// //     from: '8',
// //     Icon: TvocIcon,
// //     progress: 90,
// //   },
// //   {
// //     type: 'CO2',
// //     status: '75° F',
// //     from: '8',
// //     Icon: Co2Icon,
// //     progress: 30,
// //   },
// //   {
// //     type: 'Current Humidity',
// //     status: '60%',
// //     from: '8',
// //     Icon: HumidityIcon,
// //     progress: 50,
// //   },
// //   {
// //     type: 'CO',
// //     status: '50%',
// //     from: '8',
// //     Icon: CarbonMonoxideIcon,
// //     progress: 38,
// //   },
// //   {
// //     type: 'CH',
// //     status: '39%',
// //     from: '8',
// //     Icon: MethaneIcon,
// //     progress: 30,
// //   },
// // ];
// // const StatusCards = ({ data }) => {
// //   const currentParameterValue = data?.allBuildingsSensorsAverageData;
// //   console.log('currentParameterValue', data);

// //   const iconMap = {
// //     'Current Temperature': TemperatureIcon,
// //     TVOC: TvocIcon,
// //     CO2: Co2Icon,
// //     'Current Humidity': HumidityIcon,
// //     CO: CarbonMonoxideIcon,
// //     CH: MethaneIcon,
// //   };
// //   const statusData = currentParameterValue?.map((item) => ({
// //     ...item,
// //     Icon: iconMap[item.type] || null, // Attach icon component reference
// //   }));
// //   console.log('statusData', statusData);

// //   return (
// //     // <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
// //     //   <StatusCard
// //     //     type="Current Temperature"
// //     //     // status="16° F"
// //     //     from="88"
// //     //     icon={<TemperatureIcon />}
// //     //     progressIcon={<ProgressRadialChart seriesData={[10]} />}
// //     //   />
// //     //   <StatusCard
// //     //     type="TVOC"
// //     //     // status="50° F"
// //     //     from="8"
// //     //     icon={<TvocIcon />}
// //     //     progressIcon={<ProgressRadialChart seriesData={[90]} />}
// //     //   />
// //     //   <StatusCard
// //     //     type="CO2"
// //     //     // status="75° F"
// //     //     from="8"
// //     //     icon={<Co2Icon />}
// //     //     progressIcon={<ProgressRadialChart seriesData={[30]} />}
// //     //   />
// //     //   <StatusCard
// //     //     type="Current Humidity"
// //     //     // status="60%"
// //     //     from="8"
// //     //     icon={<HumidityIcon />}
// //     //     progressIcon={<ProgressRadialChart seriesData={[50]} />}
// //     //   />
// //     //   <StatusCard
// //     //     type="CO"
// //     //     // status="50%"
// //     //     from="8"
// //     //     icon={<CarbonMonoxideIcon />}
// //     //     progressIcon={<ProgressRadialChart seriesData={[38]} />}
// //     //   />
// //     //   <StatusCard
// //     //     type="CH"
// //     //     // status="39%"
// //     //     from="8"
// //     //     icon={<MethaneIcon />}
// //     //     progressIcon={<ProgressRadialChart seriesData={[30]} />}
// //     //   />
// //     // </div>
// //     <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
// //       {statusData?.map((item, index) => (
// //         <StatusCard
// //           key={index}
// //           type={item.type}
// //           // status={status}
// //           from={item.differ}
// //           icon={item.icon} // Render here
// //           progressIcon={<ProgressRadialChart seriesData={[item.today]} />}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // export default StatusCards;

// import React from 'react';
// import TemperatureIcon from '../../assets/svgs/dashboard/TemperatureIcon';
// import StatusCard from '../shared/large/card/StatusCard';
// import TvocIcon from '../../assets/svgs/dashboard/TvocIcon';
// import Co2Icon from '../../assets/svgs/dashboard/Co2Icon';
// import HumidityIcon from '../../assets/svgs/buildings/HumidityIcon';
// import CarbonMonoxideIcon from '../../assets/svgs/buildings/CarbonMonoxideIcon';
// import MethaneIcon from '../../assets/svgs/buildings/MethaneIcon';
// import ProgressRadialChart from '../charts/ProgressRadialChart.jsx/ProgressRadialChart';

// const iconMap = {
//   'Current Temperature': TemperatureIcon,
//   TVOC: TvocIcon,
//   CO2: Co2Icon,
//   'Current Humidity': HumidityIcon,
//   CO: CarbonMonoxideIcon,
//   CH: MethaneIcon,
// };

// const StatusCards = ({ data }) => {
//   const currentParameterValue = data?.allBuildingsSensorsAverageData;

//   const statusData = currentParameterValue?.map((item) => ({
//     ...item,
//     Icon: iconMap[item.type] || null,
//   }));

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
//       {statusData?.map((item, index) => (
//         <StatusCard
//           key={index}
//           type={item.type}
//           status={`${item.todayy}`} // Display value
//           from={item.differ}
//           icon={item.Icon ? <item.Icon /> : null}
//           progressIcon={<ProgressRadialChart seriesData={[item.todayy]} />}
//         />
//       ))}
//     </div>
//   );
// };

// export default StatusCards;

import React from 'react';
import TemperatureIcon from '../../assets/svgs/dashboard/TemperatureIcon';
import StatusCard from '../shared/large/card/StatusCard';
import TvocIcon from '../../assets/svgs/dashboard/TvocIcon';
import Co2Icon from '../../assets/svgs/dashboard/Co2Icon';
import HumidityIcon from '../../assets/svgs/buildings/HumidityIcon';
import CarbonMonoxideIcon from '../../assets/svgs/buildings/CarbonMonoxideIcon';
import MethaneIcon from '../../assets/svgs/buildings/MethaneIcon';
import ProgressRadialChart from '../charts/ProgressRadialChart.jsx/ProgressRadialChart';

const iconMap = {
  'Current Temperature': TemperatureIcon,
  TVOC: TvocIcon,
  CO2: Co2Icon,
  'Current Humidity': HumidityIcon,
  CO: CarbonMonoxideIcon,
  CH: MethaneIcon,
};

const StatusCards = ({ data }) => {
  const currentParameterValue = data?.allBuildingsSensorsAverageData;

  const isLoading = !currentParameterValue || currentParameterValue.length === 0;

  const statusData = currentParameterValue?.map((item) => ({
    ...item,
    Icon: iconMap[item.type] || null,
  }));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="min-w-[182px] min-h-[131px] p-4  bg-gray-100 animate-pulse rounded-[16px] shadow-md"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="w-[40%] h-[60px] bg-gray-300 rounded-full"></div>
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            </div>
            <div className="h-6 mt-4 bg-gray-300 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
      {statusData.map((item, index) => (
        <StatusCard
          key={index}
          type={item.type}
          status={`${item.todayy ?? 'N/A'}`}
          from={item.differ ?? '0.00'}
          icon={item.Icon ? <item.Icon /> : null}
          progressIcon={<ProgressRadialChart seriesData={[item.todayy]} />}
        />
      ))}
    </div>
  );
};

export default StatusCards;
