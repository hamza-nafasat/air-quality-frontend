import React, { useEffect, useState } from "react";
import { buildings, buildingViewStatus } from "../../../data/data";
import StatusCard from "../../shared/large/card/StatusCard";
import AlarmsIcon from "../../../assets/svgs/dashboard/AlarmsIcon";
import Co2Icon from "../../../assets/svgs/dashboard/Co2Icon";

import EnergyIcon from "../../../assets/svgs/dashboard/EnergyIcon";
import EquipmentIcon from "../../../assets/svgs/dashboard/EquipmentIcon";
import OccupancyIcon from "../../../assets/svgs/dashboard/OccupancyIcon";
import TemperatureIcon from "../../../assets/svgs/dashboard/TemperatureIcon";
import polygonBuilding from "../../../assets/images/buildings/polygonBuilding.png";
import BuildingDetails from "./components/BuildingDetails";
import SensorDetails from "./components/SensorDetails";
import Alert from "../../shared/large/alert/Alert";
import Alerts from "./components/Alerts";
import BuildingCard from "../../buildings/BuildingCard";
import BuildingFloors from "./components/BuildingFloors";
import DoubleAreaChart from "../../charts/areaChart/DoubleAreaChart";
import BuildingHumidityChart from "./components/BuildingHumidityChart";
import { Link, useParams } from "react-router-dom";
import DeleteIcon from "../../../assets/svgs/pages/DeleteIcon";
import DeleteConfirmation from "../../shared/large/modal/DeleteConfirmation";
import Modal from "../../shared/large/modal/Modal";
import Floors from "../floorView/components/Floors";
import BuildingDeleteWithId from "../../shared/large/modal/BuildingDeleteWithId";
import { useGetSingleBuildingQuery } from "../../../redux/apis/buildingApis";
import Loader from "../../shared/small/Loader";
import UploadModelImage from "../../buildings/uploads/UploadModelImage";
import ShowCanvasData from "../../buildings/ShowCanvasData";

const icons = [
  <AlarmsIcon />,
  <TemperatureIcon />,
  <EquipmentIcon />,
  <EnergyIcon />,
  <Co2Icon />,
  <OccupancyIcon />,
];

const BuildingView = () => {
  const [buildingData, setBuildingData] = useState({});
  const { id } = useParams();
  const { data, isSuccess, isLoading } = useGetSingleBuildingQuery(id);
  const [previewValue, setPreviewValue] = useState("");
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      const building = data?.data;
      if (building) {
        setBuildingData({
          id: building?._id || "",
          address: building?.address || "",
          floors: building?.floors || "",
          name: building?.name || "",
          position: building?.position || "",
          thumbnail: building?.thumbnail?.url || "",
          twoDModel: building?.twoDModel?.url || "",
          type: building?.type || "",
          area: building?.area || "",
          totalSensors:
            building?.floors.reduce(
              (sensors, floor) => sensors + floor?.sensors.length,
              0
            ) || 0,
          twoDModelCanvasData: JSON.parse(building?.twoDModelCanvasData) || [],
        });
        setPreviewValue(building?.twoDModel?.url);
        setPolygons(JSON.parse(building?.twoDModelCanvasData));
      }
    }
  }, [data, id, isSuccess]);

  console.log("buildingData", data?.data);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className="">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        {buildingViewStatus.map((item, i) => (
          <StatusCard
            key={i}
            status={item.status}
            from={item.from}
            type={item.type}
            icon={icons[i % icons.length]}
          />
        ))}
      </section>
      <section className="mt-4 flex justify-end">
        <button onClick={handleOpenDeleteModal}>
          <Link to="">
            <DeleteIcon />
          </Link>
        </button>
      </section>
      {deleteModal && (
        <Modal onClose={handleCloseDeleteModal} title="Confirmation">
          <BuildingDeleteWithId
            message="Are you sure you want to delete this building?"
            onClose={handleCloseDeleteModal}
          />{" "}
        </Modal>
      )}

      <section className="grid grid-cols-12 gap-4 mt-4 ">
        <div className="col-span-12 xl:col-span-8 flex flex-col">
          <div className="grid grid-cols-1">
            <section className="rounded-[16px] p-5 bg-white shadow-dashboard">
              <ShowCanvasData image={previewValue} polygons={polygons} />
            </section>
          </div>
          <div className="grid grid-cols-1 mt-4 rounded-[16px] p-5 bg-white shadow-dashboard">
            <DoubleAreaChart />
          </div>
          <div className="grid grid-cols-1 mt-4 flex-1">
            <SensorDetails />
          </div>
        </div>
        <div className="col-span-12 xl:col-span-4 flex flex-col">
          <div className="grid grid-cols-1">
            <BuildingDetails building={buildingData} />
          </div>
          <div className="grid grid-cols-1 mt-4 rounded-[16px] p-8 bg-white shadow-dashboard">
            <BuildingHumidityChart />
          </div>
          <div className="grid grid-cols-1 mt-4 flex-1">
            <Alerts />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 mt-4">
        <Floors buildingData={buildingData} />
      </section>
    </div>
  );
};

export default BuildingView;
