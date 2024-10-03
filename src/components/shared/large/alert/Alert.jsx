import React from "react";
import AlertIcon from "../../../../assets/svgs/alert/AlertIcon";
import ClockIcon from "./ClockIcon";
const Alert = ({ type, message, padding }) => {
  const color = type === "Notification" ? "#32CD32" : "#FF0000";
  return (
    <div>
      <div className={padding ? padding : "py-5"}>
        <div className="flex gap-3 items-center ">
          {" "}
          <AlertIcon color={color} />
          <p className="text-[#5C5B5B]">
            <span className=" font-[500]" style={{ color: color }}>
              {type}:
            </span>{" "}
            {message}
          </p>
        </div>
        <div className=" text-[#5C5B5B] mb-2 flex gap-2 items-center justify-end">
          <ClockIcon />{" "}
          <h5 className="text-sm xl:text-base">July 30 09:00 AM</h5>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Alert;
