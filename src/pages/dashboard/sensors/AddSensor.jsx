import React from "react";
import TextField from "../../../components/shared/small/TextField";
import Button from "../../../components/shared/small/Button";

const AddSensor = () => {
  return (
    <div>
      <h6 className="text-base md:text-lg text-[#000]">General Info</h6>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TextField label="Device Name" type="text" placeholder="Device Name" />
        <TextField label="Device Type" type="text" placeholder="Device Type" />
        <TextField label="Unique Id" type="text" placeholder="Unique Id" />
        <TextField label="Ip Address" type="text" placeholder="Ip Address" />
      </div>
      <div className="flex justify-end mt-4">
        <Button text='Add Sensor' width='w-full md:w-[150px]' height='h-[40px] md:h-[50px]' />
      </div>
    </div>
  );
};

export default AddSensor;
