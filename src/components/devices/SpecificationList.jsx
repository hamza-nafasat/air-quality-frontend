import React from "react";

const SpecificationList = ({ type, status }) => {
  return (
    <div className="flex justify-between m-3">
      <h5 className="text-[12px] xl:text-[14px] font-[700]">{type}</h5>
      <h5 className="text-[12px] xl:text-[14px] font-[400]">{status}</h5>
    </div>
  );
};

export default SpecificationList;
