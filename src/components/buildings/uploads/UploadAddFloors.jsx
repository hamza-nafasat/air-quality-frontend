/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
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
  handleUpdateMode,
  updateSensorAttached,
} from "../../globalUtils/uploadFeatures";
import TextField from "../../shared/small/TextField";
import Modal from "../../shared/modal/Modal";
import Dropdown from "../../shared/small/Dropdown";
import { FaDrawPolygon } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { LiaDrawPolygonSolid } from "react-icons/lia";

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
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [draggedPolygon, setDraggedPolygon] = useState(null);
  const [draggingPolygon, setDraggingPolygon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  // Modal Open of Sensor Add

  const [sensorPopup, setSensorPopup] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [sensorIdInput, setSensorIdInput] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("No sensor");

  const openSensorPopup = (polygon) => {
    setSelectedPolygon(polygon);
    setSensorPopup(true);
    setSensorIdInput("");
  };
  // -----

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCancelPolygon = () => {
    setSensorPopup(false);
    setPolygons((prevPolygons) =>
      prevPolygons.filter((polygon) => polygon.id !== selectedPolygon?.id)
    );
    setCurrentPolygon([]);
    setSelectedPolygon(null);
  };
  const sensorInfoSubmitHandler = () => {
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
  };

  // Modal Update Handler
  const sensorInfoUpdateHandler = () => {
    setPolygons((prevPolygons) =>
      prevPolygons.map((polygon) =>
        polygon.id === selectedPolygon.id
          ? {
              ...polygon,
              id: selectedPolygonId,
              sensorAttached: selectedPolygonSensor || selectedSensor,
            }
          : polygon
      )
    );
    setReEditModalOpen(false);
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

  const [reEditModalOpen, setReEditModalOpen] = useState(false);
  const [selectedPolygonId, setSelectedPolygonId] = useState("");
  const [selectedPolygonSensor, setSelectedPolygonSensor] = useState("");

  // Function to open modal with polygon ID
  const handlePolygonClick = (polygonId, polygonSensor) => {
    const polygonToEdit = polygons.find((polygon) => polygon.id === polygonId);
    setSelectedPolygon(polygonToEdit); // Set the entire polygon object to selectedPolygon
    setSelectedPolygonId(polygonId);
    setSelectedPolygonSensor(polygonSensor);
    setReEditModalOpen(true);
  };

  // Re-Edit Polygon
  const handleReEditPolygon = (x, y) => {
    const canvas = canvasRef.current;
    const clickedPolygon = polygons.find((polygon) => {
      const path = new Path2D();
      path.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => path.lineTo(point.x, point.y));
      path.closePath();
      return canvas.getContext("2d").isPointInPath(path, x, y);
    });
    if (clickedPolygon) {
      handlePolygonClick(clickedPolygon.id, clickedPolygon.sensorAttached);
    }
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
            isUpdateMode,
            currentPolygon,
            setCurrentPolygon,
            openSensorPopup,
            handleReEditPolygon,
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
                setIsUpdateMode(false);
              }}
              className={`p-2 border rounded-md text-white ${
                isEditMode ? "border-primary-lightBlue" : "border-[#565656]"
              }`}
            >
              <LiaDrawPolygonSolid
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
                  setIsUpdateMode,
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
                handleUpdateMode({
                  setIsCopyMode,
                  setIsEditMode,
                  setIsMoveMode,
                  setIsDeleteMode,
                  setIsUpdateMode,
                  setDraggedPolygon,
                  isCopyMode,
                })
              }
              className={`p-2 border rounded-md text-white ${
                isUpdateMode ? "border-primary-lightBlue" : "border-[#565656]"
              }`}
            >
              <RiEditBoxFill
                fontSize={20}
                color={isUpdateMode ? "rgba(3, 165, 224, 1)" : "#565656"}
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
                  setIsUpdateMode,
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
                  setIsUpdateMode,
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
        </>
      )}
      {sensorPopup && selectedPolygon && (
        <Modal
          title="Add Sensor"
          isCrossShow={false}
          onClose={() => setSensorPopup(false)}
        >
          <div className="flex flex-col gap-2">
            <TextField
              type="text"
              placeholder="Sensor Id"
              label="Sensor Id"
              value={sensorIdInput}
              onChange={(e) => setSensorIdInput(e.target.value)}
            />
            <Dropdown
              defaultText={selectedSensor}
              options={[
                { option: "Sensor 1", value: "sensor-1" },
                { option: "Sensor 2", value: "sensor-2" },
              ]}
              label="Sensor Name"
              // onChange={(e) => setSelectedSensor(e.target.value)}
              onSelect={(selectedOption) =>
                setSelectedSensor(selectedOption.value)
              }
            />

            <div className="flex justify-center gap-3">
              <Button
                text="Add"
                width="w-fit"
                onClick={() => {
                  sensorInfoSubmitHandler();
                  setSensorPopup(false);
                }}
              />
              <Button
                width="w-fit"
                text="cancel"
                onClick={handleCancelPolygon}
              />
            </div>
          </div>
        </Modal>
      )}
      {reEditModalOpen && (
        <Modal title="Add Sensor" onClose={() => setReEditModalOpen(false)}>
          <div className="flex flex-col gap-2">
            <TextField
              type="text"
              placeholder="Sensor Id"
              label="Sensor Id"
              value={selectedPolygonId}
              onChange={(e) => setSelectedPolygonId(e.target.value)}
            />
            <Dropdown
              defaultText={selectedPolygonSensor || selectedSensor}
              options={[
                { option: "No sensor", value: "no-sensor" },
                { option: "Sensor 1", value: "sensor-1" },
                { option: "Sensor 2", value: "sensor-2" },
              ]}
              label="Sensor Name"
              // onChange={(e) => setSelectedSensor(e.target.value)}
              onSelect={(selectedOption) =>
                setSelectedPolygonSensor(selectedOption.value)
              }
            />

            <div className="flex justify-center">
              <Button
                text="Update"
                width="w-fit"
                onClick={sensorInfoUpdateHandler}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UploadAddFloors;

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
