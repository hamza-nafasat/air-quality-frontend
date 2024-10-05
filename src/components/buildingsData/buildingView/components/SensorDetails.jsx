import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ToggleButton from "../../../shared/small/ToggleButton";
import GreenEye from "../../../../assets/svgs/dashboard/GreenEye";
import BluePen from "../../../../assets/svgs/dashboard/BluePen";
import RedBin from "../../../../assets/svgs/dashboard/RedBin";
import { sensorData } from "../../../../data/data";
import { confirmAlert } from "react-confirm-alert";

const columns = (modalOpenHandler, sensorStatus, statusToggleHandler, deleteHandler) => [
  {
    name: "Sensor Name",
    selector: (row) => row.sensorName,
  },
  {
    name: "IP",
    selector: (row) => row.ip,
  },
  {
    name: "URL",
    selector: (row) => row.url,
  },
  {
    name: "Port",
    selector: (row) => row.port,
  },
  {
    name: "Type",
    selector: (row) => row.type,
  },
  {
    name: "Location",
    selector: (row) => row.location,
  },
  {
    name: "Status",
    selector: (row) => (
      <ToggleButton
        isTable={true}
        isChecked={sensorStatus[row._id] || false}
        onToggle={() => statusToggleHandler(row._id)}
      />
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

const SensorDetails = () => {
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
        {/* <div className="flex items-center gap-2">
          <div
            className="cursor-pointer"
            onClick={() => modalOpenHandler("add")}
          >
            <AddIcon />
          </div>
          <div className="cursor-pointer">
            <DeleteIcon />
          </div>
        </div> */}
      </div>
      <div className="mt-5 h-[300px] overflow-auto custom-scrollbar">
        <DataTable
          columns={columns(modalOpenHandler, sensorStatus, statusToggleHandler, deleteHandler)}
          data={sensorData}
          selectableRows
          selectableRowsHighlight
          customStyles={tableStyles}
          fixedHeader
          fixedHeaderScrollHeight="280px" // Adjust the height as needed
        />
      </div>
      {/* {modal === "add" && (
        <Modal
          title="Add Sensor"
          width="w-[300px] md:w-[650px]"
          onClose={modalCloseHandler}
        >
          <AddSensor onClose={modalCloseHandler} />
        </Modal>
      )}
      {modal === "edit" && (
        <Modal
          title="Edit Sensor"
          width="w-[300px] md:w-[650px]"
          onClose={modalCloseHandler}
        >
          <EditSensor onClose={modalCloseHandler} />
        </Modal>
      )} */}
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
