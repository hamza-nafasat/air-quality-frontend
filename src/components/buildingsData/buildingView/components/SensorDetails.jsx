import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import DataTable from "react-data-table-component";
import BluePen from "../../../../assets/svgs/dashboard/BluePen";
import GreenEye from "../../../../assets/svgs/dashboard/GreenEye";
import RedBin from "../../../../assets/svgs/dashboard/RedBin";
import ToggleButton from "../../../shared/small/ToggleButton";

const columns = (modalOpenHandler, sensorStatus, statusToggleHandler, deleteHandler) => [
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

const SensorDetails = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [sensorStatus, setSensorStatus] = useState({});

  const modalOpenHandler = (modalType) => setModal(modalType);
  const modalCloseHandler = () => setModal(false);

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
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("project deleted");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  return (
    <div className="bg-white rounded-[15px] shadow-dashboard">
      <div className="flex items-center justify-between">
        <div className="p-5">Sensors Details</div>
      </div>
      <div className="mt-5 h-[300px] overflow-auto custom-scrollbar">
        <DataTable
          columns={columns(modalOpenHandler, sensorStatus, statusToggleHandler, deleteHandler)}
          data={data}
          selectableRows
          selectableRowsHighlight
          customStyles={tableStyles}
          fixedHeader
          fixedHeaderScrollHeight="280px"
        />
      </div>
    </div>
  );
};

export default SensorDetails;

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
