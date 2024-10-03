import React from "react";

const StatusCard = ({ icon, type, status, from, progressIcon }) => {
  return (
    <div
      className="min-w-[182px] p-4 bg-[white] text-black rounded-[16px] flex flex-col justify-center min-h-[131px] 
      transition duration-300 ease-in-out shadow-md hover:shadow-md hover:shadow-black/30"
    >
      <div
        className={`flex ${
          progressIcon && "items-center justify-between gap-2"
        }`}
      >
        <div>
          <div className="flex items-center gap-3">
            <div>{icon}</div>
            <div>
              <h5 className="text-[12px] xl:text-[14px]">{type}</h5>
              <h3 className="text-[20px] xl:text-[24px]">{status}</h3>
            </div>
          </div>
          {from && (
            <div className="flex text-[14px] gap-1">
              <h6 className="text-[#bef045]">+{from}%</h6>
              <h5>from yesterday </h5>
            </div>
          )}
        </div>
        {progressIcon && <div className="w-[40%]">{progressIcon}</div>}
      </div>
    </div>
  );
};

export default StatusCard;
