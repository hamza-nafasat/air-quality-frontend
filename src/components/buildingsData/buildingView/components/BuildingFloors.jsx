import React from "react";
import BuildingCard from "../../../buildings/BuildingCard";
import { buildings } from "../../../../data/data";
import SearchIcon from "../../../../assets/svgs/reports/SearchIcon";

const BuildingFloors = ({ title = "Building Floors" }) => {
  return (
    <div className="bg-white p-5 shadow-dashboard rounded-[16px]">
      <div className="flex justify-between sm:flex-row flex-col">
        <h5>{title}</h5>
        <FilterSection />
      </div>
      {buildings.map((building, i) => (
        <BuildingCard
          key={i}
          id={building.id}
          name={building.name}
          address={building.address}
          sensors={building.sensors}
          temperature={building.temperature}
          tvoc={building.tvoc}
          co2={building.co2}
          link={`/dashboard/building-view/${building.id}`}
        />
      ))}
    </div>
  );
};

export default BuildingFloors;

const FilterSection = () => {
  return (
    <div className="flex flex-wrap  gap-4 sm:mt-0 mt-2">
      <div className="flex items-center gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 basis-[35%] flex-1">
        <SearchIcon />
        <input type="search" placeholder="Search" className="focus:outline-none text-sm w-full" />
      </div>
      <div className="flex items-center justify-between gap-1 border border-[#e7e7e7] rounded-lg h-[34px] bg-white px-3 ">
        <p className="text-sm text-[#7e7e7e]">Sort By:</p>
        <select className="focus:outline-none text-sm">
          <option className="w-full">Newest</option>
          <option className="w-full">Oldest</option>
        </select>
      </div>
    </div>
  );
};
