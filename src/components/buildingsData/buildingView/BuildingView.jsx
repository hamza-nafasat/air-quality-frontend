import React, { useState } from "react";
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

const icons = [
  <AlarmsIcon />,
  <TemperatureIcon />,
  <EquipmentIcon />,
  <EnergyIcon />,

  <Co2Icon />,

  <OccupancyIcon />,
];

const BuildingView = () => {
  const { id } = useParams();
  const user = buildings.find((user) => user.id === id);
  // console.log("user", user);

  const [deleteModal, setDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  return (
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
            <section className="rounded-lg  ">
              <img
                src={polygonBuilding}
                alt="Description"
                className="max-w-full max-h-full object-cover"
              />
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
            <BuildingDetails />
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
        <Floors />
      </section>
    </div>
  );
};

export default BuildingView;
