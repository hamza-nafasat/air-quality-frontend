// import React, { useCallback, useEffect, useState } from 'react';
// import WindIcon from '../../assets/svgs/buildings/WindIcon';
// import SunIcon from '../../assets/svgs/buildings/SunIcon';
// import WeatherCloudIcon from '../../assets/svgs/buildings/WeatherCloudIcon';
// import ThunderImage from '../../assets/images/buildings/thunder-img.svg';
// import { getUserData } from '../../utils/stripe';
// import getEnv from '../../config/config';

// const boxShadow = { boxShadow: '0px 3px 0px 0px rgba(100, 198, 234, 0.4)' };

// const getWeatherIcon = (weather) => {
//   switch (weather) {
//     case 'Clear':
//       return <SunIcon />;
//     case 'Clouds':
//       return <WeatherCloudIcon />;
//     default:
//       return <SunIcon />;
//   }
// };

// const getDay = (day) => {
//   const date = new Date(day);
//   return date.toLocaleDateString('en-US', { weekday: 'short' });
// };

// const WeatherCard = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [forcastData, setForcastData] = useState(null);

//   console.log('forCastdata', forcastData);
//   const getWeatherData = useCallback(async () => {
//     // let userDAta = await getUserData();
//     // let city = userDAta?.city;
//     // let country = userDAta?.country;
//     // const API_KEY = getEnv("WEATHER_API_KEY");
//     const API_KEY = '1d878af3f008169d6504b3ce86e88395';
//     const CITY = 'Lahore';
//     if (!CITY || !API_KEY) return alert('Something went wrong');
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&&units=metric`;
//     const forcastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&&units=metric`;

//     try {
//       const response = await fetch(apiUrl);
//       console.log(response);
//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       const data = await response.json();
//       setWeatherData({ ...data, city: city, country: country });

//       // fetch forcast
//       const forcastRes = await fetch(forcastApiUrl);
//       console.log('forcast res', forcastRes);
//       if (!forcastRes.ok) throw new Error(`Error: ${forcastRes.status}`);
//       const forcastData = await forcastRes.json();
//       const dailyForcast = forcastData?.list?.filter((item) => item?.dt_txt.includes('12:00:00'));
//       setForcastData(dailyForcast);
//     } catch (error) {
//       console.error('Failed to fetch weather data:', error);
//     }
//   }, []);

//   useEffect(() => {
//     getWeatherData();
//   }, [getWeatherData]);
//   return (
//     <div>
//       <div
//         className="bg-primary-lightBlue rounded-xl px-4 md:px-6 py-4 flex items-center justify-between gap-4"
//         style={boxShadow}
//       >
//         <div>
//           <h2 className="text-2xl md:text-[38px] font-semibold text-white">
//             {Math.round(weatherData?.main?.temp)}°
//           </h2>
//           <div className="flex items-center gap-2 my-1">
//             <p className="text-sm text-white">
//               H: <span>{Math.round(weatherData?.main?.temp_max)}°</span>
//             </p>
//             <p className="text-sm text-white">
//               L: <span>{Math.round(weatherData?.main?.temp_min)}°</span>
//             </p>
//           </div>
//           <p className="text-sm text-white">
//             {weatherData?.city}, {weatherData?.country}
//           </p>
//         </div>
//         <div className="flex flex-col items-center gap-1">
//           <img src={ThunderImage} alt="image" className="w-[120px] " />

//           <p className="text-sm text-white font-bold">{weatherData?.weather[0]?.main}</p>
//         </div>
//       </div>
//       <div className="mt-4 md:mt-6 flex items-center justify-center gap-4 pb-4">
//         {forcastData &&
//           forcastData.map((list, i) => (
//             <WeatherBoxes
//               key={i}
//               day={getDay(list?.dt_txt)}
//               icon={getWeatherIcon(list?.weather[0].main)}
//               value={Math.round(list?.main?.temp)}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default WeatherCard;

// const WeatherBoxes = ({ day, icon, value }) => {
//   return (
//     <div className="bg-[#03a5e01a] w-[80px] rounded-lg p-4 border-[0.6px] border-primary-lightBlue flex flex-col items-center justify-center gap-2">
//       <div className="text-sm text-primary-lightBlue font-medium">{day}</div>
//       {icon}
//       <div className="text-sm text-primary-lightBlue font-bold">{value}°</div>
//     </div>
//   );
// };

import React, { useCallback, useEffect, useState } from 'react';
import WindIcon from '../../assets/svgs/buildings/WindIcon';
import SunIcon from '../../assets/svgs/buildings/SunIcon';
import WeatherCloudIcon from '../../assets/svgs/buildings/WeatherCloudIcon';
import ThunderImage from '../../assets/images/buildings/thunder-img.svg';
import getEnv from '../../config/config';

const boxShadow = { boxShadow: '0px 3px 0px 0px rgba(100, 198, 234, 0.4)' };

const getWeatherIcon = (weather) => {
  switch (weather) {
    case 'Clear':
      return <SunIcon />;
    case 'Clouds':
      return <WeatherCloudIcon />;
    default:
      return <SunIcon />;
  }
};

const getDay = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const getWeatherData = useCallback(async () => {
    // const API_KEY = '1d878af3f008169d6504b3ce86e88395';
    const CITY = 'Lahore';
    const API_KEY = getEnv('WEATHER_API_KEY');

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;

    try {
      // Current weather
      const response = await fetch(currentWeatherUrl);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setWeatherData({
        ...data,
        city: data.name,
        country: data.sys.country,
      });

      // 5-day forecast (every 3 hours — we pick daily 12:00 PM)
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error(`Error: ${forecastRes.status}`);
      const forecastData = await forecastRes.json();
      const dailyForecast = forecastData.list.filter((item) => item.dt_txt.includes('12:00:00'));
      setForecastData(dailyForecast);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  if (!weatherData) return <p className="text-center text-white">Loading weather data...</p>;

  return (
    <div>
      <div
        className="bg-primary-lightBlue rounded-xl px-4 md:px-6 py-4 flex items-center justify-between gap-4"
        style={boxShadow}
      >
        <div>
          <h2 className="text-2xl md:text-[38px] font-semibold text-white">
            {Math.round(weatherData.main.temp)}°
          </h2>
          <div className="flex items-center gap-2 my-1">
            <p className="text-sm text-white">
              H: <span>{Math.round(weatherData.main.temp_max)}°</span>
            </p>
            <p className="text-sm text-white">
              L: <span>{Math.round(weatherData.main.temp_min)}°</span>
            </p>
          </div>
          <p className="text-sm text-white">
            {weatherData.city}, {weatherData.country}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <img src={ThunderImage} alt="weather" className="w-[120px]" />
          <p className="text-sm text-white font-bold">{weatherData.weather[0]?.main}</p>
        </div>
      </div>

      <div className="mt-4 md:mt-6 flex items-center justify-center gap-4 pb-4">
        {forecastData &&
          forecastData.map((item, i) => (
            <WeatherBox
              key={i}
              day={getDay(item.dt_txt)}
              icon={getWeatherIcon(item.weather[0].main)}
              value={Math.round(item.main.temp)}
            />
          ))}
      </div>
    </div>
  );
};

export default WeatherCard;

const WeatherBox = ({ day, icon, value }) => {
  return (
    <div className="bg-[#03a5e01a] w-[80px] rounded-lg p-4 border-[0.6px] border-primary-lightBlue flex flex-col items-center justify-center gap-2">
      <div className="text-sm text-primary-lightBlue font-medium">{day}</div>
      {icon}
      <div className="text-sm text-primary-lightBlue font-bold">{value}°</div>
    </div>
  );
};
