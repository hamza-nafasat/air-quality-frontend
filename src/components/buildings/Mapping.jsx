/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from "../../assets/svgs/stepper/DeleteIcon";
import { setBuildingData } from "../../redux/slices/buildingSlice";
import Button from "../shared/small/Button";
import TextField from "../shared/small/TextField";
import StepperMap from "./StepperMap";

const Mapping = ({ setCurrentStep }) => {
  const dispatch = useDispatch();
  const { buildingData } = useSelector((state) => state.building);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const latHandler = (e) => setLat(e.target.value);
  const lngHandler = (e) => setLng(e.target.value);

  const submitHandler = () => {
    if (!lat || !lng) return toast.error("Please Enter lat and lng both");
    dispatch(setBuildingData({ ...buildingData, position: [String(lat), String(lng)] }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    if (buildingData?.position) {
      setLat(parseFloat(buildingData?.position?.[0]));
      setLng(parseFloat(buildingData?.position?.[1]));
    }
  }, [buildingData]);
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">Add Building Lat Lng</h3>
        {/* <div className="cursor-pointer">
          <DeleteIcon />
        </div> */}
      </div>
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        <div className="lg:col-span-6">
          <TextField value={lat} type="number" placeholder="Latitude" onChange={(e) => latHandler(e)} />
        </div>
        <div className="lg:col-span-6">
          <TextField value={lng} type="number" placeholder="Longitude" onChange={(e) => lngHandler(e)} />
        </div>
        <div className="lg:col-span-12">
          <div className="h-[325px] rounded-lg shadow-md">
            <StepperMap lat={lat} lng={lng} />
          </div>
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
            <Button type="button" text="Next" width="w-[128px]" onClick={submitHandler} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Mapping;
