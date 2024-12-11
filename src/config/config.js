const config = Object.freeze({
  SERVER_URL: import.meta.env.VITE_SERVER_URL,
  API_URL: import.meta.env.VITE_API_URL,
  COUNTRY_TOKEN: import.meta.env.VITE_GET_COUNTRY_TOKEN,
  CURRENCY_TOKEN: import.meta.env.VITE_GET_CURRENCY_TOKEN,
  STRIPE_SECRET_KEY: import.meta.env.VITE_STRIPE_SECRET_KEY,
  WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
});

const getEnv = (key) => {
  const value = config[key];
  // console.log("key", key, "value", value);
  if (!value) throw new Error(`Config ${key} not found`);
  return value;
};

export default getEnv;
