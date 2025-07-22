const maxValues = {
  'Current Temperature': 150,
  'Current Humidity': 100,
  CO: 1000,
  CH: 100,
  TVOC: 10000,
  CO2: 50000,
};

/**
 * Get color based on current value and its max value
 * Green: Good (0–33%)
 * Yellow: Average (34–66%)
 * Red: Bad (67–100%)
 */
function getStatusColor(parameter, value) {
  const max = maxValues[parameter];
  if (max === undefined) return '#ccc'; // default/fallback

  const percentage = (value / max) * 100;

  if (percentage <= 33) {
    return '#64ED23'; // Green
  } else if (percentage <= 66) {
    return '#f1a634'; // Yellow
  } else {
    return '#ee0e00'; // Red
  }
}

export default getStatusColor;
