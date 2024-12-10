import { loadStripe } from "@stripe/stripe-js";

const countryToCurrency = {
  AF: "AFN", // Afghanistan
  AL: "ALL", // Albania
  DZ: "DZD", // Algeria
  AS: "USD", // American Samoa
  AD: "EUR", // Andorra
  AO: "AOA", // Angola
  AR: "ARS", // Argentina
  AM: "AMD", // Armenia
  AU: "AUD", // Australia
  AT: "EUR", // Austria
  AZ: "AZN", // Azerbaijan
  BS: "BSD", // Bahamas
  BH: "BHD", // Bahrain
  BD: "BDT", // Bangladesh
  BB: "BBD", // Barbados
  BY: "BYN", // Belarus
  BE: "EUR", // Belgium
  BZ: "BZD", // Belize
  BJ: "XOF", // Benin
  BT: "BTN", // Bhutan
  BO: "BOB", // Bolivia
  BA: "BAM", // Bosnia and Herzegovina
  BW: "BWP", // Botswana
  BR: "BRL", // Brazil
  BN: "BND", // Brunei
  BG: "BGN", // Bulgaria
  BF: "XOF", // Burkina Faso
  BI: "BIF", // Burundi
  KH: "KHR", // Cambodia
  CM: "XAF", // Cameroon
  CA: "CAD", // Canada
  CV: "CVE", // Cape Verde
  CF: "XAF", // Central African Republic
  TD: "XAF", // Chad
  CL: "CLP", // Chile
  CN: "CNY", // China
  CO: "COP", // Colombia
  KM: "KMF", // Comoros
  CG: "XAF", // Congo
  CD: "CDF", // Congo (DRC)
  CR: "CRC", // Costa Rica
  CI: "XOF", // Côte d’Ivoire
  HR: "HRK", // Croatia
  CU: "CUP", // Cuba
  CY: "EUR", // Cyprus
  CZ: "CZK", // Czech Republic
  DK: "DKK", // Denmark
  DJ: "DJF", // Djibouti
  DM: "XCD", // Dominica
  DO: "DOP", // Dominican Republic
  EC: "USD", // Ecuador
  EG: "EGP", // Egypt
  SV: "USD", // El Salvador
  GQ: "XAF", // Equatorial Guinea
  ER: "ERN", // Eritrea
  EE: "EUR", // Estonia
  ET: "ETB", // Ethiopia
  FJ: "FJD", // Fiji
  FI: "EUR", // Finland
  FR: "EUR", // France
  GA: "XAF", // Gabon
  GM: "GMD", // Gambia
  GE: "GEL", // Georgia
  DE: "EUR", // Germany
  GH: "GHS", // Ghana
  GR: "EUR", // Greece
  GD: "XCD", // Grenada
  GT: "GTQ", // Guatemala
  GN: "GNF", // Guinea
  GW: "XOF", // Guinea-Bissau
  GY: "GYD", // Guyana
  HT: "HTG", // Haiti
  HN: "HNL", // Honduras
  HK: "HKD", // Hong Kong
  HU: "HUF", // Hungary
  IS: "ISK", // Iceland
  IN: "INR", // India
  ID: "IDR", // Indonesia
  IR: "IRR", // Iran
  IQ: "IQD", // Iraq
  IE: "EUR", // Ireland
  IL: "ILS", // Israel
  IT: "EUR", // Italy
  JM: "JMD", // Jamaica
  JP: "JPY", // Japan
  JO: "JOD", // Jordan
  KZ: "KZT", // Kazakhstan
  KE: "KES", // Kenya
  KI: "AUD", // Kiribati
  KP: "KPW", // North Korea
  KR: "KRW", // South Korea
  KW: "KWD", // Kuwait
  KG: "KGS", // Kyrgyzstan
  LA: "LAK", // Laos
  LV: "EUR", // Latvia
  LB: "LBP", // Lebanon
  LS: "LSL", // Lesotho
  LR: "LRD", // Liberia
  LY: "LYD", // Libya
  LI: "CHF", // Liechtenstein
  LT: "EUR", // Lithuania
  LU: "EUR", // Luxembourg
  MG: "MGA", // Madagascar
  MW: "MWK", // Malawi
  MY: "MYR", // Malaysia
  MV: "MVR", // Maldives
  ML: "XOF", // Mali
  MT: "EUR", // Malta
  MH: "USD", // Marshall Islands
  MR: "MRU", // Mauritania
  MU: "MUR", // Mauritius
  MX: "MXN", // Mexico
  FM: "USD", // Micronesia
  MD: "MDL", // Moldova
  MC: "EUR", // Monaco
  MN: "MNT", // Mongolia
  ME: "EUR", // Montenegro
  MA: "MAD", // Morocco
  MZ: "MZN", // Mozambique
  MM: "MMK", // Myanmar
  NA: "NAD", // Namibia
  NR: "AUD", // Nauru
  NP: "NPR", // Nepal
  NL: "EUR", // Netherlands
  NZ: "NZD", // New Zealand
  NI: "NIO", // Nicaragua
  NE: "XOF", // Niger
  NG: "NGN", // Nigeria
  MK: "MKD", // North Macedonia
  NO: "NOK", // Norway
  OM: "OMR", // Oman
  PK: "PKR", // Pakistan
  PW: "USD", // Palau
  PS: "ILS", // Palestine
  PA: "USD", // Panama
  PG: "PGK", // Papua New Guinea
  PY: "PYG", // Paraguay
  PE: "PEN", // Peru
  PH: "PHP", // Philippines
  PL: "PLN", // Poland
  PT: "EUR", // Portugal
  QA: "QAR", // Qatar
  RO: "RON", // Romania
  RU: "RUB", // Russia
  RW: "RWF", // Rwanda
  WS: "WST", // Samoa
  SA: "SAR", // Saudi Arabia
  SN: "XOF", // Senegal
  RS: "RSD", // Serbia
  SC: "SCR", // Seychelles
  SL: "SLL", // Sierra Leone
  SG: "SGD", // Singapore
  SK: "EUR", // Slovakia
  SI: "EUR", // Slovenia
  SB: "SBD", // Solomon Islands
  SO: "SOS", // Somalia
  ZA: "ZAR", // South Africa
  ES: "EUR", // Spain
  LK: "LKR", // Sri Lanka
  SD: "SDG", // Sudan
  SR: "SRD", // Suriname
  SE: "SEK", // Sweden
  CH: "CHF", // Switzerland
  SY: "SYP", // Syria
  TW: "TWD", // Taiwan
  TZ: "TZS", // Tanzania
  TH: "THB", // Thailand
  TG: "XOF", // Togo
  TO: "TOP", // Tonga
  TT: "TTD", // Trinidad and Tobago
  TN: "TND", // Tunisia
  TR: "TRY", // Turkey
  TM: "TMT", // Turkmenistan
  UG: "UGX", // Uganda
  UA: "UAH", // Ukraine
  AE: "AED", // United Arab Emirates
  GB: "GBP", // United Kingdom
  US: "USD", // United States
  UY: "UYU", // Uruguay
  UZ: "UZS", // Uzbekistan
  VU: "VUV", // Vanuatu
  VE: "VES", // Venezuela
  VN: "VND", // Vietnam
  YE: "YER", // Yemen
  ZM: "ZMW", // Zambia
  ZW: "ZWL", // Zimbabwe
};
const COUNTRY_TOKEN = import.meta.env.VITE_GET_COUNTRY_TOKEN;
const CURRENCY_TOKEN = import.meta.env.VITE_GET_CURRENCY_TOKEN;
const STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY;

export const stripePromise = loadStripe(STRIPE_SECRET_KEY);

async function getUserCountry() {
  const API_URL = `https://ipinfo.io/json?token=${COUNTRY_TOKEN}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.country;
  } catch (error) {
    console.error("Failed to fetch user country:", error);
    return "US";
  }
}

async function getExchangeRates(baseCurrency = "USD") {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${CURRENCY_TOKEN}/latest/${baseCurrency}`);
    const data = await response.json();
    console.log(data); // Check what the API returns
    return data.conversion_rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
}
async function getLocalizedPrice(basePrice, baseCurrency = "USD") {
  if (!COUNTRY_TOKEN || !CURRENCY_TOKEN) throw new Error("Missing env variables");
  const userCountry = await getUserCountry();
  const userCurrency = countryToCurrency[userCountry] || baseCurrency;

  // Get exchange rates
  const rates = await getExchangeRates(baseCurrency);
  console.log(rates);

  // Calculate price in user's currency
  const conversionRate = rates[userCurrency];
  const localizedPrice = (basePrice * conversionRate).toFixed(2);

  return {
    price: localizedPrice,
    currency: userCurrency,
  };
}

export { getLocalizedPrice };
