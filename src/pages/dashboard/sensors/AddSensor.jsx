/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../components/shared/small/Button";
import TextField from "../../../components/shared/small/TextField";
import { useCreateSensorMutation } from "../../../redux/apis/sensorApis";
import { sensorOptionsForMultiSelect } from "./sensorOptions";

const AddSensor = ({ onClose }) => {
  const [addSensor, { isLoading }] = useCreateSensorMutation();
  const [form, setForm] = useState({ name: "", uniqueId: uuidv4(), parameters: [] });

  const handleAddSensor = async () => {
    try {
      if (!form?.name || !form?.uniqueId) return toast.error("Please fill all the fields");
      const response = await addSensor({
        name: form.name,
        uniqueId: form.uniqueId,
        parameters: form.parameters,
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
  const handleChangeFroMultiSelect = (selectedOptions) => {
    setForm({ ...form, parameters: selectedOptions.map((option) => option.value) });
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
          t
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <div className="flex flex-col  gap-1 w-full">
          <label className="text-sm md:text-base font-[600]">Parameters</label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                border: "1px solid #333",
                borderRadius: "10px",
                outline: "none",
                minHeight: "50px",
                fontSize: "14px",
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                fontSize: "14px",
                zIndex: 999,
              }),
            }}
            options={sensorOptionsForMultiSelect}
            onChange={handleChangeFroMultiSelect}
            value={sensorOptionsForMultiSelect.filter((option) => form?.parameters?.includes(option?.value))}
          />
        </div>

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
