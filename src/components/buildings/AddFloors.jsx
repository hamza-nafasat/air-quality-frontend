import React, { useState } from "react";
import TextField from "../shared/small/TextField";
import DeleteIcon from "../../assets/svgs/stepper/DeleteIcon";
import EditIcon from "../../assets/svgs/stepper/EditIcon";
import BrowseFile from "../shared/large/BrowseFile";
import Button from "../shared/small/Button";
import Dropdown from "../shared/small/Dropdown";
import AddIcon from "../../assets/svgs/stepper/AddIcon";
import TemperatureIcon from "../../assets/svgs/stepper/TemperatureIcon";
import HumidityIcon from "../../assets/svgs/stepper/HumidityIcon";
import TvocIcon from "../../assets/svgs/stepper/TvocIcon";
import ToggleButton from "../../components/shared/small/ToggleButton";

const AddFloors = ({ setCurrentStep }) => {
  const [file, setFile] = useState(null);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [sensorStatus, setSensorStatus] = useState([])

  const statusToggleHandler = (id) => {
    const updatedStatus = [...sensorStatus];
    updatedStatus[id] = !updatedStatus[id];
    setSensorStatus(updatedStatus)
  }

  const sensorSelectHandler = (option) => {
    if (!selectedSensors.find((sensor) => sensor.option === option.option)) {
      setSelectedSensors([...selectedSensors, option]);
    }
  };

  const deleteSensorHandler = (option) => {
    setSelectedSensors(
      selectedSensors.filter((sensor) => sensor.option !== option.option)
    );
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-[rgba(6,6,6,0.8)]">
        Add Floors
      </h3>
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-4">
        <div className="lg:col-span-6">
          <TextField type="number" placeholder="Floor Name" />
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
        <BrowseFile setFile={setFile} />
      </div>
      <div>
        <Dropdown
          defaultText="Add Sensor"
          options={[
            { option: "Temperature", icon: <TemperatureIcon /> },
            { option: "Humidity", icon: <HumidityIcon /> },
            { option: "TVOC", icon: <TvocIcon /> },
          ]}
          icon={<AddIcon />}
          onSelect={sensorSelectHandler}
        />
      </div>
      {/* sensors list */}
      <div className="my-4">
        {/* show list here */}
        {selectedSensors.length > 0 ? (
          <ul className="space-y-2">
            {selectedSensors.map((sensor, index) => (
              <li
                key={index}
                className="flex justify-between items-center border border-primary-lightBlue h-[55px] p-4 rounded-xl bg-[#b2e7fa99]"
              >
                <div className="flex items-center gap-2">
                  <div>{sensor.icon}</div>
                  <span className="text-[#0a87b5] text-sm md:text-base font-semibold">
                    {sensor.option}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ToggleButton isChecked={sensorStatus[index] || false} onToggle={() => statusToggleHandler(index)} />
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
      <div className="lg:col-span-12 flex justify-end">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            text="Back"
            width="w-[128px]"
            bg="bg-[#9caabe]"
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          />
          <Button type="button" text="Next" width="w-[128px]" />
        </div>
      </div>
    </div>
  );
};

export default AddFloors;
