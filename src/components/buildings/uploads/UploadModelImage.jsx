/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiExport } from 'react-icons/ci';
import { LiaDrawPolygonSolid } from 'react-icons/lia';
import { SlCursorMove } from 'react-icons/sl';
import { VscCopy } from 'react-icons/vsc';
import { useGetAllSensorsQuery } from '../../../redux/apis/sensorApis';
import {
  convertImageSrcToFile,
  drawCanvas,
  exportSVG,
  handleCancelPolygon,
  handleCanvasClick,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCopyMode,
  handleDeleteMode,
  handleDeletePolygon,
  handleImageUpload,
  handleMoveMode,
  handleReEditPolygon,
  polygonsLabelHandler,
  sensorInfoSubmitHandler,
} from '../../globalUtils/uploadFeatures';
import Modal from '../../shared/modal/Modal';
import Button from '../../shared/small/Button';
import Dropdown from '../../shared/small/Dropdown';
import TextField from '../../shared/small/TextField';
import { getCroppedImg } from '../utils/addBuildingFeature';

const UploadModelImage = ({
  setFile,
  previewValue,
  setPreviewValue,
  polygons,
  setPolygons,
  twoDModel,
  selectedSensor,
  setSelectedSensor,
}) => {
  const { data } = useGetAllSensorsQuery();
  const [availableSensors, setAvailableSensors] = useState([]);

  const canvasRef = useRef(null);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState(twoDModel);
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const [polygonCount, setPolygonCount] = useState(1);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [isMoveMode, setIsMoveMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [draggedPolygon, setDraggedPolygon] = useState(null);
  const [draggingPolygon, setDraggingPolygon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sensorPopup, setSensorPopup] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [color, setColor] = useState('#ffff00');
  const [currentSensor, setCurrentSensor] = useState(null);
  const [currentSensorName, setCurrentSensorName] = useState('');
  console.log('selectedPolygon', selectedPolygon);
  console.log('currentSensor', currentSensor);
  console.log('currentPolygon', currentPolygon);
  console.log('roomName', roomName);
  console.log('polygons', polygons);
  console.log('availableSensors', availableSensors);

  useEffect(() => {
    // Guard: run only when the payload is really an array.
    if (!Array.isArray(data?.data)) return;
    // setAvailableSensors(data.data.map(({ _id, name }) => ({ option: name, value: _id })));

    // Build the new array and save it.
    // setAvailableSensors(data.data.map(({ _id, name }) => ({ option: name, value: _id })));
    setAvailableSensors(
      data.data
        .filter((sensor) => sensor.isConnected === false) // only not connected
        .map(({ _id, name }) => ({
          option: name,
          value: _id,
        }))
    );
  }, [data?.data]); // run when the payload itself changes

  const sensorOnSelectHandler = (selectedOption) => {
    setSelectedSensor([...selectedSensor, selectedOption?.value]);
    setCurrentSensor(selectedOption?.value);
    setCurrentSensorName(selectedOption?.option); // store the name
    setAvailableSensors(availableSensors.filter((sensor) => sensor.value !== selectedOption.value));
  };
  const openSensorPopup = (polygon) => {
    setSelectedPolygon(polygon);
    setSensorPopup(true);
    setRoomName('');
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) =>
    setCroppedAreaPixels(croppedAreaPixels);
  const handleCropConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(previewValue, croppedAreaPixels);
      const img = new Image();
      img.src = croppedImage;
      img.onload = () => setImage(img);
      setShowCropper(false);
      const file = await convertImageSrcToFile(croppedImage);
      setFile(file);
    } catch (error) {
      console.error('Crop failed:', error);
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
      return canvas.getContext('2d').isPointInPath(path, x, y);
    });
    if (selectedPolygon) setDraggedPolygon(selectedPolygon);
  };
  // Function to open modal with polygon ID
  const handlePolygonClick = (polygonId) => {
    const polygonToEdit = polygons.find((polygon) => polygon.id === polygonId);
    setSelectedPolygon(polygonToEdit);
  };
  useEffect(() => {
    if (isDrawingEnabled && canvasRef.current) {
      drawCanvas({
        canvasRef,
        isDrawingEnabled,
        image,
        polygons,
        currentPolygon,
        color,
      });
    }
  }, [image, polygons, currentPolygon, canvasRef, color, isDrawingEnabled]);

  useEffect(() => {
    if (previewValue) {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setIsDrawingEnabled(true);
      };
      img.onerror = (err) => console.log('Image failed to load', err);
      img.src = previewValue;
    }
  }, [previewValue]);

  return (
    <div className="relative inline-block">
      {!isDrawingEnabled && (
        <BrowseFileBtn
          onFileChange={(event) =>
            handleImageUpload(event, setPreviewValue, setShowCropper, setIsDrawingEnabled)
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
            handlePolygonClick,
            selectedColor: color,
            setSelectedPolygon,
            setCurrentSensor,
            setSensorPopup,
            selectedSensor,
            setSelectedSensor,
            availableSensors,
            setAvailableSensors,
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
              image={previewValue}
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
                isEditMode ? 'border-primary-lightBlue' : 'border-[#565656]'
              }`}
            >
              <LiaDrawPolygonSolid
                fontSize={20}
                color={isEditMode ? 'rgba(3, 165, 224, 1)' : '#565656'}
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
                isCopyMode ? 'border-primary-lightBlue' : 'border-[#565656]'
              }`}
            >
              <VscCopy fontSize={20} color={isCopyMode ? 'rgba(3, 165, 224, 1)' : '#565656'} />
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
                isMoveMode ? 'border-primary-lightBlue' : 'border-[#565656]'
              }`}
            >
              <SlCursorMove fontSize={20} color={isMoveMode ? 'rgba(3, 165, 224, 1)' : '#565656'} />
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
                isDeleteMode ? 'border-primary-lightBlue' : 'border-[#565656]'
              }`}
            >
              <AiOutlineDelete
                fontSize={20}
                color={isDeleteMode ? 'rgba(3, 165, 224, 1)' : '#565656'}
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
        <Modal title="Add Sensor" isCrossShow={false} onClose={() => setSensorPopup(false)}>
          <div className="flex flex-col gap-2">
            <TextField
              type="text"
              placeholder="Polygon Name"
              label="Polygon Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />

            <Dropdown
              defaultText={'Select Sensor'}
              options={availableSensors}
              label="Sensor Name"
              onSelect={(selectedOption) => sensorOnSelectHandler(selectedOption)}
            />

            <Dropdown
              defaultText={'Top-Left'}
              options={[
                { option: 'Top Left', value: 'first' },
                { option: 'Top Right', value: 'second' },
                { option: 'Bottom Right', value: 'third' },
                { option: 'Bottom Left', value: 'fourth' },
              ]}
              label="Label Positioning of polygon"
              onSelect={(selectedOption) =>
                polygonsLabelHandler(selectedOption, selectedPolygon, polygons, setPolygons)
              }
            />

            <div className="flex items-center gap-4">
              <h1 className="font-bold text-xs">Select Color of Polygon</h1>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>

            <div className="flex justify-center gap-3">
              <Button
                disabled={!roomName}
                text="Add"
                width="w-fit"
                onClick={() => {
                  sensorInfoSubmitHandler(
                    roomName,
                    polygons,
                    selectedPolygon,
                    currentSensor,
                    color,
                    setPolygons,
                    setSensorPopup,
                    setCurrentSensor,
                    currentSensorName // ✅ use state
                  );
                  setSensorPopup(false);
                }}
              />
              <Button
                width="w-fit"
                text="cancel"
                onClick={() =>
                  handleCancelPolygon(
                    setSensorPopup,
                    setPolygons,
                    selectedPolygon,
                    setCurrentPolygon,
                    setSelectedPolygon
                  )
                }
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UploadModelImage;

const BrowseFileBtn = ({ onFileChange }) => {
  return (
    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 cursor-pointer rounded-lg bg-primary-lightBlue text-white font-semibold">
      Browse File
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onFileChange}
      />
    </button>
  );
};
