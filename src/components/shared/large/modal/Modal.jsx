import React from "react";
import { IoClose } from "react-icons/io5";
// import crossIcon from "../../assets/dashboard/subComponent/crossIcon.svg";

const Modal = ({ title, onClose, children, width }) => {
  return (
    <div
      className={`modal bg-[#00000099] fixed top-0 left-0 inset-0 z-[99999] p-6 flex items-center justify-center  `}
      onClick={onClose}
    >
      <div
        className={` ${
          title === "qr" ? "bg-red" : "bg-white"
        } rounded-[12px] shadow-lg p-4 md:p-6 overflow-y-auto h-fit max-h-full   ${
          width ? width : "w-[300px] md:w-[600px] lg:w-[900px] xl:w-[1200px]"
          // md:w-[600px] lg:w-[900px] xl:w-[1200px]
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {title === "qr" ? (
          ""
        ) : (
          <div className="flex items-center justify-between">
            <h2 className="text-[#111111] font-semibold text-sm sm:text-base md:text-xl">
              {title}
            </h2>
            <div className="cursor-pointer" onClick={onClose}>
              <IoClose fontSize={25} />
            </div>
          </div>
        )}
        <div className="mt-4 md:mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
