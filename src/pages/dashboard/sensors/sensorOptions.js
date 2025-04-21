const sensorTypes = [
  {
    option: "Temperature",
    value: "temperature",
  },
  {
    option: "Humidity",
    value: "humidity",
  },
  {
    option: "Co",
    value: "co",
  },
  {
    option: "Co2",
    value: "co2",
  },
  {
    option: "Ch",
    value: "ch",
  },
  {
    option: "TVOC",
    value: "tvoc",
  },
];

const sensorOptionsForMultiSelect = [
  { value: "temperature", label: "Temperature" },
  { value: "humidity", label: "Humidity" },
  { value: "co", label: "Co" },
  { value: "co2", label: "Co2" },
  { value: "ch", label: "Ch" },
  { value: "tvoc", label: "Tvoc" },
];

export { sensorTypes, sensorOptionsForMultiSelect };
