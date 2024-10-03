import React, { useState } from "react";
import EditIcon from "../../assets/svgs/stepper/EditIcon";
import DeleteIcon from "../../assets/svgs/stepper/DeleteIcon";
import Button from "../shared/small/Button";
import BrowseFile from "../shared/large/BrowseFile";

const UploadModel = ({ setCurrentStep }) => {
  const [file, setFile] = useState(null);

  const validationHanlder = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

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
      <BrowseFile setFile={setFile} />
      <div className="mt-4 flex justify-end">
        <Button text="Next" width="w-[128px]" onClick={validationHanlder} />
      </div>
    </div>
  );
};

export default UploadModel;