import { useState } from "react";
import DataTable from "react-data-table-component";
import ToggleButton from "../../../shared/small/ToggleButton";
import GreenEye from "../../../../assets/svgs/dashboard/GreenEye";
import BluePen from "../../../../assets/svgs/dashboard/BluePen";
import RedBin from "../../../../assets/svgs/dashboard/RedBin";
import { confirmAlert } from "react-confirm-alert";
import { useGetAllSensorsQuery } from "../../../../redux/apis/sensorApis";

const columns = (modalOpenHandler, sensorStatus, statusToggleHandler) => [
  { name: "Sensor Name", selector: (row) => row.name },
  { name: "Parameters", selector: (row) => row.parameters?.join(", ") },
  { name: "Connected", selector: (row) => (row.isConnected ? "Yes" : "No") },
  {
    name: "Status",
    selector: (row) => (
      <ToggleButton isTable={true} isChecked={row?.status} onToggle={() => statusToggleHandler(row._id)} />
    ),
  },
  {
    name: "Action",
    selector: () => (
      <div className="flex items-center gap-3">
        <div className="cursor-pointer">
          <GreenEye />
        </div>
        <div
          className="cursor-pointer"
          //   onClick={() => modalOpenHandler("edit")}
        >
          <BluePen />
        </div>
        <div
          className="cursor-pointer"
          // onClick={() => deleteHandler()}
        >
          <RedBin />
        </div>
      </div>
    ),
  },
];

const FloorSensorDetails = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [sensorStatus, setSensorStatus] = useState({});

  const modalOpenHandler = (modalType) => setModal(modalType);

  const statusToggleHandler = (sensorId) => {
    setSensorStatus((prevState) => ({
      ...prevState,
      [sensorId]: !prevState[sensorId],
    }));
  };

  const deleteHandler = () => {
    confirmAlert({
      title: "Delete Sensor",
      message: "Are you sure, you want to delete the sensor?",
      buttons: [{ label: "Yes", onClick: () => console.log("project deleted") }, { label: "No" }],
    });
  };
  return (
    <div className="bg-white rounded-[15px]  shadow-dashboard">
      <div className="flex items-center justify-between">
        <div className="p-5">Sensors Details</div>
      </div>
      <div className="mt-5 h-[300px] overflow-auto">
        <DataTable
          columns={columns(modalOpenHandler, sensorStatus, statusToggleHandler, deleteHandler)}
          data={data}
          selectableRows
          selectableRowsHighlight
          customStyles={tableStyles}
          fixedHeader
          fixedHeaderScrollHeight="290px"
        />
      </div>
    </div>
  );
};

export default FloorSensorDetails;

const tableStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 600,
      color: "rgba(17, 17, 17, 1)",
    },
  },
  rows: {
    style: {
      borderRadius: "6px",
      padding: "0 0",
    },
  },
  cells: {
    style: {
      color: "rgba(17, 17, 17, 1)",
      fontSize: "14px",
    },
  },
};
