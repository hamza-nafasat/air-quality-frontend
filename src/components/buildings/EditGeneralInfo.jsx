/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setBuildingData } from "../../redux/slices/buildingSlice";
import BrowseFile from "../shared/large/BrowseFile";
import Dropdown from "../shared/small/Dropdown";
import TextField from "../shared/small/TextField";

const buildingTypesOptions = [
  { option: "Residential", value: "residential" },
  { option: "Commercial", value: "commercial" },
  { option: "Religious", value: "religious" },
  { option: "Educational", value: "educational" },
  { option: "Industrial", value: "industrial" },
  { option: "Hospitality", value: "hospitality" },
  { option: "Other", value: "other" },
];

const EditGeneralInfo = ({ setCurrentStep, building,formDataHandler }) => {
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
    if (!thumbnail || !thumbnailPreview || !name || !type || !area || !address || !floorsCount)
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
    if (buildingData?.thumbnailPreview) setThumbNailPreview(buildingData?.thumbnailPreview);
    if (buildingData?.name) setName(buildingData?.name);
    if (buildingData?.type) setType(buildingData?.type);
    if (buildingData?.area) setArea(buildingData?.area);
    if (buildingData?.address) setAddress(buildingData?.address);
    if (buildingData?.floorsCount) setFloorsCount(buildingData?.floorsCount | 0);
  }, [buildingData]);

  return (
    <div>
      <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">General Info</h3>
      <BrowseFile setFile={setThumbnail} previewValue={building.thumbnail} setPreviewValue={setThumbNailPreview} />
      <form className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="lg:col-span-6">
          <TextField type="text" value={building.name} placeholder="Building Name" onChange={formDataHandler} />
        </div>
        <div className="lg:col-span-6">
          <Dropdown
            value={building.type}
            defaultText="Building Type"
            options={buildingTypesOptions}
            onSelect={(option) => setType(option?.value)}
          />
        </div>
        <div className="lg:col-span-6">
          <TextField type="text" value={building.area} placeholder="Area (Sq Ft)" onChange={formDataHandler} />
        </div>
        <div className="lg:col-span-6">
          <TextField
            type="number"
            value={building.floors}
            placeholder="Floors Count"
            onChange={(e) => setFloorsCount(e.target.value)}
          />
        </div>
        <div className="lg:col-span-6">
          <TextField type="text" value={building.address} placeholder="Address" onChange={formDataHandler} />
        </div>
      </form>
    </div>
  );
};

export default EditGeneralInfo;
