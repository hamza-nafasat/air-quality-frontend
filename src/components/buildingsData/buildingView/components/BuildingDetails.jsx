// eslint-disable-next-line react/prop-types
import React from 'react';
import greyBuilding from '../../../../assets/images/buildings/greyBuilding.png';
import LocationIcon from '../../../../assets/svgs/pages/LocationIcon';

const BuildingDetails = ({ building }) => {
  console.log('building', building);
  const bestAirQuality = building?.airQuality?.goodAirQuality;
  const worstAirQuality = building?.airQuality?.badAirQuality;

  return (
    <div className="p-5 bg-white rounded-[16px]  shadow-dashboard h-full">
      <h5 className="mb-2">Building Details</h5>
      <section className="max-w-90 xl:w-90   overflow-hidden mx-auto xl:mx-0">
        <img
          src={building?.thumbnail}
          alt="Description"
          className="w-full h-[250px] object-cover rounded-lg"
        />
      </section>

      <section className="mt-2">
        <h1 className="text-[16px] font-[600] text-[#060606CC] ">{building?.name}</h1>
        <div className="flex items-center gap-2 mt-1">
          <LocationIcon />
          <p className="text-[8px] font-[600] text-[#060606CC] ">{building?.address}</p>
        </div>
      </section>

      <section>
        <div className="flex justify-between mt-1">
          <h3 className="text-[12px] text-[#060606CC] font-[400]">Type</h3>
          <h3 className="text-[12px] text-[#060606CC] font-[400] capitalize">{building?.type}</h3>
        </div>
        <div className="flex justify-between mt-1">
          <h3 className="text-[12px] text-[#060606CC] font-[400]">Total Floors</h3>
          <h3 className="text-[12px] text-[#060606CC] font-[400]">{building?.floors}</h3>
        </div>
        <div className="flex justify-between mt-1">
          <h3 className="text-[12px] text-[#060606CC] font-[400]">Area</h3>
          <h3 className="text-[12px] text-[#060606CC] font-[400]">{building?.area}</h3>
        </div>
        <div className="flex justify-between mt-1">
          <h3 className="text-[12px] text-[#060606CC] font-[400]">Total Sensors</h3>
          <h3 className="text-[12px] text-[#060606CC] font-[400]">{building?.totalSensors}</h3>
        </div>
      </section>

      <section className="mt-2  w-full flex justify-center">
        <div className="flex w-full gap-3">
          <div className="px-5 py-3 bg-[#D7FFCE] rounded-[10px] w-full">
            <h2 className="text-sm text-[#060606CC]">Best-Floor</h2>
            {bestAirQuality?.length > 0 ? (
              bestAirQuality?.slice(0, 2).map((floorName, index) => (
                <h5 key={floorName.id} className="text-[12px] text-[#060606CC]">
                  {floorName.name}
                </h5>
              ))
            ) : (
              <h5 className="text-[12px] text-[#060606CC] italic">No floor</h5>
            )}
          </div>

          <div className="px-5 py-3 bg-[#FFD6D6] rounded-[10px] w-full">
            <h2 className="text-sm text-[#060606CC]">Worst-Floor</h2>
            {worstAirQuality?.length > 0 ? (
              worstAirQuality.map((floorName, index) => (
                <h5 key={floorName.id} className="text-[12px] text-[#060606CC]">
                  {floorName.name}
                </h5>
              ))
            ) : (
              <h5 className="text-[12px] text-[#060606CC] italic">No floor</h5>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuildingDetails;
