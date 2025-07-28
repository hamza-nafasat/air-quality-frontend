// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const WeatherForecast = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const API_KEY = '1d878af3f008169d6504b3ce86e88395';
//   const lat = 31.5497; // Lahore latitude
//   const lon = 74.3436; // Lahore longitude

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         setLoading(true);
//         const weatherRes = await axios.get(
//           `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
//         );

//         setWeatherData(weatherRes.data);
//       } catch (err) {
//         console.error('Error fetching weather:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, []);

//   if (loading) return <p>Loading weather data...</p>;
//   if (!weatherData) return <p>No weather data available.</p>;

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
//       <div>
//         <h1 className="text-2xl font-bold">Weather in Lahore</h1>
//         <p>
//           <strong>Today:</strong> {weatherData.current.temp}°C,{' '}
//           {weatherData.current.weather[0].description}
//         </p>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">7-Day Forecast</h2>
//         <ul className="space-y-1">
//           {weatherData.daily.slice(1, 8).map((day, idx) => {
//             const date = new Date(day.dt * 1000).toDateString();
//             return (
//               <li key={idx} className="flex justify-between text-sm">
//                 <span>{date}</span>
//                 <span>
//                   {day.temp.day}°C - {day.weather[0].main}
//                 </span>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WeatherForecast;

// src/components/WeatherForecast.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '1d878af3f008169d6504b3ce86e88395';
const CITY = 'Lahore';

function WeatherForecast() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const currentRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`
        );

        setCurrent(currentRes.data);
        setForecast(forecastRes.data.list.slice(0, 7)); // First 7 time slots (3-hourly steps)
      } catch (err) {
        console.error('Weather API error:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (!current) return <p>No weather data available.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Weather in {CITY}</h2>
      <p className="mb-4">
        🌡 {current.main.temp}°C — {current.weather[0].description}
      </p>

      <h3 className="font-semibold mb-2">Forecast (Next 21 Hours)</h3>
      <ul className="grid grid-cols-2 gap-2 text-sm">
        {forecast.map((f, index) => (
          <li key={index} className="border p-2 rounded">
            <p>
              <strong>{f.dt_txt}</strong>
            </p>
            <p>
              {f.main.temp}°C — {f.weather[0].main}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherForecast;
