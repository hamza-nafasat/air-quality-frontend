// import React from 'react';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import L from 'leaflet';
// import BuildingIcon from '../../assets/images/buildings/building-icon.png';
// import BuildingImage from '../../assets/images/buildings/brownBuilding.png';
// import PinIcon from '../../assets/svgs/buildings/PinIcon';

// const buildingIcon = new L.Icon({
//   iconUrl: BuildingIcon,
//   iconSize: [34, 34],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

// const buildingPositions = [
//   [25.2048, 55.2708],
//   [25.1985, 55.2697],
//   [25.2075, 55.2543],
//   [25.1956, 55.2443],
//   [25.2023, 55.2654],
// ];

// const BuildingMap = () => {
//   const centerPosition = [25.2023, 55.26];
//   return (
//     <div className="shadow-dashboard rounded-xl bg-white h-[435px]">
//       <MapContainer
//         center={centerPosition}
//         zoom={14}
//         attributionControl={false}
//         scrollWheelZoom={false}
//         style={{ height: 435, borderRadius: '12px' }}
//         className="grayscale-map"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {buildingPositions?.map((position, index) => (
//           <Marker key={index} position={position} icon={buildingIcon}>
//             <Popup>
//               <BuildingPopup />
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default BuildingMap;

// const BuildingPopup = () => {
//   return (
//     <div className="grid grid-cols-12 w-[300px] sm:w-[344px]">
//       <div className="col-span-4">
//         <img src={BuildingImage} alt="image" className="h-full object-cover rounded-l-[10px]" />
//       </div>
//       <div className="col-span-8 bg-primary-lightBlue rounded-r-[10px] p-4">
//         <h4 className="text-xs md:text-sm text-white font-semibold">Building 1</h4>
//         <div className="flex items-center gap-1 mt-1 mb-2">
//           <PinIcon />
//           <div className="text-[10px] font-medium text-white">
//             1051 18th St NW, Washington, DC 20006
//           </div>
//         </div>
//         <div className="border border-white rounded-lg px-2 py-1 w-full md:w-[70%]">
//           <div className="flex items-center justify-between gap-2">
//             <p className="text-[10px] text-white">Floor</p>
//             <p className="text-[10px] text-white">24</p>
//           </div>
//           <div className="flex items-center justify-between gap-2 my-1">
//             <p className="text-[10px] text-white">Type</p>
//             <p className="text-[10px] text-white">Commercial</p>
//           </div>
//           <div className="flex items-center justify-between gap-2">
//             <p className="text-[10px] text-white">Total Sensors</p>
//             <p className="text-[10px] text-white">45</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import BuildingIcon from '../../assets/images/buildings/building-icon.png';
import BuildingImage from '../../assets/images/buildings/brownBuilding.png';
import PinIcon from '../../assets/svgs/buildings/PinIcon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// Create Leaflet icon
const buildingIcon = new L.Icon({
  iconUrl: BuildingIcon,
  iconSize: [34, 34],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Dummy data for each building

const BuildingMap = ({ data, loading }) => {
  const centerPosition = [25.2023, 55.26];

  const buildings = data?.buildingMapData?.map((item) => ({
    name: item.name,
    position: [parseFloat(item.position[0]), parseFloat(item.position[1])], // Convert to numbers
    address: item.address,
    floor: item.totalFloors,
    type: item.type,
    totalSensors: item.totalSensors,
    image: item.thumbnail?.url,
  }));
  console.log('buildingsbuildingsbuildings', buildings);

  if (loading) {
    return (
      <div className="shadow-dashboard rounded-xl bg-white h-[435px] p-4">
        <Skeleton height={30} width={`60%`} className="mb-4" />
        <Skeleton height={300} />
      </div>
    );
  }

  return (
    <div className="shadow-dashboard rounded-xl bg-white h-[435px]">
      <MapContainer
        center={centerPosition}
        zoom={14}
        attributionControl={false}
        scrollWheelZoom={false}
        style={{ height: 435, borderRadius: '12px' }}
        className="grayscale-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {buildings?.map((building, index) => (
          <Marker key={index} position={building.position} icon={buildingIcon}>
            <Popup>
              <BuildingPopup building={building} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BuildingMap;

// Popup component receives building info as prop
const BuildingPopup = ({ building }) => {
  return (
    <div className="grid grid-cols-12 w-[300px] sm:w-[344px]">
      <div className="col-span-4">
        <img src={building.image} alt="building" className="h-full object-cover rounded-l-[10px]" />
      </div>
      <div className="col-span-8 bg-primary-lightBlue rounded-r-[10px] p-4">
        <h4 className="text-xs md:text-sm text-white font-semibold">{building.name}</h4>
        <div className="flex items-center gap-1 mt-1 mb-2">
          <PinIcon />
          <div className="text-[10px] font-medium text-white">{building.address}</div>
        </div>
        <div className="border border-white rounded-lg px-2 py-1 w-full md:w-full">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] text-white">Floor</p>
            <p className="text-[10px] text-white">{building.floor}</p>
          </div>
          <div className="flex items-center justify-between gap-2 my-1">
            <p className="text-[10px] text-white">Type</p>
            <p className="text-[10px] text-white">{building.type}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] text-white">Total Sensors</p>
            <p className="text-[10px] text-white">{building.totalSensors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
