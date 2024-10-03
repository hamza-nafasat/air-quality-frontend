import React from "react";

const Modal = ({ children, onClose, width }) => {
  return (
    <div
      className="bg-[#000000c0] w-full h-100 fixed inset-0 flex items-center justify-center py-4 z-[999]"
      onClick={onClose}
    >
      <div
        className={`${width ? width : 'w-[300px] md:w-[500px] lg:w-[900px]'} rounded-lg p-4 bg-white overflow-y-auto h-auto max-h-full custom-scrollbar`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
