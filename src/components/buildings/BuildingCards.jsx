import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TemperatureIcon from '../../assets/svgs/dashboard/TemperatureIcon';
import TvocIcon from '../../assets/svgs/dashboard/TvocIcon';
import Co2Icon from '../../assets/svgs/dashboard/Co2Icon';
import HumidityIcon from '../../assets/svgs/buildings/HumidityIcon';
import CarbonMonoxideIcon from '../../assets/svgs/buildings/CarbonMonoxideIcon';
import MethaneIcon from '../../assets/svgs/buildings/MethaneIcon';
import greyBuilding from '../../assets/images/buildings/greyBuilding.png';
import SensorIcon from '../../assets/svgs/dashboard/SensorIcon';
import Button from '../shared/small/Button';
// import Button from '../../../shared/small/Button';
// import TemperatureIcon from '../../assets/svgs/dashboard/TemperatureIcon';

const iconMap = {
  temperature: TemperatureIcon,
  humidity: HumidityIcon,
  co: CarbonMonoxideIcon,
  ch: MethaneIcon,
  tvoc: TvocIcon,
  co2: Co2Icon,
};

function BuildingCards({ data }) {
  const [isDataReady, setIsDataReady] = useState(false);
  // console.log('datadata', data);
  // const hasType = !!data?.type; // or check nested if needed
  // console.log('hasType', hasType);

  useEffect(() => {
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      setIsDataReady(true);
    } else {
      setIsDataReady(false);
    }
  }, [data]);
  // console.log('datadatadata', data);

  if (!isDataReady) {
    return <div className="p-4 text-gray-500 text-sm">Loading building data...</div>;
  }

  const {
    _id: id = '',
    name = 'No Name',
    address = 'No Address',
    totalSensors: sensors = 0,
    thumbnail = {},
    currentSensorValues = [],
  } = data;

  const formattedSensorData = Array.isArray(currentSensorValues)
    ? currentSensorValues.map(({ parameter, value }) => ({
        type: parameter,
        value,
        Icon: iconMap[parameter] || null,
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
          thumbnail={data?.twoDModel?.url || data.thumbnail.url}
        />
        <SensorInfo data={formattedSensorData} id={id} type={!!data?.type} />
      </div>
    </div>
  );
}

export default BuildingCards;

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

const SensorInfo = ({ data = [], id, type }) => {
  console.log('hasTypehasType', type);

  const linkUrl = type ? `/dashboard/building-view/${id}` : `/dashboard/floor-view/${id}`;
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex justify-end">
        <div className="flex justify-end">
          <div className="flex flex-col-reverse xl:flex-col items-end gap-5">
            <section>
              <Link to={linkUrl}>
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
              <div className="text-sm text-gray-500">No sensor data available</div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="flex flex-col-reverse xl:flex-col items-end gap-5">
        <section>
          <Link to={linkUrl}>
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
