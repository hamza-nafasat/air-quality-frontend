/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditIcon from "../../assets/svgs/stepper/EditIcon";
import DeleteIcon from "../../assets/svgs/stepper/DeleteIcon";
import Button from "../shared/small/Button";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setBuildingData } from "../../redux/slices/buildingSlice";
import UploadModelImage from "./uploads/UploadModelImage";

const UploadModel = ({ setCurrentStep }) => {
  const dispatch = useDispatch();
  const { buildingData } = useSelector((state) => state.building);
  const [twoDModel, setTwoDModel] = useState(null);
  const [twoDModelPreview, setTwoDModelPreview] = useState(null);

  // console.log("twoDModel", twoDModel, twoDModelPreview);

  const submitHandler = () => {
    // if (!twoDModel && !twoDModelPreview)
    //   return toast.error("Please Upload 2D Model");
    dispatch(setBuildingData({ ...buildingData, twoDModel, twoDModelPreview }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    if (buildingData?.twoDModel) setTwoDModel(buildingData?.twoDModel);
    if (buildingData?.twoDModelPreview)
      setTwoDModelPreview(buildingData?.twoDModelPreview);
  }, [buildingData]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">
          Upload 2D Model Of Building
        </h3>
        <div className="flex items-center gap-3">
          <div className="cursor-pointer">
            <EditIcon />
          </div>
          <div className="cursor-pointer">
            <DeleteIcon />
          </div>
        </div>
      </div>
      {/* <BrowseFile
        setFile={setTwoDModel}
        previewValue={twoDModelPreview}
        setPreviewValue={setTwoDModelPreview}
      /> */}
      <div className="flex justify-center">
        <UploadModelImage />
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          // disabled={!twoDModel}
          text="Next"
          width="w-[128px]"
          onClick={submitHandler}
        />
      </div>
    </div>
  );
};

export default UploadModel;
