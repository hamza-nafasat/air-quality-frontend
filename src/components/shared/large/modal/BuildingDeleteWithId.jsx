/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../../small/Button";
import TextField from "../../small/TextField";

const BuildingDeleteWithId = ({ onClose, message }) => {
  const [isDelDisable, setIsDelDisable] = useState(true);
  const [inputId, setInputId] = useState("");
  const buildingId = "121267356578";

  useEffect(() => {
    if (String(inputId) === String(buildingId)) {
      setIsDelDisable(false);
    } else {
      setIsDelDisable(true);
    }
  }, [inputId, buildingId]);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[16px] text-[#00000090]">{message}</p>
      <p className="text-[#03A5E0] text-[16px]">Enter ID for confirm deletion.</p>

      <TextField placeholder="Enter Building ID" value={inputId} onChange={(e) => setInputId(e.target.value)} />
      <span className="text-[red] text-[sm]">Id:{buildingId} </span>
      <div className="flex gap-2 justify-end">
        <Button text="Cancel" borderColor="#03A5E0" bg="transparent" color="#03A5E0" width="w-fit" onClick={onClose} />

        <button
          disabled={isDelDisable}
          className={`rounded-[8px] flex items-center justify-center text-nowrap px-7 transition-all duration-300 text-white font-[700] bg-[#3dc5ff] ${
            isDelDisable ? "cursor-not-allowed opacity-[0.5]" : "cursor-pointer opacity-1"
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default BuildingDeleteWithId;
