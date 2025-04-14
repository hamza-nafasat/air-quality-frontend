import { useState } from "react";
import AccordionEditIcon from "../../../assets/svgs/buildings/AccordionEditIcon";
import TextField from "../../shared/small/TextField";
import UploadModelImage from "../../buildings/uploads/UploadModelImage";
import Button from "../../shared/small/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateFloorMutation } from "../../../redux/apis/floorApis";

function AddFloor() {
  const navigate = useNavigate();
  const buildingId = useParams()?.id;
  const [floor, setFloor] = useState({ floorName: "", floorRooms: "0" });
  const [previewValue, setPreviewValue] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [twoDModel, setTwoDModel] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState([]);
  const [addFloor, { isLoading }] = useCreateFloorMutation();

  const addNewFloorHanlder = async () => {
    try {
      if (!floor.floorName || !floor.floorRooms || !twoDModel || !polygons.length || !selectedSensor)
        return toast.error("Please enter all fields");
      const formData = new FormData();
      formData.append("name", floor?.floorName);
      formData.append("buildingId", buildingId);
      formData.append("rooms", floor.floorRooms);
      formData.append("file", twoDModel);
      formData.append("twoDModelCanvasData", JSON.stringify(polygons));
      formData.append("sensors", selectedSensor.join(","));
      const res = await addFloor(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        return navigate("/dashboard/building-view/" + buildingId);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error in adding new floor");
      console.log("Error in adding new floor", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-primary-lightBlue rounded-[4px] px-4 md:px-8 py-2">
        <h6 className="text-base md:text-lg font-bold text-white">Add new Floor</h6>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <AccordionEditIcon />
          </div>
        </div>
      </div>
      <>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextField
            type="text"
            placeholder="Name"
            label="Floor Name"
            value={floor.floorName}
            onChange={(e) => setFloor({ ...floor, floorName: e.target.value })}
          />
          <TextField
            type="text"
            placeholder="0"
            label="Rooms"
            value={floor.floorRooms}
            onChange={(e) => setFloor({ ...floor, floorRooms: e.target.value })}
          />
        </div>
        <div className="lg:col-span-3 flex justify-center">
          <div className="mt-4">
            <UploadModelImage
              setFile={setTwoDModel}
              previewValue={previewValue}
              setPreviewValue={setPreviewValue}
              polygons={polygons}
              setPolygons={setPolygons}
              twoDModel={twoDModel}
              selectedSensor={selectedSensor}
              setSelectedSensor={setSelectedSensor}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={addNewFloorHanlder}
            disabled={isLoading}
            className={`${isLoading && "pointer-events-none opacity-50"}`}
            text={"Add Floor"}
            width="w-[158px]"
          />
        </div>
      </>
    </div>
  );
}

export default AddFloor;
