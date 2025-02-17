/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "../../assets/svgs/stepper/AddIcon";
import DeleteIcon from "../../assets/svgs/stepper/DeleteIcon";
import EditIcon from "../../assets/svgs/stepper/EditIcon";
import TemperatureIcon from "../../assets/svgs/stepper/TemperatureIcon";
import TvocIcon from "../../assets/svgs/stepper/TvocIcon";
import {
  useCreateBuildingMutation,
  useDeleteSingleBuildingMutation,
  useUpdateSingleBuildingMutation,
} from "../../redux/apis/buildingApis";
import { useCreateFloorMutation } from "../../redux/apis/floorApis";
import { useGetAllSensorsQuery } from "../../redux/apis/sensorApis";
import BrowseFile from "../shared/large/BrowseFile";
import Button from "../shared/small/Button";
import Dropdown from "../shared/small/Dropdown";
import TextField from "../shared/small/TextField";
import { removeBuildingData } from "../../redux/slices/buildingSlice";
import UploadAddFloors from "./uploads/UploadAddFloors";

const AddFloors = ({ setCurrentStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addBuilding, { isLoading: isAddBuilding }] =
    useCreateBuildingMutation("");
  const [deleteBuilding, { isLoading: isDeleteBuilding }] =
    useDeleteSingleBuildingMutation("");
  const [updateBuilding, { isLoading: isUpdateBuilding }] =
    useUpdateSingleBuildingMutation("");
  const [addFloor, { isLoading: isAddFloor }] = useCreateFloorMutation();
  const { buildingData } = useSelector((state) => state.building);
  const { data, isSuccess } = useGetAllSensorsQuery("");
  const [floorsCount, setFloorsCount] = useState([{}]);
  const [floorsState, setFloorsState] = useState([]);
  const [sensorsOptions, setSensorsOptions] = useState([
    { option: "", value: "", icon: "" },
  ]);
  const [accordionState, setAccordionState] = useState([]);
  const [buildingId, setBuildingId] = useState("");

  // Toggle specific accordion
  const toggleAccordion = (index) => {
    setAccordionState((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  const openNextAccordion = (index) =>
    setAccordionState((prev) =>
      prev.map((isOpen, i) => (i === index + 1 ? true : false))
    );

  // Check if all floors are filled to enable the Next button
  const allFloorsFilled =
    floorsState.length === floorsCount.length &&
    floorsState.every(
      (floor) =>
        floor.floorName &&
        floor.roomsCount &&
        floor.twoDModal &&
        floor.selectedSensors?.length &&
        floor.twoDModelCoordinates?.length
    );

  const mainSaveHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", buildingData?.name);
      formData.append("type", buildingData?.type);
      formData.append("area", buildingData?.area);
      formData.append("address", buildingData?.address);
      formData.append("position", buildingData?.position);
      formData.append("thumbnail", buildingData?.thumbnail);
      formData.append("2dModel", buildingData?.twoDModel);
      formData.append(
        "twoDModelCanvasData",
        JSON.stringify(buildingData?.twoDModelCoordinates)
      );
      const addBuildingResponse = await addBuilding(formData).unwrap();

      if (addBuildingResponse?.success) {
        const buildingId = addBuildingResponse?.buildingId;
        setBuildingId(String(buildingId));
        const floorPromises = [];
        for (let i = 0; i < floorsState.length; i++) {
          const floor = floorsState[i];
          if (
            !floor?.floorName ||
            !floor?.roomsCount ||
            !floor?.twoDModal ||
            !floor?.twoDModelCoordinates ||
            !floor?.selectedSensors?.length
          ) {
            return toast.error("Please Enter all Fields to Save");
          }
          let sensors = "";
          floor?.selectedSensors?.forEach((sensor) => {
            sensors += `${sensor?.value},`;
          });
          const formData = new FormData();
          formData.append("name", floor?.floorName);
          formData.append("rooms", floor?.roomsCount);
          formData.append("file", floor?.twoDModal);
          formData.append("sensors", sensors);
          formData.append(
            "twoDModelCanvasData",
            JSON.stringify(floor.twoDModelCoordinates)
          );
          formData.append("buildingId", buildingId);
          floorPromises.push(addFloor(formData).unwrap());
        }
        const floors = await Promise.all(floorPromises);
        if (floors?.every((floor) => floor?.success)) {
          let floorsIds = "";
          floors.forEach((floor) => {
            floorsIds += `${floor?.data?._id},`;
          });
          const updateBuildingResponse = await updateBuilding({
            buildingId,
            data: { floors: floorsIds },
          }).unwrap();
          console.log("update building response", updateBuildingResponse);
        }
      } else {
        await deleteBuilding(buildingId);
      }
      toast.success("Your Building and its floors created successfully");
      dispatch(removeBuildingData());
      return navigate(`/dashboard/buildings`);
    } catch (error) {
      console.log("error while creating building", error);
      toast.error(error?.data?.message || "Error while creating building");
      await deleteBuilding(buildingId);
    }
  };

  useEffect(() => {
    if (buildingData?.floorsCount) {
      const length = Number(buildingData?.floorsCount);
      const floorsCounts = [{}];
      for (let i = 0; i < length - 1; i++) {
        floorsCounts.push({});
      }
      setFloorsCount(floorsCounts);
      // Initialize accordion state for each floor
      setAccordionState(Array(length).fill(false));
    }
  }, [buildingData]);

  useEffect(() => {
    if (isSuccess && data?.data?.length) {
      const sensorsOptions = [];
      data?.data?.forEach((sensor) => {
        if (!sensor?.isConnected) {
          sensorsOptions.push({
            option: sensor?.name,
            value: sensor?._id,
            icon: sensor?.type === "tvoc" ? <TvocIcon /> : <TemperatureIcon />,
          });
        }
      });
      setSensorsOptions(sensorsOptions);
    }
  }, [data, isSuccess]);

  return (
    <div>
      {floorsCount.map((floor, i) => (
        <Accordion
          key={i}
          title={`Floor ${i + 1}`}
          isOpen={accordionState[i]}
          toggleAccordion={() => toggleAccordion(i)}
        >
          <AddFloor
            floorsState={floorsState}
            setFloorsState={setFloorsState}
            floorIndex={i}
            sensorsOptions={sensorsOptions}
            setSensorsOptions={setSensorsOptions}
            openNextAccordion={() => openNextAccordion(i)}
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
        <Button
          type="button"
          text="Add Building"
          width="w-[128px]"
          onClick={mainSaveHandler}
          disabled={
            !allFloorsFilled ||
            isAddBuilding ||
            isAddFloor ||
            isUpdateBuilding ||
            isDeleteBuilding
          }
        />
      </div>
    </div>
  );
};

export default AddFloors;

// Reusing your AddFloor Component
const AddFloor = ({
  floorsState,
  setFloorsState,
  floorIndex,
  sensorsOptions,
  setSensorsOptions,
  openNextAccordion,
}) => {
  const [twoDModal, setTwoDModal] = useState();
  const [twoDModalPreview, setTwoDModalPreview] = useState();
  const [floorName, setFloorName] = useState("");
  const [roomsCount, setRoomsCount] = useState(1);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [twoDModelCoordinates, setTwoDModelCoordinates] = useState([]);

  const deleteSensorHandler = (value) => {
    setSelectedSensors(selectedSensors.filter((sensor) => sensor !== value));
    setSensorsOptions([...sensorsOptions, value]);
  };

  const selectSensorHandler = (value) => {
    setSensorsOptions(
      sensorsOptions.filter((sensor) => sensor?.value !== value?.value)
    );
    setSelectedSensors([...selectedSensors, value]);
  };

  const saveStateHandler = () => {
    if (
      !floorName ||
      !roomsCount ||
      !twoDModal ||
      !twoDModalPreview ||
      !twoDModelCoordinates ||
      selectedSensors?.length === 0
    ) {
      console.log(
        "Please Enter all Fields to Save",
        floorName,
        roomsCount,
        twoDModal,
        twoDModalPreview,
        twoDModelCoordinates,
        selectedSensors
      );
      return toast.error("Please Enter all Fields to Save");
    }

    // Save floor data into the floorsState
    const newFloorState = [...floorsState];
    newFloorState[floorIndex] = {
      floorName,
      roomsCount,
      twoDModal,
      twoDModalPreview,
      selectedSensors,
      twoDModelCoordinates,
    };
    setFloorsState(newFloorState);

    // Open the next accordion
    openNextAccordion();
  };

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
          <TextField
            type="text"
            placeholder="Rooms Count"
            value={roomsCount}
            onChange={(e) => setRoomsCount(e.target.value)}
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
      <div className="my-4 flex justify-center">
        <UploadAddFloors
          setFile={setTwoDModal}
          previewValue={twoDModalPreview}
          setPreviewValue={setTwoDModalPreview}
          polygons={twoDModelCoordinates}
          setPolygons={setTwoDModelCoordinates}
        />
      </div>
      <div>
        <Dropdown
          defaultText="Add Sensor"
          options={sensorsOptions}
          icon={<AddIcon />}
          onSelect={(value) => selectSensorHandler(value)}
        />
      </div>

      {/* Sensors list */}
      <div className="my-4">
        {selectedSensors?.length > 0 ? (
          <ul className="space-y-2">
            {selectedSensors?.map((sensor, sensorIndex) => (
              <li
                key={sensorIndex}
                className="flex justify-between items-center border border-primary-lightBlue h-[55px] p-4 rounded-xl bg-[#b2e7fa99]"
              >
                <div className="flex items-center gap-2">
                  <div>{sensor?.icon}</div>
                  <span className="text-[#0a87b5] text-sm md:text-base font-semibold">
                    {sensor?.option}
                  </span>
                </div>
                <div className="flex items-center gap-2">
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

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          text="Save"
          width="w-[128px]"
          onClick={saveStateHandler}
        />
      </div>
    </div>
  );
};

// Accordion Component (basic structure)
const Accordion = ({ title, isOpen, toggleAccordion, children }) => {
  return (
    <div className="mb-4">
      <button
        className="w-full text-left px-4 py-3 font-semibold bg-[#b1e9ff] border border-primary-lightBlue rounded-lg"
        onClick={toggleAccordion} // Toggle open/close
      >
        {title}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};
