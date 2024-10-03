import React from "react";
import TemperatureIcon from "../../assets/svgs/dashboard/TemperatureIcon";
import StatusCard from "../shared/large/card/StatusCard";
import TvocIcon from "../../assets/svgs/dashboard/TvocIcon";
import Co2Icon from "../../assets/svgs/dashboard/Co2Icon";
import HumidityIcon from "../../assets/svgs/buildings/HumidityIcon";
import CarbonMonoxideIcon from "../../assets/svgs/buildings/CarbonMonoxideIcon";
import MethaneIcon from "../../assets/svgs/buildings/MethaneIcon";
import ProgressRadialChart from "../charts/ProgressRadialChart.jsx/ProgressRadialChart";

const StatusCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
      <StatusCard
        type="Current Temperature"
        status="16° F"
        from="8"
        icon={<TemperatureIcon />}
        progressIcon={<ProgressRadialChart seriesData={[10]} />}
      />
      <StatusCard
        type="TVOC"
        status="50° F"
        from="8"
        icon={<TvocIcon />}
        progressIcon={<ProgressRadialChart seriesData={[90]} />}
      />
      <StatusCard
        type="CO2"
        status="75° F"
        from="8"
        icon={<Co2Icon />}
        progressIcon={<ProgressRadialChart seriesData={[30]} />}
      />
      <StatusCard
        type="Current Humidity"
        status="60%"
        from="8"
        icon={<HumidityIcon />}
        progressIcon={<ProgressRadialChart seriesData={[50]} />}
      />
      <StatusCard
        type="CO"
        status="50%"
        from="8"
        icon={<CarbonMonoxideIcon />}
        progressIcon={<ProgressRadialChart seriesData={[38]} />}
      />
      <StatusCard
        type="CH"
        status="39%"
        from="8"
        icon={<MethaneIcon />}
        progressIcon={<ProgressRadialChart seriesData={[30]} />}
      />
    </div>
  );
};

export default StatusCards;
