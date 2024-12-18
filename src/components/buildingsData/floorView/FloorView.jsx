import React, { useEffect, useState } from "react";
import { buildings, floorViewStatus } from "../../../data/data";
import StatusCard from "../../shared/large/card/StatusCard";
import AlarmsIcon from "../../../assets/svgs/dashboard/AlarmsIcon";
import HumidityIcon from "../../../assets/svgs/buildings/HumidityIcon";
import MethaneIcon from "../../../assets/svgs/buildings/MethaneIcon";
import CarbonMonoxideIcon from "../../../assets/svgs/buildings/CarbonMonoxideIcon";
import CoIcon from "../../../assets/svgs/buildings/CoIcon";
import LpgIcon from "../../../assets/svgs/buildings/LpgIcon";
import polygonBuilding from "../../../assets/images/buildings/polygonBuilding.png";

import FloorDetails from "./components/FloorDetails";
import FloorSensorDetails from "./components/FloorSensorDetails";
import Alerts from "./components/Alerts";
import DoubleAreaChart from "../../charts/areaChart/DoubleAreaChart";
import CurrentHumidityChart from "./components/CurrentHumidityChart";
import { useParams } from "react-router-dom";
import heatMap from "../../../assets/images/floorView/heatmap.png";
import floorLayout from "../../../assets/images/buildings/greyBuilding.png";
import { useGetAllBuildingsQuery } from "../../../redux/apis/buildingApis";
import ShowCanvasData from "../../buildings/ShowCanvasData";
import ShowHeatmapData from "../../buildings/ShowHeatmapData";

const icons = [
  <AlarmsIcon />,
  <HumidityIcon />,
  <MethaneIcon />,
  <CarbonMonoxideIcon />,

  <CoIcon />,

  <LpgIcon />,
];

let floorDetails = {
  buildingImg: "",
  name: "",
  type: "",
  rooms: "",
  sensors: "",
};

const FloorView = () => {
  const [activeTab, setActiveTab] = useState("heat");
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [polygons, setPolygons] = useState([]);
  const { data, isSuccess, isLoading } = useGetAllBuildingsQuery();

  useEffect(() => {
    if (isSuccess) {
      const building = data?.data?.find((building) =>
        building?.floors?.some((floor) => floor?._id === id)
      );
      const singleFloor = building?.floors?.find((floor) => floor?._id === id);
      floorDetails = {
        ...floorDetails,
        name: building?.name || "",
        buildingImg: building?.thumbnail?.url || "",
        type: building?.type || "",
        rooms: singleFloor?.rooms || "",
        sensors: singleFloor?.sensors?.length || 0,
      };
      setImage(singleFloor?.twoDModel?.url);
      setPolygons(JSON.parse(singleFloor?.twoDModelCanvasData));
      console.log("floorDetails", singleFloor);
    }
  }, [data, isSuccess, id]);

  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        {floorViewStatus.map((item, i) => (
          <StatusCard
            key={i}
            status={item.status}
            from={item.from}
            type={item.type}
            icon={icons[i % icons.length]}
          />
        ))}
      </section>

      <section className="grid grid-cols-12 gap-4 mt-4 ">
        <div className="col-span-12 xl:col-span-8 flex flex-col">
          <div className="grid grid-cols-1 rounded-[16px] p-5 bg-white shadow-dashboard">
            <ShowCanvasData image={image} polygons={polygons} />
          </div>
          <div className="grid grid-cols-1 mt-4 rounded-[16px] p-5 bg-white shadow-dashboard">
            <DoubleAreaChart />
          </div>
          <div className="grid grid-cols-1 mt-4 flex-1">
            <FloorSensorDetails />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 flex flex-col">
          <div className="grid grid-cols-1">
            <FloorDetails floorDetails={floorDetails} />
          </div>
          <div className="grid grid-cols-1 mt-4 rounded-[16px] p-8 bg-white shadow-dashboard">
            <CurrentHumidityChart />
          </div>
          <div className="grid grid-cols-1 mt-4 flex-1">
            <Alerts />
          </div>
        </div>
      </section>

      <section className="mt-4 p-5 col-span-12 xl:col-span-8 rounded-[16px] bg-white shadow-dashboard">
        <div className="">
          {/* Toggle Buttons */}
          <div className="flex border  w-fit border-none  px-1 py-2 rounded-lg relative h-[40px] sm:h-[60px] mb-6">
            {/* Heat Map button */}
            <button
              className={`absolute  w-[120px] bg-[#03A5E040] px-4 py-2  text-sm font-medium transition-colors duration-300 ${
                activeTab === "heat"
                  ? "bg-white text-[#03A5E0] shadow-[4px_0_10px_rgba(0,0,0,0.25)] rounded-lg font-[700] z-[1]"
                  : "bg-[#03A5E040] text-gray-500 rounded-l-lg z-[0]"
              }`}
              onClick={() => setActiveTab("heat")}
            >
              Heat Map
            </button>

            {/* Floor Layout button */}
            <button
              className={`w-[120px] px-4 py-2 text-sm font-medium transition-colors duration-300 absolute left-[120px]  ${
                activeTab === "floor"
                  ? "bg-white text-[#03A5E0] shadow-[-5px_5px_15px_rgba(0,0,0,0.25)] rounded-lg font-[700] z-[1]"
                  : "bg-[#03A5E040] text-gray-500 rounded-r-lg z-[0]"
              }`}
              onClick={() => setActiveTab("floor")}
            >
              Floor Layout
            </button>
          </div>

          <div className="flex justify-center">
            {activeTab === "heat" ? (
              <ShowHeatmapData image={image} polygons={polygons} />
            ) : (
              <ShowCanvasData image={image} polygons={polygons} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FloorView;
