import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AccordionEditIcon from "../../../assets/svgs/buildings/AccordionEditIcon";
import { useGetSingleFloorQuery, useUpdateSingleFloorMutation } from "../../../redux/apis/floorApis";
import UploadModelImage from "../../buildings/uploads/UploadModelImage";
import Button from "../../shared/small/Button";
import Loader from "../../shared/small/Loader";
import TextField from "../../shared/small/TextField";

function FloorEdit() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleFloorQuery(id);
  const [twoDModelPreview, setTwoDModelPreview] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [floor, setFloor] = useState({ floorName: "", floorRooms: "" });
  const [updateFloor, { isLoading: isUpdatingFloor }] = useUpdateSingleFloorMutation("");
  const [selectedSensor, setSelectedSensor] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const singleFloor = data?.data;
      setFloor({ floorName: singleFloor?.name || "", floorRooms: singleFloor?.rooms || "" });
      setTwoDModelPreview(singleFloor?.twoDModel?.url);
      setPolygons(singleFloor?.twoDModelCanvasData ? JSON.parse(singleFloor?.twoDModelCanvasData) : []);
    }
  }, [data?.data]);

  const updateFloorHandler = async () => {
    try {
      const dataForUpdate = {};
      if (floor.floorName) dataForUpdate.name = floor.floorName;
      if (floor.floorRooms) dataForUpdate.rooms = floor.floorRooms;
      if (polygons) dataForUpdate.twoDModelCanvasData = JSON.stringify(polygons);
      if (selectedSensor.length > 0) dataForUpdate.sensors = selectedSensor;
      const res = await updateFloor({ floorId: id, data: dataForUpdate }).unwrap();
      if (res?.message) toast.success(res.message);
    } catch (error) {
      console.log("Error in updating floor", error);
      toast.error(error?.data?.message || "Error in update floor");
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex items-center justify-between bg-[#03A5E0] rounded-[4px] px-4 md:px-8 py-2">
        <h6 className="text-base md:text-lg font-bold text-white">Floor 1</h6>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <AccordionEditIcon />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <TextField
          label={"Floor Name"}
          type="text"
          value={floor.floorName}
          placeholder="Floor Name"
          onChange={(e) => setFloor({ ...floor, floorName: e.target.value })}
        />
        <TextField
          label={"Rooms"}
          type="text"
          value={floor.floorRooms}
          placeholder="Rooms"
          onChange={(e) => setFloor({ ...floor, floorRooms: e.target.value })}
        />
      </div>
      <div className="lg:col-span-3 flex justify-center">
        <div className="mt-4">
          <UploadModelImage
            selectedSensor={selectedSensor}
            setSelectedSensor={setSelectedSensor}
            previewValue={twoDModelPreview}
            setPreviewValue={setTwoDModelPreview}
            polygons={polygons}
            setPolygons={setPolygons}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          disabled={isUpdatingFloor}
          text={"Update Floor"}
          onClick={updateFloorHandler}
          className={`max-w-[200px] ${isUpdatingFloor ? "pointer-events-none opacity-30" : ""}`}
        />
      </div>
    </div>
  );
}

export default FloorEdit;
