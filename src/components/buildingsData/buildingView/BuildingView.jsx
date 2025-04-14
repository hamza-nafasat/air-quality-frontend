/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import AlarmsIcon from "../../../assets/svgs/dashboard/AlarmsIcon";
import Co2Icon from "../../../assets/svgs/dashboard/Co2Icon";
import { buildingViewStatus } from "../../../data/data";
import StatusCard from "../../shared/large/card/StatusCard";

import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EnergyIcon from "../../../assets/svgs/dashboard/EnergyIcon";
import EquipmentIcon from "../../../assets/svgs/dashboard/EquipmentIcon";
import OccupancyIcon from "../../../assets/svgs/dashboard/OccupancyIcon";
import TemperatureIcon from "../../../assets/svgs/dashboard/TemperatureIcon";
import DeleteIcon from "../../../assets/svgs/pages/DeleteIcon";
import EditIcon from "../../../assets/svgs/stepper/EditIcon";
import { useDeleteSingleBuildingMutation, useGetSingleBuildingQuery } from "../../../redux/apis/buildingApis";
import { useGetAllFloorQuery } from "../../../redux/apis/floorApis";
import DoubleAreaChart from "../../charts/areaChart/DoubleAreaChart";
import BuildingDeleteWithId from "../../shared/large/modal/BuildingDeleteWithId";
import Modal from "../../shared/large/modal/Modal";
import Loader from "../../shared/small/Loader";
import Floors from "../floorView/components/Floors";
import Alerts from "./components/Alerts";
import BuildingDetails from "./components/BuildingDetails";
import BuildingHumidityChart from "./components/BuildingHumidityChart";
import SensorDetails from "./components/SensorDetails";
import { FaPlus } from "react-icons/fa";
import AddIcon from "../../../assets/svgs/pages/AddIcon";

const icons = [<AlarmsIcon />, <TemperatureIcon />, <EquipmentIcon />, <EnergyIcon />, <Co2Icon />, <OccupancyIcon />];

const BuildingView = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [buildingData, setBuildingData] = useState({});
  const { data, isSuccess, isLoading } = useGetSingleBuildingQuery(id);
  const { data: floors } = useGetAllFloorQuery(id);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteBuilding] = useDeleteSingleBuildingMutation("");

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
          type: building?.type || "",
          area: building?.area || "",
          totalSensors: 0,
        });
      }
    }
  }, [data, id, isSuccess]);

  const handleOpenDeleteModal = () => {
    confirmAlert({
      title: "Delete Building",
      message: "Are you sure, you want to delete this whole Building with all his floors?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if (!id) return toast.error("Error while deleting Building");
            try {
              const res = await deleteBuilding(id).unwrap();
              if (res?.message) toast.success(res.message);
              return Navigate("/dashboard/buildings");
            } catch (error) {
              console.log("Error in deleting building", error);
              toast.error(error?.data?.message || "Error in delete Building");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        {buildingViewStatus.map((item, i) => (
          <StatusCard key={i} status={item.status} from={item.from} type={item.type} icon={icons[i % icons.length]} />
        ))}
      </section>
      <section className="mt-4 flex justify-end">
        <div className="flex items-center gap-4">
          <Link
            className="flex items-center justify-center text-primary-lightBlue mt-[0.5px]"
            title="Add New Floor"
            to={`/dashboard/add-floor/${id}`}
          >
            <AddIcon />
          </Link>
          <Link to={`/dashboard/edit-building/${id}`}>
            <EditIcon />
          </Link>
          <button onClick={handleOpenDeleteModal}>
            <DeleteIcon />
          </button>
        </div>
      </section>
      {deleteModal && (
        <Modal onClose={() => setDeleteModal(false)} title="Confirmation">
          <BuildingDeleteWithId
            message="Are you sure you want to delete this building?"
            onClose={() => setDeleteModal(false)}
          />{" "}
        </Modal>
      )}

      <section className="grid grid-cols-12 gap-4 mt-4 ">
        <div className="col-span-12 xl:col-span-8 flex flex-col">
          <div className="grid grid-cols-1">
            <section className="rounded-[16px] p-5 bg-white shadow-dashboard">
              <img src={buildingData?.thumbnail} className="w-full" alt="Image" />
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
        <Floors floors={floors?.data} />
      </section>
    </div>
  );
};

export default BuildingView;
