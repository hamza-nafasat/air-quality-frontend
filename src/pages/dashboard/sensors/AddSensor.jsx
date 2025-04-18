/* eslint-disable react/prop-types */
import TextField from "../../../components/shared/small/TextField";
import Button from "../../../components/shared/small/Button";
import Dropdown from "../../../components/shared/small/Dropdown";
import { sensorTypes } from "./sensorOptions";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateSensorMutation } from "../../../redux/apis/sensorApis";
import { v4 as uuidv4 } from "uuid";

const AddSensor = ({ onClose }) => {
  const [addSensor, { isLoading }] = useCreateSensorMutation();
  const [form, setForm] = useState({ name: "", type: "", uniqueId: uuidv4() });

  const handleAddSensor = async () => {
    try {
      if (!form?.name || !form?.type || !form?.uniqueId) {
        return toast.error("Please fill all the fields");
      }
      const response = await addSensor({
        name: form.name,
        type: form.type,
        uniqueId: form.uniqueId,
      }).unwrap();
      if (response?.success) {
        toast.success(response?.message);
      }
    } catch (error) {
      console.log("Error while adding sensor", error);
      toast.error(error?.data?.message || "Error while adding sensor");
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
          defaultText="Select Type"
          onSelect={(option) => setForm({ ...form, type: option?.value })}
        />
        <TextField
          label="Unique Id"
          type="text"
          placeholder="Device Unique Id"
          value={form?.uniqueId}
          onChange={(e) => setForm({ ...form, uniqueId: e.target.value })}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button
          disabled={isLoading}
          onClick={handleAddSensor}
          text="Add Sensor"
          width="w-full md:w-[150px]"
          height="h-[40px] md:h-[50px]"
        />
      </div>
    </div>
  );
};

export default AddSensor;
