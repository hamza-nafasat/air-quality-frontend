/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditIcon from "../../assets/svgs/stepper/EditIcon";
import DeleteIcon from "../../assets/svgs/stepper/DeleteIcon";
import Button from "../shared/small/Button";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setBuildingData } from "../../redux/slices/buildingSlice";
import UploadModelImage from "./uploads/UploadModelImage";
import { toast } from "react-toastify";

const UploadModel = ({ setCurrentStep }) => {
  const dispatch = useDispatch();
  const { buildingData } = useSelector((state) => state.building);
  const [twoDModel, setTwoDModel] = useState(null);
  const [twoDModelPreview, setTwoDModelPreview] = useState(null);
  const [twoDModelCoordinates, setTwoDModelCoordinates] = useState([]);


  const submitHandler = () => {
    if (!twoDModel || !twoDModelPreview || twoDModelCoordinates?.length === 0) {
      toast.error("Please Upload 2D Model and draw canvas over image");
      return;
    }
    dispatch(
      setBuildingData({
        ...buildingData,
        twoDModel,
        twoDModelCoordinates,
        twoDModelPreview,
      })
    );
    setCurrentStep((prevStep) => prevStep + 1);
  };

  console.log("buildings data", buildingData);

  useEffect(() => {
    if (buildingData?.twoDModel) setTwoDModel(buildingData?.twoDModel);
    if (buildingData?.twoDModelPreview) setTwoDModelPreview(buildingData?.twoDModelPreview);
    if (buildingData?.twoDModelCoordinates) setTwoDModelCoordinates(buildingData?.twoDModelCoordinates);
  }, [buildingData]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">Upload 2D Model Of Building</h3>
        <div className="flex items-center gap-3">
          <div className="cursor-pointer">
            <EditIcon />
          </div>
          <div className="cursor-pointer">
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <UploadModelImage
          setFile={setTwoDModel}
          previewValue={twoDModelPreview}
          setPreviewValue={setTwoDModelPreview}
          polygons={twoDModelCoordinates}
          setPolygons={setTwoDModelCoordinates}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          disabled={!twoDModel || twoDModelCoordinates.length === 0}
          text="Next"
          width="w-[128px]"
          onClick={submitHandler}
        />
      </div>
    </div>
  );
};

export default UploadModel;
