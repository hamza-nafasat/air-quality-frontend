/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import BrowseFile from "../shared/large/BrowseFile";
import TextField from "../shared/small/TextField";
import Button from "../shared/small/Button";
import Dropdown from "../shared/small/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setBuildingData } from "../../redux/slices/buildingSlice";

const GeneralInfo = ({ setCurrentStep }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbNailPreview] = useState(null);

  const { buildingData } = useSelector((state) => state.building);

  const submitHandler = () => {
    if (!thumbnail && !thumbnailPreview) return toast.error("Please Upload Thumbnail");
    dispatch(setBuildingData({ thumbnail, thumbnailPreview }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    if (buildingData?.thumbnail) setThumbnail(buildingData?.thumbnail);
    if (buildingData?.thumbnailPreview) setThumbNailPreview(buildingData?.thumbnailPreview);
  }, [buildingData?.thumbnail, buildingData?.thumbnailPreview]);

  return (
    <div>
      <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">General Info</h3>
      <BrowseFile
        setFile={setThumbnail}
        previewValue={thumbnailPreview}
        setPreviewValue={setThumbNailPreview}
      />
      <form className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="lg:col-span-6">
          <TextField type="text" placeholder="Building Name" />
        </div>
        <div className="lg:col-span-6">
          <Dropdown defaultText="Building Type" options={[{ option: "2D" }, { option: "3D" }]} />
        </div>
        <div className="lg:col-span-6">
          <TextField type="text" placeholder="Area (Sq Ft)" />
        </div>
        <div className="lg:col-span-6">
          <TextField type="text" placeholder="Address" />
        </div>
        <div className="lg:col-span-12 flex justify-end">
          <div className="flex items-center gap-4">
            <Button type="button" text="Back" width="w-[128px]" bg="bg-[#9caabe]" onClick={submitHandler} />
            <Button
              type="button"
              text="Next"
              width="w-[128px]"
              onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;
