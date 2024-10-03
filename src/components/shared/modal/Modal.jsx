import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ title, children, onClose, width }) => {
  return (
    <div
      className="bg-[#000000c0] w-full h-100 fixed inset-0 flex items-center justify-center py-4 z-[999]"
      onClick={onClose}
    >
      <div
        className={`${
          width ? width : "w-[300px] md:w-[500px] lg:w-[900px]"
        } rounded-lg p-4 bg-white overflow-y-auto h-auto max-h-full custom-scrollbar`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[#111111] font-semibold md:font-bold text-base md:text-xl">
            {title}
          </h2>
          <div className="cursor-pointer" onClick={onClose}>
            <IoClose fontSize={25} />
          </div>
        </div>
        <div className="mt-4 md:mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
