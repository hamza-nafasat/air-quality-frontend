/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import BrowseFile from "../shared/large/BrowseFile";
import TextField from "../shared/small/TextField";
import Button from "../shared/small/Button";
import Dropdown from "../shared/small/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setBuildingData } from "../../redux/slices/buildingSlice";

const buildingTypesOptions = [
  { option: "Residential", value: "residential" },
  { option: "Commercial", value: "commercial" },
  { option: "Religious", value: "religious" },
  { option: "Educational", value: "educational" },
  { option: "Industrial", value: "industrial" },
  { option: "Hospitality", value: "hospitality" },
  { option: "Other", value: "other" },
];

const GeneralInfo = ({ setCurrentStep }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [floorsCount, setFloorsCount] = useState(1);
  const [address, setAddress] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbNailPreview] = useState(null);

  const { buildingData } = useSelector((state) => state.building);

  const submitHandler = () => {
    if (
      !thumbnail ||
      !thumbnailPreview ||
      !name ||
      !type ||
      !area ||
      !address ||
      !floorsCount
    )
      return toast.error("Please Enter all Fields");
    dispatch(
      setBuildingData({
        ...buildingData,
        thumbnail,
        thumbnailPreview,
        name,
        type,
        area,
        address,
        floorsCount,
      })
    );
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    if (buildingData?.thumbnail) setThumbnail(buildingData?.thumbnail);
    if (buildingData?.thumbnailPreview)
      setThumbNailPreview(buildingData?.thumbnailPreview);
    if (buildingData?.name) setName(buildingData?.name);
    if (buildingData?.type) setType(buildingData?.type);
    if (buildingData?.area) setArea(buildingData?.area);
    if (buildingData?.address) setAddress(buildingData?.address);
    if (buildingData?.floorsCount)
      setFloorsCount(buildingData?.floorsCount | 0);
  }, [buildingData]);

  return (
    <div>
      <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">
        General Info
      </h3>
      <BrowseFile
        setFile={setThumbnail}
        previewValue={thumbnailPreview}
        setPreviewValue={setThumbNailPreview}
      />
      <form className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="lg:col-span-6">
          <TextField
            type="text"
            value={name}
            placeholder="Building Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="lg:col-span-6">
          <Dropdown
            value={type}
            defaultText="Building Type"
            options={buildingTypesOptions}
            onSelect={(option) => setType(option?.value)}
          />
        </div>
        <div className="lg:col-span-6">
          <TextField
            type="text"
            value={area}
            placeholder="Area (Sq Ft)"
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        <div className="lg:col-span-6">
          <TextField
            type="number"
            value={floorsCount}
            placeholder="Floors Count"
            onChange={(e) => setFloorsCount(e.target.value)}
          />
        </div>
        <div className="lg:col-span-6">
          <TextField
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="lg:col-span-12 flex justify-end">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              text="Back"
              width="w-[128px]"
              bg="bg-[#9caabe]"
              onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
            />
            <Button
              type="button"
              text="Next"
              width="w-[128px]"
              onClick={submitHandler}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;
