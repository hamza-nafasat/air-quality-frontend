import React from "react";
import WindIcon from "../../assets/svgs/buildings/WindIcon";
import SunIcon from "../../assets/svgs/buildings/SunIcon";
import WeatherCloudIcon from "../../assets/svgs/buildings/WeatherCloudIcon";
import ThunderImage from "../../assets/images/buildings/thunder-img.svg";

const boxShadow = {
  boxShadow: "0px 3px 0px 0px rgba(100, 198, 234, 0.4)",
};

const WeatherCard = () => {
  return (
    <div>
      <div
        className="bg-primary-lightBlue rounded-xl p-4 md:p-6 lg:p-8 flex items-center justify-between gap-4"
        style={boxShadow}
      >
        <div>
          <h2 className="text-2xl md:text-[38px] font-semibold text-white">
            30°
          </h2>
          <div className="flex items-center gap-2 my-1">
            <p className="text-sm text-white">
              H: <span>26°</span>
            </p>
            <p className="text-sm text-white">
              L: <span>16°</span>
            </p>
          </div>
          <p className="text-sm text-white">Sydney, Australia</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <img src={ThunderImage} alt="image" className="w-[120px] " />

          <p className="text-sm text-white font-bold">Thunder</p>
        </div>
      </div>
      <div className="mt-4 md:mt-6 flex items-center justify-center gap-4 pb-4">
        <WeatherBoxes icon={<WindIcon />} value="36 km/h" />
        <WeatherBoxes icon={<WeatherCloudIcon />} value="83 %" />
        <WeatherBoxes icon={<SunIcon />} value="2 of 10" />
      </div>
    </div>
  );
};

export default WeatherCard;

const WeatherBoxes = ({ icon, value }) => {
  return (
    <div className="bg-[#03a5e01a] w-[80px] rounded-lg p-4 border-[0.6px] border-primary-lightBlue flex flex-col items-center justify-center gap-2">
      {icon}
      <div className="text-xs text-primary-lightBlue font-medium">{value}</div>
    </div>
  );
};
