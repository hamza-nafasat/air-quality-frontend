import { useState } from "react";
import Alerts from "./Alerts";
import RuleEngines from "./RuleEngines";
// import AlertType from "./AlertType";
// import RuleEngines from "./RuleEngines";

const AlertType = () => {
  const [value, setValue] = useState("Alerts");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="w-full bg-white rounded-lg  flex flex-col">
      <div className="flex border-b border-gray-300">
        <button
          className={`px-4 py-2 text-sm font-medium focus:outline-none ${
            value === "Alerts"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => handleChange("Alerts")}
        >
          Alerts
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium focus:outline-none ${
            value === "RuleEngine"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => handleChange("RuleEngine")}
        >
          Rule Engine
        </button>
      </div>

      <div className="p-4 mt-4 md:mt-10">
        {value === "Alerts" && <Alerts />}
        {value === "RuleEngine" && <RuleEngines />}
      </div>
    </div>
  );
};

export default AlertType;
