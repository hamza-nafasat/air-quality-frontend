import React from "react";
import { GoDotFill } from "react-icons/go";
import CloudIcon from "../../assets/svgs/buildings/CloudIcon";
import SensorIcon from "../../assets/svgs/buildings/SensorIcon";
import TemperatureIcon from "../../assets/svgs/buildings/TemperatureIcon";
import TvocIcon from "../../assets/svgs/buildings/TvocIcon";
import LocationIcon from "../../assets/svgs/pages/LocationIcon";
import Button from "../shared/small/Button";

import { Link, useNavigate } from "react-router-dom";
import greyBuilding from "../../assets/images/buildings/greyBuilding.png";

const BuildingCard = ({
  id,
  name,
  address,
  sensors,
  temperature,
  tvoc,
  co2,
  link,
}) => {
  return (
    <div className="border-b-[1px] border-[#00000030] p-1">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 py-2">
        <BuildingInfo
          id={id}
          name={name}
          address={address}
          sensors={sensors}
          link={link}
        />
        <SensorInfo
          id={id}
          temperature={temperature}
          tvoc={tvoc}
          co2={co2}
          link={link}
        />
      </div>
    </div>
  );
};

export default BuildingCard;

const BuildingInfo = ({ name, address, sensors }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-2">
      <section className="w-[248px] h-[118px] border-[1px] rounded-lg  border-black flex-none">
        <img
          src={greyBuilding}
          alt="Description"
          className="w-full h-full object-cover rounded-lg "
        />
      </section>
      <div className="flex flex-col gap-5">
        <section className="flex justify-between  ">
          <div>
            <h2 className="text-[14px] xl:text-[16px] font-[700] w-0 xl:min-w-[200px]">
              {name}
            </h2>

            <div className="flex gap-1">
              {" "}
              <LocationIcon />
              <h6 className="text-[10px] xl:text-[12px] font-[600] xl:min-w-[200px] ">
                {" "}
                {address}
              </h6>
            </div>
          </div>
          <div className="border-[1px] border-[black] pl-3 pr-4  rounded-[30px] flex items-center  justify-center">
            <GoDotFill fontSize={22} className="text-primary-lightBlue " />{" "}
            <p className="text-[12px] font-[700]">Active</p>
          </div>
        </section>
        <section className="flex items-center gap-2">
          <SensorIcon />
          <div>
            <h3 className="text-[14px] xl:text-[16px] font-[700]">
              Total No. of Sensors
            </h3>
            <h1 className="text-[20px] xl:text-[22px] font-[700]">
              {" "}
              {sensors}
            </h1>
          </div>
        </section>
      </div>
    </div>
  );
};

const SensorInfo = ({ id, temperature, tvoc, co2, link }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end">
      <div className="flex  flex-col-reverse xl:flex-col items-end gap-5">
        <section>
          <Link to={link}>
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
        <section className="flex  flex-wrap gap-5">
          <div className="flex gap-2 items-center">
            <TemperatureIcon />
            <div className="flex flex-col">
              <p className="text-[12px]  ">Current Temperature</p>
              <p className="text-[14px] xl:text-[16px] font-[600]">
                {temperature}°F
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <TvocIcon />
            <div className="flex flex-col">
              <p className="text-[12px]  ">TVOC</p>
              <p className="text-[14px] xl:text-[16px] font-[600] ">{tvoc}°F</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <CloudIcon />
            <div className="flex flex-col">
              <p className="text-[12px]  ">CO2</p>
              <p className="text-[14px] xl:text-[16px] font-[600]">{co2}°F</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
