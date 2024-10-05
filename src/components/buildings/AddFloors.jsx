import React, { useEffect, useState } from "react";
import TextField from "../shared/small/TextField";
import DeleteIcon from "../../assets/svgs/stepper/DeleteIcon";
import EditIcon from "../../assets/svgs/stepper/EditIcon";
import BrowseFile from "../shared/large/BrowseFile";
import Button from "../shared/small/Button";
import Dropdown from "../shared/small/Dropdown";
import AddIcon from "../../assets/svgs/stepper/AddIcon";
import TemperatureIcon from "../../assets/svgs/stepper/TemperatureIcon";
import TvocIcon from "../../assets/svgs/stepper/TvocIcon";
import ToggleButton from "../../components/shared/small/ToggleButton";

// Hardcoded number of floors
const floors = 3;

const AddFloors = ({ setCurrentStep }) => {
  const initialFloors = Array.from({ length: floors }, () => ({
    file: null,
    selectedSensors: [],
    sensorStatus: [],
    floorName: "",
  }));

  const [floorsState, setFloorsState] = useState(initialFloors);

  useEffect(() => {
    console.log("floor data:", floorsState);
  }, [floorsState]);

  // Updates data of a specific floor
  const updateFloorData = (index, newData) => {
    const updatedFloors = [...floorsState];
    updatedFloors[index] = { ...updatedFloors[index], ...newData };
    setFloorsState(updatedFloors);
  };

  // Handle file, sensors, and sensor status updates for individual floors
  const setFileForFloor = (index, file) => updateFloorData(index, { file });
  const sensorSelectHandlerForFloor = (index, sensor) => {
    const updatedSensors = [...floorsState[index].selectedSensors, sensor];
    updateFloorData(index, { selectedSensors: updatedSensors });
  };
  const deleteSensorHandlerForFloor = (index, sensor) => {
    const updatedSensors = floorsState[index].selectedSensors.filter(
      (s) => s.option !== sensor.option
    );
    updateFloorData(index, { selectedSensors: updatedSensors });
  };
  const toggleSensorStatusForFloor = (index, sensorIndex) => {
    const updatedStatus = [...floorsState[index].sensorStatus];
    updatedStatus[sensorIndex] = !updatedStatus[sensorIndex];
    updateFloorData(index, { sensorStatus: updatedStatus });
  };

  // Update floor name
  const setFloorName = (index, name) =>
    updateFloorData(index, { floorName: name });

  return (
    <div>
      {floorsState.map((floor, index) => (
        <Accordion
          key={index}
          title={`Floor ${index + 1}`}
          isOpen={index === 0} // Open first floor by default
        >
          <AddFloor
            file={floor.file}
            selectedSensors={floor.selectedSensors}
            sensorStatus={floor.sensorStatus}
            setFile={(file) => setFileForFloor(index, file)}
            sensorSelectHandler={(sensor) =>
              sensorSelectHandlerForFloor(index, sensor)
            }
            deleteSensorHandler={(sensor) =>
              deleteSensorHandlerForFloor(index, sensor)
            }
            statusToggleHandler={(sensorIndex) =>
              toggleSensorStatusForFloor(index, sensorIndex)
            }
            setFloorName={(name) => setFloorName(index, name)}
            floorName={floor.floorName}
          />
        </Accordion>
      ))}
      <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            text="Back"
            width="w-[128px]"
            bg="bg-[#9caabe]"
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          />
          <Button type="Add Building" text="Next" width="w-[128px]" />
        </div>
    </div>
  );
};

export default AddFloors;

// Reusing your AddFloor Component
const AddFloor = ({
  selectedSensors,
  sensorStatus,
  setFile,
  sensorSelectHandler,
  statusToggleHandler,
  deleteSensorHandler,
  setFloorName,
  floorName,
}) => {
  const [twoDModal,setTwoDModal]=useState()
  const [twoDModalPreview,setTwoDModalPreview]=useState()
  return (
    <div>
      <h3 className="text-sm font-semibold text-[rgba(6,6,6,0.8)]">
        Add Floors
      </h3>
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-4">
        <div className="lg:col-span-6">
          <TextField
            type="text"
            placeholder="Floor Name"
            value={floorName}
            onChange={(e) => setFloorName(e.target.value)}
          />
        </div>
        <div className="lg:col-span-6">
          <Dropdown
            defaultText="Rooms"
            options={[
              { option: "Room 1" },
              { option: "Room 2" },
              { option: "Room 3" },
            ]}
          />
        </div>
      </form>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">
          Upload 2D Model Of Floor
        </h3>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <EditIcon />
          </div>
          <div className="cursor-pointer">
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div className="my-4">
        <BrowseFile previewValue={twoDModalPreview} setPreviewValue={setTwoDModalPreview} setFile={setTwoDModal} />
      </div>
      <div>
        <Dropdown
          defaultText="Add Sensor"
          options={[
            {
              option: "Temperature",
              icon: <TemperatureIcon />,
              value: "temperature",
            },
            { option: "TVOC", icon: <TvocIcon />, value: "tvoc" },
          ]}
          icon={<AddIcon />}
          onSelect={sensorSelectHandler}
        />
      </div>

      {/* Sensors list */}
      <div className="my-4">
        {selectedSensors.length > 0 ? (
          <ul className="space-y-2">
            {selectedSensors.map((sensor, sensorIndex) => (
              <li
                key={sensorIndex}
                className="flex justify-between items-center border border-primary-lightBlue h-[55px] p-4 rounded-xl bg-[#b2e7fa99]"
              >
                <div className="flex items-center gap-2">
                  <div>{sensor.icon}</div>
                  <span className="text-[#0a87b5] text-sm md:text-base font-semibold">
                    {sensor.option}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ToggleButton
                    isChecked={sensorStatus[sensorIndex] || false}
                    onToggle={() => statusToggleHandler(sensorIndex)}
                  />
                  <button
                    type="button"
                    onClick={() => deleteSensorHandler(sensor)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sensors added yet.</p>
        )}
      </div>
    </div>
  );
};

// Accordion Component (basic structure)
const Accordion = ({ title, isOpen, children }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className="mb-4">
      <button
        className="w-full text-left px-4 py-3 font-semibold bg-[#b1e9ff] border border-primary-lightBlue rounded-lg"
        onClick={() => setOpen(!open)}
      >
        {title}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
};
