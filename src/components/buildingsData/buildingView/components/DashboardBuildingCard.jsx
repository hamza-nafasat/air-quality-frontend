// // import React from 'react';
// // import TemperatureIcon from '../../../../assets/svgs/dashboard/TemperatureIcon';
// // import TvocIcon from '../../../../assets/svgs/dashboard/TvocIcon';
// // import Co2Icon from '../../../../assets/svgs/dashboard/Co2Icon';
// // import HumidityIcon from '../../../../assets/svgs/buildings/HumidityIcon';
// // import CarbonMonoxideIcon from '../../../../assets/svgs/buildings/CarbonMonoxideIcon';
// // import MethaneIcon from '../../../../assets/svgs/buildings/MethaneIcon';

// // const iconMap = {
// //   temperature: TemperatureIcon,
// //   humidity: HumidityIcon,
// //   co: CarbonMonoxideIcon,
// //   ch: MethaneIcon,
// //   tvoc: TvocIcon,
// //   co2: Co2Icon,
// // };

// // function DashboardBuildingCard({ data }) {
// //   console.log('datalkhkb data', data);

// //   const {
// //     _id: id,
// //     name,
// //     address,
// //     totalSensors: sensors,
// //     thumbnail: { url: thumbnail },
// //     sensorsDataAverage,
// //   } = data;

// //   const formattedSensorData = sensorsDataAverage.map(([type, value]) => ({
// //     type,
// //     value,
// //     Icon: iconMap[type] || null,
// //   }));

// //   return (
// //     <div className="border-b-[1px] border-[#00000030] p-1">
// //       <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 py-2">
// //         <BuildingInfo
// //           id={id}
// //           name={name}
// //           address={address}
// //           sensors={sensors}
// //           thumbnail={thumbnail}
// //         />
// //         <SensorInfo data={formattedSensorData} />
// //       </div>
// //     </div>
// //   );
// // }

// // export default DashboardBuildingCard;

// // const BuildingInfo = ({ name, thumbnail, address, sensors }) => {
// //   return (
// //     <div className="flex flex-col xl:flex-row gap-2">
// //       <section className="w-[248px] h-[118px] border-[1px] rounded-lg  border-black flex-none">
// //         <img
// //           src={thumbnail || greyBuilding}
// //           alt="Description"
// //           className="w-full h-full object-cover rounded-lg "
// //         />
// //       </section>
// //       <div className="flex flex-col gap-5">
// //         <section className="flex justify-between  ">
// //           <div>
// //             <h2 className="text-[14px] xl:text-[16px] font-[700] w-0 xl:min-w-[200px]">{name}</h2>
// //           </div>
// //         </section>
// //         <section className="flex items-center gap-2">
// //           <SensorIcon />
// //           <div>
// //             <h3 className="text-[14px] xl:text-[16px] font-[700]">Total No. of Sensors</h3>
// //             <h1 className="text-[20px] xl:text-[22px] font-[700]"> {sensors}</h1>
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // };

// // const SensorInfo = ({ data }) => {
// //   return (
// //     <div className="flex justify-end">
// //       <div className="flex flex-col-reverse xl:flex-col items-end gap-5">
// //         <section>
// //           <Link to="#">
// //             <Button
// //               text="View Details"
// //               bg="none"
// //               borderColor="rgba(3, 165, 224, 1)"
// //               radius="rounded-[10px]"
// //               color="rgba(3, 165, 224, 1)"
// //               width="w-[fit]"
// //             />
// //           </Link>
// //         </section>
// //         <section className="flex flex-wrap gap-5">
// //           {data.map(({ type, value, Icon }) => (
// //             <div key={type} className="flex gap-2 items-center">
// //               {Icon && <Icon />}
// //               <div className="flex flex-col">
// //                 <p className="text-[12px] capitalize">{type}</p>
// //                 <p className="text-[14px] xl:text-[16px] font-[600]">{value}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </section>
// //       </div>
// //     </div>
// //   );
// // };

// import React from 'react';
// import { Link } from 'react-router-dom'; // Assuming you're using react-router
// // import Button from '../../../shared/Button'; // Adjust this path if needed

// import greyBuilding from '../../../../assets/images/buildings/greyBuilding.png'; // Fallback image
// import TemperatureIcon from '../../../../assets/svgs/dashboard/TemperatureIcon';
// import TvocIcon from '../../../../assets/svgs/dashboard/TvocIcon';
// import Co2Icon from '../../../../assets/svgs/dashboard/Co2Icon';
// import HumidityIcon from '../../../../assets/svgs/buildings/HumidityIcon';
// import CarbonMonoxideIcon from '../../../../assets/svgs/buildings/CarbonMonoxideIcon';
// import MethaneIcon from '../../../../assets/svgs/buildings/MethaneIcon';
// import SensorIcon from '../../../../assets/svgs/dashboard/SensorIcon'; // Assuming you have this
// import Button from '../../../shared/small/Button';

// const iconMap = {
//   temperature: TemperatureIcon,
//   humidity: HumidityIcon,
//   co: CarbonMonoxideIcon,
//   ch: MethaneIcon,
//   tvoc: TvocIcon,
//   co2: Co2Icon,
// };

// function DashboardBuildingCard({ data }) {
//   if (!data) return <div className="p-4 text-gray-500">No data available</div>;

//   const {
//     _id: id,
//     name = 'Unnamed Building',
//     address = 'No address',
//     totalSensors: sensors = 0,
//     thumbnail,
//     sensorsDataAverage = [],
//   } = data || {};

//   const formattedSensorData = Array.isArray(sensorsDataAverage)
//     ? sensorsDataAverage.map(([type, value]) => ({
//         type,
//         value,
//         Icon: iconMap[type] || null,
//       }))
//     : [];

//   return (
//     <div className="border-b-[1px] border-[#00000030] p-1">
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 py-2">
//         <BuildingInfo
//           id={id}
//           name={name}
//           address={address}
//           sensors={sensors}
//           thumbnail={thumbnail?.url || greyBuilding}
//         />
//         <SensorInfo data={formattedSensorData} />
//       </div>
//     </div>
//   );
// }

// export default DashboardBuildingCard;

// const BuildingInfo = ({ name, thumbnail, address, sensors }) => {
//   return (
//     <div className="flex flex-col xl:flex-row gap-2">
//       <section className="w-[248px] h-[118px] border-[1px] rounded-lg border-black flex-none">
//         <img
//           src={thumbnail || greyBuilding}
//           alt="Building"
//           className="w-full h-full object-cover rounded-lg"
//         />
//       </section>
//       <div className="flex flex-col gap-5">
//         <section className="flex justify-between">
//           <div>
//             <h2 className="text-[14px] xl:text-[16px] font-[700] w-0 xl:min-w-[200px]">{name}</h2>
//           </div>
//         </section>
//         <section className="flex items-center gap-2">
//           <SensorIcon />
//           <div>
//             <h3 className="text-[14px] xl:text-[16px] font-[700]">Total No. of Sensors</h3>
//             <h1 className="text-[20px] xl:text-[22px] font-[700]">{sensors}</h1>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// const SensorInfo = ({ data }) => {
//   if (!Array.isArray(data) || data.length === 0) {
//     return <div className="text-gray-500 text-sm">No sensor data available</div>;
//   }

//   return (
//     <div className="flex justify-end">
//       <div className="flex flex-col-reverse xl:flex-col items-end gap-5">
//         <section>
//           <Link to="#">
//             <Button
//               text="View Details"
//               bg="none"
//               borderColor="rgba(3, 165, 224, 1)"
//               radius="rounded-[10px]"
//               color="rgba(3, 165, 224, 1)"
//               width="w-[fit]"
//             />
//           </Link>
//         </section>
//         <section className="flex flex-wrap gap-5">
//           {data.map(({ type, value, Icon }) => (
//             <div key={type || Math.random()} className="flex gap-2 items-center">
//               {Icon && <Icon />}
//               <div className="flex flex-col">
//                 <p className="text-[12px] capitalize">{type || 'Unknown'}</p>
//                 <p className="text-[14px] xl:text-[16px] font-[600]">{value ?? 'N/A'}</p>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TemperatureIcon from '../../../../assets/svgs/dashboard/TemperatureIcon';
import TvocIcon from '../../../../assets/svgs/dashboard/TvocIcon';
import Co2Icon from '../../../../assets/svgs/dashboard/Co2Icon';
import HumidityIcon from '../../../../assets/svgs/buildings/HumidityIcon';
import CarbonMonoxideIcon from '../../../../assets/svgs/buildings/CarbonMonoxideIcon';
import MethaneIcon from '../../../../assets/svgs/buildings/MethaneIcon';
import greyBuilding from '../../../../assets/images/buildings/greyBuilding.png';
import SensorIcon from '../../../../assets/svgs/dashboard/SensorIcon';
import Button from '../../../shared/small/Button';

const iconMap = {
  temperature: TemperatureIcon,
  humidity: HumidityIcon,
  co: CarbonMonoxideIcon,
  ch: MethaneIcon,
  tvoc: TvocIcon,
  co2: Co2Icon,
};

function DashboardBuildingCard({ data }) {
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      setIsDataReady(true);
    } else {
      setIsDataReady(false);
    }
  }, [data]);
  console.log('datadatadata', data);

  if (!isDataReady) {
    return <div className="p-4 text-gray-500 text-sm">Loading building data...</div>;
  }

  const {
    _id: id = '',
    name = 'No Name',
    address = 'No Address',
    totalSensors: sensors = 0,
    thumbnail = {},
    sensorsDataAverage = [],
  } = data;

  const formattedSensorData = Array.isArray(sensorsDataAverage)
    ? sensorsDataAverage.map(([type, value]) => ({
        type,
        value,
        Icon: iconMap[type] || null,
      }))
    : [];

  return (
    <div className="border-b-[1px] border-[#00000030] p-1">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 py-2">
        <BuildingInfo
          id={id}
          name={name}
          address={address}
          sensors={sensors}
          thumbnail={thumbnail.url}
        />
        <SensorInfo data={formattedSensorData} id={id} />
      </div>
    </div>
  );
}

export default DashboardBuildingCard;

const BuildingInfo = ({ name = '', thumbnail = '', address = '', sensors = 0 }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-2">
      <section className="w-[248px] h-[118px] border-[1px] rounded-lg border-black flex-none">
        <img
          src={thumbnail || greyBuilding}
          alt="Building"
          className="w-full h-full object-cover rounded-lg"
        />
      </section>
      <div className="flex flex-col gap-5">
        <section className="flex justify-between">
          <div>
            <h2 className="text-[14px] xl:text-[16px] font-[700] w-0 xl:min-w-[200px]">{name}</h2>
          </div>
        </section>
        <section className="flex items-center gap-2">
          <SensorIcon />
          <div>
            <h3 className="text-[14px] xl:text-[16px] font-[700]">Total No. of Sensors</h3>
            <h1 className="text-[20px] xl:text-[22px] font-[700]">{sensors}</h1>
          </div>
        </section>
      </div>
    </div>
  );
};

const SensorInfo = ({ data = [], id }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex justify-end">
        <div className="text-sm text-gray-500">No sensor data available</div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="flex flex-col-reverse xl:flex-col items-end gap-5">
        <section>
          <Link to={`/dashboard/building-view/${id}`}>
            <Button
              text="View Details"
              bg="none"
              borderColor="rgba(3, 165, 224, 1)"
              radius="rounded-[10px]"
              color="rgba(3, 165, 224, 1)"
              width="w-[fit]"
            />
          </Link>
        </section>
        <section className="flex flex-wrap gap-5">
          {data.map(({ type = 'Unknown', value = '-', Icon }, index) => (
            <div key={type + index} className="flex gap-2 items-center">
              {Icon && <Icon />}
              <div className="flex flex-col">
                <p className="text-[12px] capitalize">{type}</p>
                <p className="text-[14px] xl:text-[16px] font-[600]">{value}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
