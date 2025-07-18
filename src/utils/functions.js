// // utils.js
// export const getDailyAverageAirQuality = (data) => {
//   if (
//     !data ||
//     !Array.isArray(data.AllBuildingWeeklyAverageAirQuality) ||
//     data.AllBuildingWeeklyAverageAirQuality.length === 0
//   ) {
//     return [];
//   }

//   return data.AllBuildingWeeklyAverageAirQuality.map((entry) => {
//     const values = Object.values(entry);
//     const avg = values.reduce((sum, val) => sum + (Number(val) || 0), 0) / values.length;
//     return parseFloat(avg.toFixed(2));
//   });
// };

// utils.js
export const getDailyAverageAirQuality = (data, loading, error) => {
  if (loading) return []; // wait until loading is done
  if (error) {
    console.error('Error loading air quality data:', error);
    return [];
  }

  if (
    !data ||
    !Array.isArray(data.AllBuildingWeeklyAverageAirQuality) ||
    data.AllBuildingWeeklyAverageAirQuality.length === 0
  ) {
    return [];
  }

  return data.AllBuildingWeeklyAverageAirQuality.map((entry) => {
    const values = Object.values(entry);
    const avg = values.reduce((sum, val) => sum + (Number(val) || 0), 0) / values.length;
    return parseFloat(avg.toFixed(2));
  });
};
