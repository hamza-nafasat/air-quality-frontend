import { useState } from "react";
import UploadModelImage from "./uploads/UploadModelImage";
import EditGeneralInfo from "./EditGeneralInfo";
import Button from "../shared/small/Button";
import EditMapping from "./EditMapping";

const EditBuilding = () => {
  const [twoDModel, setTwoDModel] = useState(null);
  const [twoDModelPreview, setTwoDModelPreview] = useState(null);
  const [twoDModelCoordinates, setTwoDModelCoordinates] = useState([]);
  return (
    <div>
      <h6 className="text-base font-semibold">Edit Building</h6>
      <div className="my-5 flex justify-center">
        <UploadModelImage
          setFile={setTwoDModel}
          previewValue={twoDModelPreview}
          setPreviewValue={setTwoDModelPreview}
          polygons={twoDModelCoordinates}
          setPolygons={setTwoDModelCoordinates}
        />
      </div>
      <div>
        <EditGeneralInfo />
      </div>
      <div className="my-5">
        <EditMapping />
      </div>
      <div className="flex justify-end">
        <Button type="button" text="Update Building" width="w-[158px]" />
      </div>
    </div>
  );
};

export default EditBuilding;
