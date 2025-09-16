import React from 'react';
import TemperatureIcon from '../../assets/svgs/dashboard/TemperatureIcon';
import StatusCard from '../shared/large/card/StatusCard';
import TvocIcon from '../../assets/svgs/dashboard/TvocIcon';
import Co2Icon from '../../assets/svgs/dashboard/Co2Icon';
import HumidityIcon from '../../assets/svgs/buildings/HumidityIcon';
import CarbonMonoxideIcon from '../../assets/svgs/buildings/CarbonMonoxideIcon';
import MethaneIcon from '../../assets/svgs/buildings/MethaneIcon';
import ProgressRadialChart from '../charts/ProgressRadialChart.jsx/ProgressRadialChart';

// ✅ Sensor configuration with icon + label
const sensorMap = {
  'Current Temperature': {
    icon: TemperatureIcon,
    label: 'Current Temperature',
    max: 150,
  },
  TVOC: {
    icon: TvocIcon,
    label: 'TVOC',
    max: 10000,
  },
  CO2: {
    icon: Co2Icon,
    label: 'CO₂',
    max: 50000,
  },
  'Current Humidity': {
    icon: HumidityIcon,
    label: 'Current Humidity',
    max: 100,
  },
  CO: {
    icon: CarbonMonoxideIcon,
    label: 'Carbon Monoxide',
    max: 1000,
  },
  CH: {
    icon: MethaneIcon,
    label: 'Methane (CH₄)',
    max: 100,
  },
};

const StatusCards = ({ data, isLoading }) => {
  const currentParameterValue = data?.allBuildingsSensorsAverageData || [];

  // ✅ Map incoming data to include icon + label
  const statusData = currentParameterValue?.map((item) => {
    const mapped = sensorMap[item.type] || {};
    const max = mapped.max || 0;

    let todayPercentage = 0;
    let yesterdayPercentage = 0;
    let changePercentage = 0;

    if (max) {
      todayPercentage = ((item.todayy ?? 0) / max) * 100;
      yesterdayPercentage = ((item.yesterday ?? 0) / max) * 100;
      changePercentage = todayPercentage - yesterdayPercentage;
    }

    return {
      ...item,
      displayName: mapped.label || item.type,
      Icon: mapped.icon || null,
      todayPercentage: todayPercentage.toFixed(2),
      yesterdayPercentage: yesterdayPercentage.toFixed(2),
      changePercentage: changePercentage.toFixed(2),
    };
  });

  // ✅ 1. Loading → skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="min-w-[182px] min-h-[131px] p-4 bg-gray-100 animate-pulse rounded-[16px] shadow-md"
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

  // ✅ 2. Empty → show fallback N/A cards for all 6 sensors
  const fallbackCards = Object.values(sensorMap).map((sensor) => ({
    type: 'N/A',
    displayName: sensor.label,
    todayy: 'N/A',
    changePercentage: '0.00',
    todayPercentage: 0,
    Icon: sensor.icon,
  }));

  const displayData = statusData && statusData.length > 0 ? statusData : fallbackCards;

  // ✅ 3. Render
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
      {displayData.map((item, index) => (
        <StatusCard
          key={index}
          type={item.displayName}
          status={`${item.todayy ?? 'N/A'}`}
          from={item.changePercentage ?? '0.00'}
          icon={item.Icon ? <item.Icon /> : null}
          progressIcon={<ProgressRadialChart seriesData={[item.todayPercentage ?? 0]} />}
        />
      ))}
    </div>
  );
};

export default StatusCards;
