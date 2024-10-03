/* eslint-disable react/prop-types */

import Button from "../../small/Button";

const DeleteConfirmation = ({ onClose, message }) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[16px] text-[#00000090]">{message}</p>
      <div className="flex gap-2 justify-end">
        <Button
          text="Cancel"
          borderColor="#03A5E0"
          bg="transparent"
          color="#03A5E0"
          width="w-fit"
          onClick={onClose}
        />

        <Button text="Yes" bg="#03A5E0" width="w-fit" />
      </div>
    </div>
  );
};

export default DeleteConfirmation;
