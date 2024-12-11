import React, { useCallback, useEffect, useState } from "react";
import WindIcon from "../../assets/svgs/buildings/WindIcon";
import SunIcon from "../../assets/svgs/buildings/SunIcon";
import WeatherCloudIcon from "../../assets/svgs/buildings/WeatherCloudIcon";
import ThunderImage from "../../assets/images/buildings/thunder-img.svg";
import { getUserData } from "../../utils/stripe";
import getEnv from "../../config/config";

const boxShadow = { boxShadow: "0px 3px 0px 0px rgba(100, 198, 234, 0.4)" };

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);

  console.log("weatherData", weatherData);
  const getWeatherData = useCallback(async () => {
    let userDAta = await getUserData();
    let city = userDAta?.city;
    let country = userDAta?.country;
    const apiKey = getEnv("WEATHER_API_KEY");
    if (!city || !apiKey) return alert("Something went wrong");
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;

    try {
      const response = await fetch(apiUrl);
      console.log(response);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setWeatherData({ ...data, city: city, country: country });
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);
  return (
    <div>
      <div
        className="bg-primary-lightBlue rounded-xl p-4 md:p-6 lg:p-8 flex items-center justify-between gap-4"
        style={boxShadow}
      >
        <div>
          <h2 className="text-2xl md:text-[38px] font-semibold text-white">{Math.round(weatherData?.main?.temp)}°</h2>
          <div className="flex items-center gap-2 my-1">
            <p className="text-sm text-white">
              H: <span>{Math.round(weatherData?.main?.temp_max)}°</span>
            </p>
            <p className="text-sm text-white">
              L: <span>{Math.round(weatherData?.main?.temp_min)}°</span>
            </p>
          </div>
          <p className="text-sm text-white">
            {weatherData?.city}, {weatherData?.country}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <img src={ThunderImage} alt="image" className="w-[120px] " />

          <p className="text-sm text-white font-bold">{weatherData?.weather[0]?.main}</p>
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
