import React, { useState } from "react";
import BrowseFile from "../shared/large/BrowseFile";
import TextField from "../shared/small/TextField";
import Button from "../shared/small/Button";
import Dropdown from "../shared/small/Dropdown";

const GeneralInfo = ({ setCurrentStep }) => {
  const [file, setFile] = useState(null);

  return (
    <div>
      <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">
        General Info
      </h3>
      <BrowseFile setFile={setFile} />
      <form className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="lg:col-span-6">
          <TextField type="text" placeholder="Building Name" />
        </div>
        <div className="lg:col-span-6">
          <Dropdown defaultText="Building Type" options={[{option:'2D'},{option:'3D'},]} />
        </div>
        <div className="lg:col-span-6">
          <TextField type="text" placeholder="Area (Sq Ft)" />
        </div>
        <div className="lg:col-span-6">
          <TextField type="text" placeholder="Address" />
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
              onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;
