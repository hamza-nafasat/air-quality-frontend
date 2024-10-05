import DioxideIcon from "../assets/svgs/devices/DioxideIcon";
import buildingImg from "../assets/images/buildings/greyBuilding.png";

export const buildings = [
  {
    id: 1,
    name: "Building 1",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 2,
    name: "Building 2",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 3,
    name: "Building 3",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 4,
    name: "Building 4",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 5,
    name: "Building 5",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 6,
    name: "Building 6",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
];
export const floors = [
  {
    id: 1,
    name: "Floor 1",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 2,
    name: "Floor 2",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 3,
    name: "Floor 3",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 4,
    name: "Floor 4",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 5,
    name: "Floor 5",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
  {
    id: 6,
    name: "Floor 6",
    address: "Lahore",
    sensors: 123,
    temperature: 89,
    tvoc: 96,
    co2: 66,
  },
];

export const specificationList = [
  {
    name: "AQ Generator",
    voltage: "24 VDC",
    alternator: "80 Amps",
    cylinder: 6,
    type: "In-Line",
    air: "Air-Cooled",
  },
];

export const temperatureSpecification = [
  {
    voltage: "3 to 5.5",
    temperature: "-55 To 155",
    accuracy: +0.5,
    resolution: "9bits To 12bits(Selectable)",
  },
];

export const deviceStatus = [
  { type: "Carbon Dioxide", status: "450PPM" },
  { type: "Humidity", status: "450PPM" },
  { type: "Methane", status: "450PPM" },
  { type: "Carbon Monoxide", status: "450PPM" },
  { type: "Temperature", status: "450PPM" },
  { type: "LPG", status: "450PPM", from: 11 },
];

export const alerts = [
  {
    type: "Attention",
    message:
      " A sensor is currently disconnected. Please check the device and reconnect.",
  },
  {
    type: "Notification",
    message:
      " A sensor is currently disconnected. Please check the device and reconnect.",
  },
  {
    type: "Warning",
    message:
      " A sensor is currently disconnected. Please check the device and reconnect.",
  },
  {
    type: "Notification",
    message:
      " A sensor is currently disconnected. Please check the device and reconnect.",
  },
  {
    type: "Warning",
    message:
      " A sensor is currently disconnected. Please check the device and reconnect.",
  },
];

export const buildingViewStatus = [
  { type: "Active Alarms", status: 16, from: 8 },
  { type: "Floor Temperature", status: "20 C", from: 8 },
  { type: "Equipment", status: "98%", from: 8 },
  { type: "Energy", status: "12235 kWh", from: 8 },
  { type: "CO2", status: "539 ppm", from: 8 },
  { type: "Occupancy", status: 80, from: 8 },
];
export const floorViewStatus = [
  { type: "Active Alarms", status: 16, from: 8 },
  { type: "Humidity", status: "50%", from: 8 },
  { type: "Methane(CH)", status: "990ppm", from: 8 },
  { type: "Carbon Monoxide", status: "12235 kWh", from: 8 },
  { type: "CO2", status: "539ppm", from: 8 },
  { type: "LPG", status: "90ppm", from: 8 },
];

export const sensorData = [
  {
    _id: "64d6hbn1loopf1mdvvak8yt01",
    sensorName: "Temperature Sensor 01",
    ip: "192.168.1.1",
    url: "http://example.com/sensors",
    port: 8030,
    type: "Temperature",
    location: "Warehouse A",
    status: "Active",
  },
  {
    _id: "64d6hbn2loopf2mdvvak8yt02",
    sensorName: "Humidity Sensor 02",
    ip: "192.168.1.2",
    url: "http://example.com/sensors",
    port: 8031,
    type: "Humidity",
    location: "Warehouse B",
    status: "In-Active",
  },
  {
    _id: "64d6hbn3loopf3mdvvak8yt03",
    sensorName: "Pressure Sensor 03",
    ip: "192.168.1.3",
    url: "http://example.com/sensors",
    port: 8032,
    type: "Pressure",
    location: "Warehouse C",
    status: "Active",
  },
  {
    _id: "64d6hbn4loopf4mdvvak8yt04",
    sensorName: "Temperature Sensor 04",
    ip: "192.168.1.4",
    url: "http://example.com/sensors",
    port: 8033,
    type: "Temperature",
    location: "Warehouse D",
    status: "In-Active",
  },
  {
    _id: "64d6hbn5loopf5mdvvak8yt05",
    sensorName: "Humidity Sensor 05",
    ip: "192.168.1.5",
    url: "http://example.com/sensors",
    port: 8034,
    type: "Humidity",
    location: "Warehouse E",
    status: "Active",
  },
  {
    _id: "64d6hbn6loopf6mdvvak8yt06",
    sensorName: "Pressure Sensor 06",
    ip: "192.168.1.6",
    url: "http://example.com/sensors",
    port: 8035,
    type: "Pressure",
    location: "Warehouse F",
    status: "In-Active",
  },
  {
    _id: "64d6hbn7loopf7mdvvak8yt07",
    sensorName: "Temperature Sensor 07",
    ip: "192.168.1.7",
    url: "http://example.com/sensors",
    port: 8036,
    type: "Temperature",
    location: "Warehouse G",
    status: "Active",
  },
];

// Subscription Card

export const planCards = [
  {
    title: "Starter",
    subtitle: "Basic Builder",
    price: "29",
    type: "monthly",
    featuresList: [
      "Manage up to 3 buildings",
      "Connect up to 10 sensors",
      "Basic real-time monitoring",
      "Standard reporting tools",
      "Email support",
    ],
    description:
      "Start with the essentials. Ideal for small teams or single buildings, this plan provides the foundational tools to get your smart building up and running efficiently",
    bg: "#B2FFB0",
    btnBg: "#008B26",
  },
  {
    title: "Standard",
    subtitle: "Pro Manager",

    price: "39",
    type: "yearly",
    featuresList: [
      "Manage up to 3 buildings",
      "Connect up to 10 sensors",
      "Basic real-time monitoring",
      "Standard reporting tools",
      "Email support",
    ],
    description:
      "Start with the essentials. Ideal for small teams or single buildings, this plan provides the foundational tools to get your smart building up and running efficiently",
    bg: "#81CEFF",
    btnBg: "#0067A9",
  },
  {
    title: "Premium",
    subtitle: "Basic Plan",

    price: "49",
    type: "lifetime",
    featuresList: [
      "Manage up to 3 buildings",
      "Connect up to 10 sensors",
      "Basic real-time monitoring",
      "Standard reporting tools",
      "Email support",
    ],
    description:
      "Start with the essentials. Ideal for small teams or single buildings, this plan provides the foundational tools to get your smart building up and running efficiently",
    bg: "#FFCF87",
    btnBg: "#F2AC44",
  },
];

export const reportsLists = [
  {
    title: "Building 1",
    location: "1051 18th St NW, Washington, DC 20006",
    totalSensors: "110",
    image: buildingImg,
    listData: [
      {
        date: "02-Aug-202403:15 pm",
        temperature: "16",
        tvoc: "16",
        co2: "16",
        humidity: "22",
        co: "40",
        ch4: "49",
        performance: "bad",
      },
      {
        date: "03-Aug-2024-01:42 pm",
        temperature: "48",
        tvoc: "60",
        co2: "18",
        humidity: "55",
        co: "42",
        ch4: "50",
        performance: "average",
      },
      {
        date: "04-Aug-2024-10:23 am",
        temperature: "19",
        tvoc: "22",
        co2: "14",
        humidity: "14",
        co: "45",
        ch4: "12",
        performance: "good",
      },
      {
        date: "05-Aug-2024-04:05 pm",
        temperature: "11",
        tvoc: "28",
        co2: "23",
        humidity: "60",
        co: "12",
        ch4: "48",
        performance: "bad",
      },
      {
        date: "06-Aug-2024-11:47 am",
        temperature: "26",
        tvoc: "25",
        co2: "41",
        humidity: "11",
        co: "41",
        ch4: "11",
        performance: "average",
      },
      {
        date: "07-Aug-2024-08:30 am",
        temperature: "20",
        tvoc: "64",
        co2: "90",
        humidity: "33",
        co: "12",
        ch4: "46",
        performance: "good",
      },
      {
        date: "07-Aug-2024-02:10 pm",
        temperature: "20",
        tvoc: "64",
        co2: "90",
        humidity: "33",
        co: "12",
        ch4: "46",
        performance: "good",
      },
      {
        date: "07-Aug-2024-09:45 am",
        temperature: "20",
        tvoc: "64",
        co2: "90",
        humidity: "33",
        co: "12",
        ch4: "46",
        performance: "good",
      },
      // (Additional repetitive dates trimmed for brevity)
    ],
  },
  {
    title: "Building 2",
    location: "1234 Silicon Valley, CA 94043",
    totalSensors: "150",
    image: buildingImg,
    listData: [
      {
        date: "01-Sep-2024-01:30 pm",
        temperature: "42",
        tvoc: "25",
        co2: "39",
        humidity: "50",
        co: "14",
        ch4: "22",
        performance: "good",
      },
      {
        date: "02-Sep-2024-03:50 pm",
        temperature: "11",
        tvoc: "67",
        co2: "38",
        humidity: "33",
        co: "37",
        ch4: "44",
        performance: "average",
      },
      {
        date: "03-Sep-2024-11:15 am",
        temperature: "24",
        tvoc: "10",
        co2: "25",
        humidity: "53",
        co: "14",
        ch4: "43",
        performance: "bad",
      },
      {
        date: "04-Sep-2024-08:55 am",
        temperature: "11",
        tvoc: "62",
        co2: "37",
        humidity: "11",
        co: "39",
        ch4: "46",
        performance: "good",
      },
      {
        date: "05-Sep-2024-04:20 pm",
        temperature: "59",
        tvoc: "14",
        co2: "16",
        humidity: "56",
        co: "16",
        ch4: "34",
        performance: "average",
      },
      {
        date: "06-Sep-2024-07:40 pm",
        temperature: "20",
        tvoc: "63",
        co2: "24",
        humidity: "12",
        co: "89",
        ch4: "49",
        performance: "bad",
      },
    ],
  },
  {
    title: "Building 3",
    location: "9876 Startup Ln, Austin, TX 73301",
    totalSensors: "200",
    image: buildingImg,
    listData: [
      {
        date: "15-Oct-2024-09:05 am",
        temperature: "5",
        tvoc: "11",
        co2: "83",
        humidity: "11",
        co: "42",
        ch4: "50",
        performance: "good",
      },
      {
        date: "16-Oct-2024-12:47 pm",
        temperature: "20",
        tvoc: "72",
        co2: "32",
        humidity: "56",
        co: "90",
        ch4: "34",
        performance: "average",
      },
      {
        date: "17-Oct-2024-02:25 pm",
        temperature: "47",
        tvoc: "14",
        co2: "17",
        humidity: "14",
        co: "44",
        ch4: "52",
        performance: "bad",
      },
      {
        date: "18-Oct-2024-11:10 am",
        temperature: "24",
        tvoc: "69",
        co2: "20",
        humidity: "58",
        co: "40",
        ch4: "12",
        performance: "good",
      },
      {
        date: "19-Oct-2024-10:35 am",
        temperature: "23",
        tvoc: "28",
        co2: "19",
        humidity: "59",
        co: "78",
        ch4: "47",
        performance: "average",
      },
      {
        date: "20-Oct-2024-04:50 pm",
        temperature: "22",
        tvoc: "67",
        co2: "78",
        humidity: "16",
        co: "38",
        ch4: "12",
        performance: "excellent",
      },
    ],
  },
];

export const country = [
  { value: "Afghanistan", option: "Afghanistan - AF" },
  { value: "Albania", option: "Albania - AL" },
  { value: "Algeria", option: "Algeria - DZ" },
  { value: "Andorra", option: "Andorra - AD" },
  { value: "Angola", option: "Angola - AO" },
  { value: "Antigua and Barbuda", option: "Antigua and Barbuda - AG" },
  { value: "Argentina", option: "Argentina - AR" },
  { value: "Armenia", option: "Armenia - AM" },
  { value: "Australia", option: "Australia - AU" },
  { value: "Austria", option: "Austria - AT" },
  { value: "Azerbaijan", option: "Azerbaijan - AZ" },
  { value: "Bahamas", option: "Bahamas - BS" },
  { value: "Bahrain", option: "Bahrain - BH" },
  { value: "Bangladesh", option: "Bangladesh - BD" },
  { value: "Barbados", option: "Barbados - BB" },
  { value: "Belarus", option: "Belarus - BY" },
  { value: "Belgium", option: "Belgium - BE" },
  { value: "Belize", option: "Belize - BZ" },
  { value: "Benin", option: "Benin - BJ" },
  { value: "Bhutan", option: "Bhutan - BT" },
  { value: "Bolivia", option: "Bolivia - BO" },
  { value: "Bosnia and Herzegovina", option: "Bosnia and Herzegovina - BA" },
  { value: "Botswana", option: "Botswana - BW" },
  { value: "Brazil", option: "Brazil - BR" },
  { value: "Brunei", option: "Brunei - BN" },
  { value: "Bulgaria", option: "Bulgaria - BG" },
  { value: "Burkina Faso", option: "Burkina Faso - BF" },
  { value: "Burundi", option: "Burundi - BI" },
  { value: "Cabo Verde", option: "Cabo Verde - CV" },
  { value: "Cambodia", option: "Cambodia - KH" },
  { value: "Cameroon", option: "Cameroon - CM" },
  { value: "Canada", option: "Canada - CA" },
  {
    value: "Central African Republic",
    option: "Central African Republic - CF",
  },
  { value: "Chad", option: "Chad - TD" },
  { value: "Chile", option: "Chile - CL" },
  { value: "China", option: "China - CN" },
  { value: "Colombia", option: "Colombia - CO" },
  { value: "Comoros", option: "Comoros - KM" },
  { value: "Congo", option: "Congo - CG" },
  { value: "Costa Rica", option: "Costa Rica - CR" },
  { value: "Croatia", option: "Croatia - HR" },
  { value: "Cuba", option: "Cuba - CU" },
  { value: "Cyprus", option: "Cyprus - CY" },
  { value: "Czech Republic", option: "Czech Republic - CZ" },
  { value: "Denmark", option: "Denmark - DK" },
  { value: "Djibouti", option: "Djibouti - DJ" },
  { value: "Dominica", option: "Dominica - DM" },
  { value: "Dominican Republic", option: "Dominican Republic - DO" },
  { value: "East Timor", option: "East Timor - TL" },
  { value: "Ecuador", option: "Ecuador - EC" },
  { value: "Egypt", option: "Egypt - EG" },
  { value: "El Salvador", option: "El Salvador - SV" },
  { value: "Equatorial Guinea", option: "Equatorial Guinea - GQ" },
  { value: "Eritrea", option: "Eritrea - ER" },
  { value: "Estonia", option: "Estonia - EE" },
  { value: "Eswatini", option: "Eswatini - SZ" },
  { value: "Ethiopia", option: "Ethiopia - ET" },
  { value: "Fiji", option: "Fiji - FJ" },
  { value: "Finland", option: "Finland - FI" },
  { value: "France", option: "France - FR" },
  { value: "Gabon", option: "Gabon - GA" },
  { value: "Gambia", option: "Gambia - GM" },
  { value: "Georgia", option: "Georgia - GE" },
  { value: "Germany", option: "Germany - DE" },
  { value: "Ghana", option: "Ghana - GH" },
  { value: "Greece", option: "Greece - GR" },
  { value: "Grenada", option: "Grenada - GD" },
  { value: "Guatemala", option: "Guatemala - GT" },
  { value: "Guinea", option: "Guinea - GN" },
  { value: "Guinea-Bissau", option: "Guinea-Bissau - GW" },
  { value: "Guyana", option: "Guyana - GY" },
  { value: "Haiti", option: "Haiti - HT" },
  { value: "Honduras", option: "Honduras - HN" },
  { value: "Hungary", option: "Hungary - HU" },
  { value: "Iceland", option: "Iceland - IS" },
  { value: "India", option: "India - IN" },
  { value: "Indonesia", option: "Indonesia - ID" },
  { value: "Iran", option: "Iran - IR" },
  { value: "Iraq", option: "Iraq - IQ" },
  { value: "Ireland", option: "Ireland - IE" },
  { value: "Israel", option: "Israel - IL" },
  { value: "Italy", option: "Italy - IT" },
  { value: "Jamaica", option: "Jamaica - JM" },
  { value: "Japan", option: "Japan - JP" },
  { value: "Jordan", option: "Jordan - JO" },
  { value: "Kazakhstan", option: "Kazakhstan - KZ" },
  { value: "Kenya", option: "Kenya - KE" },
  { value: "Kiribati", option: "Kiribati - KI" },
  { value: "Korea, North", option: "Korea, North - KP" },
  { value: "Korea, South", option: "Korea, South - KR" },
  { value: "Kuwait", option: "Kuwait - KW" },
  { value: "Kyrgyzstan", option: "Kyrgyzstan - KG" },
  { value: "Laos", option: "Laos - LA" },
  { value: "Latvia", option: "Latvia - LV" },
  { value: "Lebanon", option: "Lebanon - LB" },
  { value: "Lesotho", option: "Lesotho - LS" },
  { value: "Liberia", option: "Liberia - LR" },
  { value: "Libya", option: "Libya - LY" },
  { value: "Liechtenstein", option: "Liechtenstein - LI" },
  { value: "Lithuania", option: "Lithuania - LT" },
  { value: "Luxembourg", option: "Luxembourg - LU" },
  { value: "Madagascar", option: "Madagascar - MG" },
  { value: "Malawi", option: "Malawi - MW" },
  { value: "Malaysia", option: "Malaysia - MY" },
  { value: "Maldives", option: "Maldives - MV" },
  { value: "Mali", option: "Mali - ML" },
  { value: "Malta", option: "Malta - MT" },
  { value: "Marshall Islands", option: "Marshall Islands - MH" },
  { value: "Mauritania", option: "Mauritania - MR" },
  { value: "Mauritius", option: "Mauritius - MU" },
  { value: "Mexico", option: "Mexico - MX" },
  { value: "Micronesia", option: "Micronesia - FM" },
  { value: "Moldova", option: "Moldova - MD" },
  { value: "Monaco", option: "Monaco - MC" },
  { value: "Mongolia", option: "Mongolia - MN" },
  { value: "Montenegro", option: "Montenegro - ME" },
  { value: "Morocco", option: "Morocco - MA" },
  { value: "Mozambique", option: "Mozambique - MZ" },
  { value: "Myanmar", option: "Myanmar - MM" },
  { value: "Namibia", option: "Namibia - NA" },
  { value: "Nauru", option: "Nauru - NR" },
  { value: "Nepal", option: "Nepal - NP" },
  { value: "Netherlands", option: "Netherlands - NL" },
  { value: "New Zealand", option: "New Zealand - NZ" },
  { value: "Nicaragua", option: "Nicaragua - NI" },
  { value: "Niger", option: "Niger - NE" },
  { value: "Nigeria", option: "Nigeria - NG" },
  { value: "North Macedonia", option: "North Macedonia - MK" },
  { value: "Norway", option: "Norway - NO" },
  { value: "Oman", option: "Oman - OM" },
  { value: "Pakistan", option: "Pakistan - PK" },
  { value: "Palau", option: "Palau - PW" },
  { value: "Panama", option: "Panama - PA" },
  { value: "Papua New Guinea", option: "Papua New Guinea - PG" },
  { value: "Paraguay", option: "Paraguay - PY" },
  { value: "Peru", option: "Peru - PE" },
  { value: "Philippines", option: "Philippines - PH" },
  { value: "Poland", option: "Poland - PL" },
  { value: "Portugal", option: "Portugal - PT" },
  { value: "Qatar", option: "Qatar - QA" },
  { value: "Romania", option: "Romania - RO" },
  { value: "Russia", option: "Russia - RU" },
  { value: "Rwanda", option: "Rwanda - RW" },
  { value: "Saint Kitts and Nevis", option: "Saint Kitts and Nevis - KN" },
  { value: "Saint Lucia", option: "Saint Lucia - LC" },
  {
    value: "Saint Vincent and the Grenadines",
    option: "Saint Vincent and the Grenadines - VC",
  },
  { value: "Samoa", option: "Samoa - WS" },
  { value: "San Marino", option: "San Marino - SM" },
  { value: "Sao Tome and Principe", option: "Sao Tome and Principe - ST" },
  { value: "Saudi Arabia", option: "Saudi Arabia - SA" },
  { value: "Senegal", option: "Senegal - SN" },
  { value: "Serbia", option: "Serbia - RS" },
  { value: "Seychelles", option: "Seychelles - SC" },
  { value: "Sierra Leone", option: "Sierra Leone - SL" },
  { value: "Singapore", option: "Singapore - SG" },
  { value: "Slovakia", option: "Slovakia - SK" },
  { value: "Slovenia", option: "Slovenia - SI" },
  { value: "Solomon Islands", option: "Solomon Islands - SB" },
  { value: "Somalia", option: "Somalia - SO" },
  { value: "South Africa", option: "South Africa - ZA" },
  { value: "South Sudan", option: "South Sudan - SS" },
  { value: "Spain", option: "Spain - ES" },
  { value: "Sri Lanka", option: "Sri Lanka - LK" },
  { value: "Sudan", option: "Sudan - SD" },
  { value: "Suriname", option: "Suriname - SR" },
  { value: "Sweden", option: "Sweden - SE" },
  { value: "Switzerland", option: "Switzerland - CH" },
  { value: "Syria", option: "Syria - SY" },
  { value: "Taiwan", option: "Taiwan - TW" },
  { value: "Tajikistan", option: "Tajikistan - TJ" },
  { value: "Tanzania", option: "Tanzania - TZ" },
  { value: "Thailand", option: "Thailand - TH" },
  { value: "Togo", option: "Togo - TG" },
  { value: "Tonga", option: "Tonga - TO" },
  { value: "Trinidad and Tobago", option: "Trinidad and Tobago - TT" },
  { value: "Tunisia", option: "Tunisia - TN" },
  { value: "Turkey", option: "Turkey - TR" },
  { value: "Turkmenistan", option: "Turkmenistan - TM" },
  { value: "Tuvalu", option: "Tuvalu - TV" },
  { value: "Uganda", option: "Uganda - UG" },
  { value: "Ukraine", option: "Ukraine - UA" },
  { value: "United Arab Emirates", option: "United Arab Emirates - AE" },
  { value: "United Kingdom", option: "United Kingdom - GB" },
  { value: "United States", option: "United States - US" },
  { value: "Uruguay", option: "Uruguay - UY" },
  { value: "Uzbekistan", option: "Uzbekistan - UZ" },
  { value: "Vanuatu", option: "Vanuatu - VU" },
  { value: "Vatican City", option: "Vatican City - VA" },
  { value: "Venezuela", option: "Venezuela - VE" },
  { value: "Vietnam", option: "Vietnam - VN" },
  { value: "Yemen", option: "Yemen - YE" },
  { value: "Zambia", option: "Zambia - ZM" },
  { value: "Zimbabwe", option: "Zimbabwe - ZW" },
];

export const subscriptionHistoryData = [
  {
    _id: "123123sd",
    date: "24 June 2024",
    plan: "Standard",
    amount: "19.99",
    status: "expired",
    invoice: "",
  },
  {
    _id: "456456gh",
    date: "15 July 2024",
    plan: "Premium",
    amount: "29.99",
    status: "active",
    invoice: "INV-2024-001",
  },
  {
    _id: "789789jk",
    date: "01 Aug 2024",
    plan: "Standard",
    amount: "19.99",
    status: "cancelled",
    invoice: "INV-2024-002",
  },
  {
    _id: "101010ab",
    date: "12 Sept 2024",
    plan: "Basic",
    amount: "9.99",
    status: "active",
    invoice: "INV-2024-003",
  },
  {
    _id: "121212cd",
    date: "30 October 2024",
    plan: "Premium",
    amount: "29.99",
    status: "expired",
    invoice: "",
  },
  {
    _id: "131313ef",
    date: "05 November 2024",
    plan: "Standard",
    amount: "19.99",
    status: "active",
    invoice: "INV-2024-004",
  },
];