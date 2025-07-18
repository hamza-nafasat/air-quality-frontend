import React, { useEffect, useState } from 'react';
import WelcomeIcon from '../../assets/svgs/dashboard/WelcomeIcon';
import WelcomeImage from '../../assets/images/dashboard/welcome-image.png';
import SensorIcon from '../../assets/svgs/dashboard/SensorIcon';
import GoodIcon from '../../assets/svgs/dashboard/GoodIcon';
import GreenBuildingIcon from '../../assets/svgs/dashboard/GreenBuildingIcon';
import RedBuildingIcon from '../../assets/svgs/dashboard/RedBuildingIcon';

const Welcome = ({ data, loading }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="shadow-dashboard border-[0.6px] border-[#0000004d] rounded-xl bg-white p-4 lg:bg-welcome bg-no-repeat bg-right-top bg-contain grid grid-cols-1 lg:grid-cols-12 gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="lg:col-span-8">
        <div className="flex gap-1">
          <div>
            <h4 className="text-base md:text-md text-[#7e7e7e] leading-none">Welcome To</h4>
            <h2 className="text-md md:text-lg font-semibold text-[#060606cc] leading-none my-1 md:my-0">
              Air Quality Monitoring Area
            </h2>
            <p className="text-sm md:text-base text-[#7e7e7e] leading-none">
              Ensuring optimal indoor air quality for a healthier environment.
            </p>
          </div>
          <div
            style={{
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: isHovered ? `translateY(-10px) ` : `translateY(0) `,
            }}
          >
            <WelcomeIcon />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-2 mt-4">
          <ActiveSensorsQualityRating
            title="Active Sensors"
            value={data?.totalActiveSensors}
            color="#03a5e0"
            icon={<SensorIcon />}
            loading={loading}
          />

          <ActiveSensorsQualityRating
            title="Air Quality Rating"
            value={data?.allBuildingAirQulity?.status}
            color="#82d717"
            icon={<GoodIcon />}
            loading={loading}
          />

          {/* <BestWorstLocation
            title="Best-Location"
            buildingName="Office Building"
            address="Warehouse Black A"
            icon={<GreenBuildingIcon />}
            color="#82d717"
            loading={loading}
          /> */}
          <BestLocation
            title="Best-Location"
            buildingName="Office Building"
            address="Warehouse Black A"
            icon={<GreenBuildingIcon />}
            color="#82d717"
            loading={loading}
            array={data?.AllBuildingAvrageAirQuality?.goodAirQuality?.slice(0, 2)}
          />

          <BestLocation
            title="Worst Locations"
            array={data?.AllBuildingAvrageAirQuality?.badAirQuality}
            icon={<RedBuildingIcon />}
            color="rgba(255,80,78)"
            loading={loading}
          />
        </div>
      </div>
      <div className="lg:col-span-4 flex justify-center md:justify-end">
        <img
          src={WelcomeImage}
          alt="image"
          className="w-[205px] max-w-full"
          style={{
            animation: isHovered ? 'bounce 2s infinite' : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        />
      </div>
    </div>
  );
};

// ... other components remain unchanged

export default Welcome;

const ActiveSensorsQualityRating = ({ title, value, icon, color, loading }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <h6 className="text-sm md:text-base font-semibold text-[#060606cc]">{title}</h6>
      <div className="flex items-center gap-3">
        {loading ? (
          <div className="w-10 h-6 bg-gray-200 animate-pulse rounded-md" />
        ) : (
          <p className="text-base md:text-2xl font-bold" style={{ color }}>
            {value}
          </p>
        )}
        <div>{icon}</div>
      </div>
    </div>
  );
};

const BestWorstLocation = ({ title, buildingName, address, icon, color, loading }) => {
  return (
    <div>
      <h6 className="text-sm md:text-base font-semibold text-[#060606cc]">{title}</h6>

      <div className="mt-2">
        <div className="flex items-center gap-1">
          {icon}
          {loading ? (
            <div className="w-24 h-4 bg-gray-200 animate-pulse rounded-md" />
          ) : (
            <p className="text-xs font-medium" style={{ color }}>
              {buildingName}
            </p>
          )}
        </div>
      </div>

      <div className="mt-1">
        <div className="flex items-center gap-1">
          {icon}
          {loading ? (
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded-md" />
          ) : (
            <p className="text-xs font-medium" style={{ color }}>
              {address}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
const BestLocation = ({ title, array = [], icon, color = '#82d717', loading }) => {
  const displayData = loading ? Array(2).fill({}) : array.slice(0, 2);

  return (
    <div>
      <h6 className="text-sm md:text-base font-semibold text-[#060606cc]">{title}</h6>

      {!loading && array.length === 0 ? (
        <p className="text-xs text-gray-500 mt-2">No location</p>
      ) : (
        displayData.map((item, idx) => (
          <div className="mt-2" key={idx}>
            <div className="flex items-center gap-1">
              {icon}
              {loading ? (
                <div className="w-24 h-4 bg-gray-200 animate-pulse rounded-md" />
              ) : (
                <p className="text-xs font-medium" style={{ color }}>
                  {item.name}
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
