/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { CiEdit } from "react-icons/ci";
import { VscCopy } from "react-icons/vsc";
import { SlCursorMove } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";
import { CiExport } from "react-icons/ci";
import { getCroppedImg, sensors } from "../utils/addBuildingFeature";
import Button from "../../shared/small/Button";
import {
  drawCanvas,
  exportSVG,
  handleCanvasClick,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCopyMode,
  handleDeleteMode,
  handleImageUpload,
  handleMoveMode,
  updateSensorAttached,
} from "../../globalUtils/uploadFeatures";
import TextField from "../../shared/small/TextField";
import Modal from "../../shared/modal/Modal";
import Dropdown from "../../shared/small/Dropdown";

const UploadAddFloors = () => {
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState(null);
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [polygonCount, setPolygonCount] = useState(1);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [isMoveMode, setIsMoveMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [draggedPolygon, setDraggedPolygon] = useState(null);
  const [draggingPolygon, setDraggingPolygon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sensorModal, setSensorModal] = useState(false);
  // Modal Open of Sensor Add

  const [sensorPopup, setSensorPopup] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [sensorIdInput, setSensorIdInput] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("");

  const openSensorPopup = (polygon) => {
    setSelectedPolygon(polygon);
    setSensorPopup(true);
    setSensorIdInput("");
  };
  // -----
  const sensorModalHandler = () => setSensorModal(true);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const img = new Image();
      img.src = croppedImage;
      img.onload = () => setImage(img);
      setShowCropper(false);
    } catch (error) {
      console.error("Crop failed:", error);
    }
  };

  // Enable Polygon Copying
  const handlePolygonCopy = (event) => {
    if (!isCopyMode) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const selectedPolygon = polygons.find((polygon) => {
      const path = new Path2D();
      path.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => path.lineTo(point.x, point.y));
      path.closePath();

      return canvas.getContext("2d").isPointInPath(path, x, y);
    });

    if (selectedPolygon) {
      setDraggedPolygon(selectedPolygon);
    }
  };

  // Delete polygon
  const handleDeletePolygon = (x, y) => {
    const canvas = canvasRef.current;
    const updatedPolygons = polygons.filter((polygon) => {
      const path = new Path2D();
      path.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => path.lineTo(point.x, point.y));
      path.closePath();

      return !canvas.getContext("2d").isPointInPath(path, x, y);
    });
    setPolygons(updatedPolygons);
  };

  useEffect(() => {
    if (isDrawingEnabled && canvasRef.current) {
      drawCanvas({
        canvasRef,
        isDrawingEnabled,
        image,
        polygons,
        currentPolygon,
      });
    }
  }, [image, polygons, currentPolygon, canvasRef]);

  return (
    <div className="relative">
      {!isDrawingEnabled && (
        <BrowseFileBtn
          onFileChange={(event) =>
            handleImageUpload(
              event,
              setImageSrc,
              setShowCropper,
              setIsDrawingEnabled
            )
          }
        />
      )}
      {sensorPopup && selectedPolygon && (
        <Modal title="Add Sensor" onClose={() => setSensorPopup(false)}>
          <div className="flex flex-col gap-2">
            <TextField
              type="text"
              placeholder="Sensor Id"
              label="Sensor Id"
              value={sensorIdInput}
              onChange={(e) => setSensorIdInput(e.target.value)}
            />
            <Dropdown
              options={[
                { option: "Sensor 1", value: "sensor-1" },
                { option: "Sensor 2", value: "sensor-2" },
              ]}
              label="Sensor Name"
              onChange={(e) => setSelectedSensor(e.target.value)}
            />
            <div className="flex justify-center">
              <Button
                text="Add"
                width="w-fit"
                onClick={() => {
                  if (sensorIdInput) {
                    updateSensorAttached({
                      polygonId: selectedPolygon.id,
                      sensor: sensorIdInput,
                      sensorAttached: selectedSensor,
                      polygons,
                      setPolygons,
                    });
                    setSensorPopup(false);
                  }
                }}
              />
            </div>
          </div>
        </Modal>
      )}

      <canvas
        width={800}
        height={500}
        ref={canvasRef}
        className="border border-primary-lightBlue border-dashed bg-[#03a5e010] rounded-lg"
        onClick={(event) =>
          handleCanvasClick({
            event,
            canvasRef,
            isDeleteMode,
            handleDeletePolygon,
            isCopyMode,
            draggedPolygon,
            polygonCount,
            polygons,
            setPolygons,
            setPolygonCount,
            setDraggedPolygon,
            isEditMode,
            currentPolygon,
            setCurrentPolygon,
            openSensorPopup,
          })
        }
        onMouseDown={(event) =>
          handleCanvasMouseDown({
            event,
            isMoveMode,
            canvasRef,
            polygons,
            setDraggingPolygon,
            setDragOffset,
          })
        }
        onMouseMove={(event) =>
          handleCanvasMouseMove({
            event,
            isCopyMode,
            handlePolygonCopy,
            draggingPolygon,
            canvasRef,
            polygons,
            dragOffset,
            setPolygons,
          })
        }
        onMouseUp={() => handleCanvasMouseUp({ setDraggingPolygon })}
      />

      {showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-3/4 max-w-lg">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={8 / 5}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <div className="flex items-center gap-2 mt-4 z-[999] absolute bottom-6 right-6">
              <button
                onClick={() => setShowCropper(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCropConfirm}
                className="bg-primary-lightBlue text-white px-4 py-2 rounded"
              >
                Crop
              </button>
            </div>
          </div>
        </div>
      )}
      {isDrawingEnabled && (
        <>
          <div className="flex flex-col items-center gap-4 absolute top-0 right-[-6%]">
            <button
              onClick={() => {
                setIsEditMode(!isEditMode);
                setIsCopyMode(false);
                setIsMoveMode(false);
                setIsDeleteMode(false);
              }}
              className={`p-2 border rounded-md text-white ${
                isEditMode ? "border-primary-lightBlue" : "border-[#565656]"
              }`}
            >
              <CiEdit
                fontSize={20}
                color={isEditMode ? "rgba(3, 165, 224, 1)" : "#565656"}
              />
            </button>
            <button
              onClick={() =>
                handleCopyMode({
                  setIsCopyMode,
                  setIsEditMode,
                  setIsMoveMode,
                  setIsDeleteMode,
                  setDraggedPolygon,
                  isCopyMode,
                })
              }
              className={`p-2 border rounded-md text-white ${
                isCopyMode ? "border-primary-lightBlue" : "border-[#565656]"
              }`}
            >
              <VscCopy
                fontSize={20}
                color={isCopyMode ? "rgba(3, 165, 224, 1)" : "#565656"}
              />
            </button>
            <button
              onClick={() =>
                handleMoveMode({
                  setIsMoveMode,
                  setIsEditMode,
                  setIsCopyMode,
                  setIsDeleteMode,
                  isMoveMode,
                  setDraggingPolygon,
                })
              }
              className={`p-2 border rounded-md text-white ${
                isMoveMode ? "border-primary-lightBlue" : "border-[#565656]"
              }`}
            >
              <SlCursorMove
                fontSize={20}
                color={isMoveMode ? "rgba(3, 165, 224, 1)" : "#565656"}
              />
            </button>
            <button
              onClick={() =>
                handleDeleteMode({
                  setIsDeleteMode,
                  isDeleteMode,
                  setIsEditMode,
                  setIsCopyMode,
                  setIsMoveMode,
                })
              }
              className={`p-2 border rounded-md text-white ${
                isDeleteMode ? "border-primary-lightBlue" : "border-[#565656]"
              }`}
            >
              <AiOutlineDelete
                fontSize={20}
                color={isDeleteMode ? "rgba(3, 165, 224, 1)" : "#565656"}
              />
            </button>
            <button
              className="border rounded-md border-[#565656] hover:border-primary-lightBlue p-2"
              onClick={() => exportSVG({ canvasRef, image, polygons })}
            >
              <CiExport />
            </button>
          </div>
          <button
            className="absolute top-5 left-5 bg-primary-lightBlue px-3 py-[6px] rounded-md text-white text-sm font-bold"
            onClick={sensorModalHandler}
          >
            Add Sensor
          </button>
          {/* sensor modal */}
          {sensorModal && (
            <SensorModal
              setSensorModal={setSensorModal}
              polygons={polygons}
              sensors={sensors}
              onUpdateSensor={() =>
                updateSensorAttached({
                  polygons,
                  setPolygons,
                })
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default UploadAddFloors;

const SensorModal = ({ setSensorModal, polygons, sensors, onUpdateSensor }) => {
  const [selectedSensors, setSelectedSensors] = useState({});

  const sensorSelectHandler = (polygonId, sensor) => {
    setSelectedSensors({ ...selectedSensors, [polygonId]: sensor });
    onUpdateSensor(polygonId, sensor);
  };
  console.log("selectedSensors", selectedSensors);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px]">
      <h6 className="text-sm font-medium text-[#414141] text-center">
        Add Sensor
      </h6>
      <div className="my-6 h-[200px] overflow-y-scroll custom-scroll">
        {polygons?.map((polygon, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 mb-2">
            <h6 className="px-4 h-[45px] flex items-center border rounded-md text-xs text-[#414141]">
              {polygon?.id}
            </h6>
            <select
              name="sensors"
              className="outline-none border rounded-md px-2 text-xs text-[#414141]"
              onChange={(e) => sensorSelectHandler(polygon?.id, e.target.value)}
            >
              <option>Select Sensor</option>
              {sensors?.map((sensor, i) => (
                <option key={i} value={sensor?.value}>
                  {sensor?.option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          text="Cancel"
          width="w-20 sm:w-[85px]"
          bg="bg-white hover:bg-primary-lightBlue hover:text-white"
          color="text-primary"
          onClick={() => setSensorModal(false)}
        />
        <Button
          text="Save"
          width="w-20 sm:w-[85px]"
          onClick={() => setSensorModal(false)}
        />
      </div>
    </div>
  );
};

const BrowseFileBtn = ({ onFileChange }) => {
  return (
    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 cursor-pointer rounded-lg bg-primary-lightBlue text-white font-semibold">
      Browse File
      <input
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onFileChange}
      />
    </button>
  );
};
