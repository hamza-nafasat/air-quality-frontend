/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/shared/small/Button";
import Dropdown from "../../../components/shared/small/Dropdown";
import TextField from "../../../components/shared/small/TextField";
import { useUpdateSensorMutation } from "../../../redux/apis/sensorApis";
import { sensorTypes } from "./sensorOptions";

const EditSensor = ({ selectedSensor, onClose, refetch }) => {
  const [updateSensor, { isLoading }] = useUpdateSensorMutation("");
  const [form, setForm] = useState({
    name: selectedSensor?.name,
    type: selectedSensor?.type,
    uniqueId: selectedSensor?.uniqueId,
    url: selectedSensor?.url,
    location: selectedSensor?.location,
  });
  const handleEditSensor = async () => {
    try {
      if (!form?.name || !form?.type || !form?.uniqueId || !form?.url) {
        return toast.error("Please fill all the fields");
      }

      const response = await updateSensor({ sensorId: selectedSensor?._id, data: form }).unwrap();
      if (response?.success) {
        await refetch();
        toast.success(response?.message);
      }
    } catch (error) {
      console.log("Error while adding sensor", error);
      toast.error(error?.data?.message || "Error while updating sensor");
    } finally {
      onClose();
    }
  };
  return (
    <div>
      <h6 className="text-base md:text-lg text-[#000]">General Info</h6>
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TextField
          label="Name"
          type="text"
          placeholder="Device Name"
          value={form?.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Dropdown
          options={sensorTypes}
          label={"Type"}
          defaultText={form?.type}
          onSelect={(option) => setForm({ ...form, type: option?.value })}
        />
        <TextField
          label="Unique Id"
          type="text"
          placeholder="Device Unique Id"
          value={form?.uniqueId}
          onChange={(e) => setForm({ ...form, uniqueId: e.target.value })}
        />
        <TextField
          label="Location"
          type="text"
          placeholder="Device Location"
          value={form?.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <div className="col-span-2">
          <TextField
            label=" Url"
            type="text"
            placeholder="Device Url"
            value={form?.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          disabled={isLoading}
          onClick={handleEditSensor}
          text="Update Sensor"
          width="w-full md:w-[150px]"
          height="h-[40px] md:h-[50px]"
        />
      </div>
    </div>
  );
};

export default EditSensor;
