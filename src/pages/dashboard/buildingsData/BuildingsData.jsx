import React from "react";
import Welcome from "../../../components/buildingsData/Welcome";
import StatusCards from "../../../components/buildingsData/StatusCards";
import LineChart from "../../../components/charts/lineChart/LineChart";
import WeatherCard from "../../../components/buildingsData/WeatherCard";
import BuildingMap from "../../../components/buildingsData/BuildingMap";
import AirQualityIndex from "../../../components/buildingsData/AirQualityIndex";
import WeatherChart from "../../../components/buildingsData/WeatherChart";
import DoubleAreaChart from "../../../components/charts/areaChart/DoubleAreaChart";
import BuildingFloors from "../../../components/buildingsData/buildingView/components/BuildingFloors";

const BuildingsData = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 flex flex-col">
        <Welcome />
        <div className="mt-4">
          <StatusCards />
        </div>
        <div className="mt-4">
          <BuildingMap />
        </div>
        <div className="shadow-dashboard border-[0.2px] border-[#00000033] rounded-xl bg-white p-4 mt-4 flex-1">
          <DoubleAreaChart />
        </div>
      </div>
      <div className="lg:col-span-4 flex flex-col">
        <div className="shadow-dashboard border-[0.6px] border-[#0000004d] rounded-xl bg-white p-4">
          <LineChart />
        </div>
        <div className="shadow-dashboard rounded-xl bg-white mt-4 flex-1">
          <WeatherCard />
        </div>
        <div className="shadow-dashboard border-[0.2px] border-[#00000033] rounded-xl bg-white mt-4">
          <AirQualityIndex />
        </div>
        <div className="shadow-dashboard border-[0.2px] border-[#00000033] rounded-xl bg-white px-4 pt-4 pb-8 mt-4">
          <WeatherChart />
        </div>
      </div>
      <div className="lg:col-span-12">
        <BuildingFloors title="Buildings" />
      </div>
    </div>
  );
};

export default BuildingsData;
