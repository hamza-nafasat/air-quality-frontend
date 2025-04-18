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
    message: " A sensor is currently disconnected. Please check the device and reconnect.",
  },
  {
    type: "Notification",
    message: " A sensor is currently disconnected. Please check the device and reconnect.",
  },
  {
    type: "Warning",
    message: " A sensor is currently disconnected. Please check the device and reconnect.",
  },
  {
    type: "Notification",
    message: " A sensor is currently disconnected. Please check the device and reconnect.",
  },
  {
    type: "Warning",
    message: " A sensor is currently disconnected. Please check the device and reconnect.",
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
  { type: "temperature", name: "Temprature", status: 16, from: 8 },
  { type: "humidity", name: "Humidity", status: "50%", from: 8 },
  { type: "ch", name: "Methylidyne radica", status: "990ppm", from: 8 },
  { type: "co", name: "Carbon monoxide", status: "12235 kWh", from: 8 },
  { type: "co2", name: "Carbon dioxide", status: "539ppm", from: 8 },
  { type: "tvoc", name: "Temprature", status: "90ppm", from: 8 },
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
  { value: "afghanistan", option: "Afghanistan - AF" },
  { value: "albania", option: "Albania - AL" },
  { value: "algeria", option: "Algeria - DZ" },
  { value: "andorra", option: "Andorra - AD" },
  { value: "angola", option: "Angola - AO" },
  { value: "antigua and barbuda", option: "Antigua and Barbuda - AG" },
  { value: "argentina", option: "Argentina - AR" },
  { value: "armenia", option: "Armenia - AM" },
  { value: "australia", option: "Australia - AU" },
  { value: "austria", option: "Austria - AT" },
  { value: "azerbaijan", option: "Azerbaijan - AZ" },
  { value: "bahamas", option: "Bahamas - BS" },
  { value: "bahrain", option: "Bahrain - BH" },
  { value: "bangladesh", option: "Bangladesh - BD" },
  { value: "barbados", option: "Barbados - BB" },
  { value: "belarus", option: "Belarus - BY" },
  { value: "belgium", option: "Belgium - BE" },
  { value: "belize", option: "Belize - BZ" },
  { value: "benin", option: "Benin - BJ" },
  { value: "bhutan", option: "Bhutan - BT" },
  { value: "bolivia", option: "Bolivia - BO" },
  { value: "bosnia and herzegovina", option: "Bosnia and Herzegovina - BA" },
  { value: "botswana", option: "Botswana - BW" },
  { value: "brazil", option: "Brazil - BR" },
  { value: "brunei", option: "Brunei - BN" },
  { value: "bulgaria", option: "Bulgaria - BG" },
  { value: "burkina faso", option: "Burkina Faso - BF" },
  { value: "burundi", option: "Burundi - BI" },
  { value: "cabo verde", option: "Cabo Verde - CV" },
  { value: "cambodia", option: "Cambodia - KH" },
  { value: "cameroon", option: "Cameroon - CM" },
  { value: "canada", option: "Canada - CA" },
  { value: "central african republic", option: "Central African Republic - CF" },
  { value: "chad", option: "Chad - TD" },
  { value: "chile", option: "Chile - CL" },
  { value: "china", option: "China - CN" },
  { value: "colombia", option: "Colombia - CO" },
  { value: "comoros", option: "Comoros - KM" },
  { value: "congo", option: "Congo - CG" },
  { value: "costa rica", option: "Costa Rica - CR" },
  { value: "croatia", option: "Croatia - HR" },
  { value: "cuba", option: "Cuba - CU" },
  { value: "cyprus", option: "Cyprus - CY" },
  { value: "czech republic", option: "Czech Republic - CZ" },
  { value: "denmark", option: "Denmark - DK" },
  { value: "djibouti", option: "Djibouti - DJ" },
  { value: "dominica", option: "Dominica - DM" },
  { value: "dominican republic", option: "Dominican Republic - DO" },
  { value: "east timor", option: "East Timor - TL" },
  { value: "ecuador", option: "Ecuador - EC" },
  { value: "egypt", option: "Egypt - EG" },
  { value: "el salvador", option: "El Salvador - SV" },
  { value: "equatorial guinea", option: "Equatorial Guinea - GQ" },
  { value: "eritrea", option: "Eritrea - ER" },
  { value: "estonia", option: "Estonia - EE" },
  { value: "eswatini", option: "Eswatini - SZ" },
  { value: "ethiopia", option: "Ethiopia - ET" },
  { value: "fiji", option: "Fiji - FJ" },
  { value: "finland", option: "Finland - FI" },
  { value: "france", option: "France - FR" },
  { value: "gabon", option: "Gabon - GA" },
  { value: "gambia", option: "Gambia - GM" },
  { value: "georgia", option: "Georgia - GE" },
  { value: "germany", option: "Germany - DE" },
  { value: "ghana", option: "Ghana - GH" },
  { value: "greece", option: "Greece - GR" },
  { value: "grenada", option: "Grenada - GD" },
  { value: "guatemala", option: "Guatemala - GT" },
  { value: "guinea", option: "Guinea - GN" },
  { value: "guinea-bissau", option: "Guinea-Bissau - GW" },
  { value: "guyana", option: "Guyana - GY" },
  { value: "haiti", option: "Haiti - HT" },
  { value: "honduras", option: "Honduras - HN" },
  { value: "hungary", option: "Hungary - HU" },
  { value: "iceland", option: "Iceland - IS" },
  { value: "india", option: "India - IN" },
  { value: "indonesia", option: "Indonesia - ID" },
  { value: "iran", option: "Iran - IR" },
  { value: "iraq", option: "Iraq - IQ" },
  { value: "ireland", option: "Ireland - IE" },
  { value: "israel", option: "Israel - IL" },
  { value: "italy", option: "Italy - IT" },
  { value: "jamaica", option: "Jamaica - JM" },
  { value: "japan", option: "Japan - JP" },
  { value: "jordan", option: "Jordan - JO" },
  { value: "kazakhstan", option: "Kazakhstan - KZ" },
  { value: "kenya", option: "Kenya - KE" },
  { value: "kiribati", option: "Kiribati - KI" },
  { value: "korea, north", option: "Korea, North - KP" },
  { value: "korea, south", option: "Korea, South - KR" },
  { value: "kuwait", option: "Kuwait - KW" },
  { value: "kyrgyzstan", option: "Kyrgyzstan - KG" },
  { value: "laos", option: "Laos - LA" },
  { value: "latvia", option: "Latvia - LV" },
  { value: "lebanon", option: "Lebanon - LB" },
  { value: "lesotho", option: "Lesotho - LS" },
  { value: "liberia", option: "Liberia - LR" },
  { value: "libya", option: "Libya - LY" },
  { value: "liechtenstein", option: "Liechtenstein - LI" },
  { value: "lithuania", option: "Lithuania - LT" },
  { value: "luxembourg", option: "Luxembourg - LU" },
  { value: "madagascar", option: "Madagascar - MG" },
  { value: "malawi", option: "Malawi - MW" },
  { value: "malaysia", option: "Malaysia - MY" },
  { value: "maldives", option: "Maldives - MV" },
  { value: "mali", option: "Mali - ML" },
  { value: "malta", option: "Malta - MT" },
  { value: "marshall islands", option: "Marshall Islands - MH" },
  { value: "mauritania", option: "Mauritania - MR" },
  { value: "mauritius", option: "Mauritius - MU" },
  { value: "mexico", option: "Mexico - MX" },
  { value: "micronesia", option: "Micronesia - FM" },
  { value: "moldova", option: "Moldova - MD" },
  { value: "monaco", option: "Monaco - MC" },
  { value: "mongolia", option: "Mongolia - MN" },
  { value: "montenegro", option: "Montenegro - ME" },
  { value: "morocco", option: "Morocco - MA" },
  { value: "mozambique", option: "Mozambique - MZ" },
  { value: "myanmar", option: "Myanmar - MM" },
  { value: "namibia", option: "Namibia - NA" },
  { value: "nauru", option: "Nauru - NR" },
  { value: "nepal", option: "Nepal - NP" },
  { value: "netherlands", option: "Netherlands - NL" },
  { value: "new zealand", option: "New Zealand - NZ" },
  { value: "nicaragua", option: "Nicaragua - NI" },
  { value: "niger", option: "Niger - NE" },
  { value: "nigeria", option: "Nigeria - NG" },
  { value: "north macedonia", option: "North Macedonia - MK" },
  { value: "norway", option: "Norway - NO" },
  { value: "oman", option: "Oman - OM" },
  { value: "pakistan", option: "Pakistan - PK" },
  { value: "palau", option: "Palau - PW" },
  { value: "panama", option: "Panama - PA" },
  { value: "papua new guinea", option: "Papua New Guinea - PG" },
  { value: "paraguay", option: "Paraguay - PY" },
  { value: "peru", option: "Peru - PE" },
  { value: "philippines", option: "Philippines - PH" },
  { value: "poland", option: "Poland - PL" },
  { value: "portugal", option: "Portugal - PT" },
  { value: "qatar", option: "Qatar - QA" },
  { value: "romania", option: "Romania - RO" },
  { value: "russia", option: "Russia - RU" },
  { value: "rwanda", option: "Rwanda - RW" },
  { value: "saint kitts and nevis", option: "Saint Kitts and Nevis - KN" },
  { value: "saint lucia", option: "Saint Lucia - LC" },
  { value: "saint vincent and the grenadines", option: "Saint Vincent and the Grenadines - VC" },
  { value: "samoa", option: "Samoa - WS" },
  { value: "san marino", option: "San Marino - SM" },
  { value: "sao tome and principe", option: "Sao Tome and Principe - ST" },
  { value: "saudi arabia", option: "Saudi Arabia - SA" },
  { value: "senegal", option: "Senegal - SN" },
  { value: "serbia", option: "Serbia - RS" },
  { value: "seychelles", option: "Seychelles - SC" },
  { value: "sierra leone", option: "Sierra Leone - SL" },
  { value: "singapore", option: "Singapore - SG" },
  { value: "slovakia", option: "Slovakia - SK" },
  { value: "slovenia", option: "Slovenia - SI" },
  { value: "solomon islands", option: "Solomon Islands - SB" },
  { value: "somalia", option: "Somalia - SO" },
  { value: "south africa", option: "South Africa - ZA" },
  { value: "south sudan", option: "South Sudan - SS" },
  { value: "spain", option: "Spain - ES" },
  { value: "sri lanka", option: "Sri Lanka - LK" },
  { value: "sudan", option: "Sudan - SD" },
  { value: "suriname", option: "Suriname - SR" },
  { value: "sweden", option: "Sweden - SE" },
  { value: "switzerland", option: "Switzerland - CH" },
  { value: "syria", option: "Syria - SY" },
  { value: "taiwan", option: "Taiwan - TW" },
  { value: "tajikistan", option: "Tajikistan - TJ" },
  { value: "tanzania", option: "Tanzania - TZ" },
  { value: "thailand", option: "Thailand - TH" },
  { value: "togo", option: "Togo - TG" },
  { value: "tonga", option: "Tonga - TO" },
  { value: "trinidad and tobago", option: "Trinidad and Tobago - TT" },
  { value: "tunisia", option: "Tunisia - TN" },
  { value: "turkey", option: "Turkey - TR" },
  { value: "turkmenistan", option: "Turkmenistan - TM" },
  { value: "tuvalu", option: "Tuvalu - TV" },
  { value: "uganda", option: "Uganda - UG" },
  { value: "ukraine", option: "Ukraine - UA" },
  { value: "united arab emirates", option: "United Arab Emirates - AE" },
  { value: "united kingdom", option: "United Kingdom - GB" },
  { value: "united states", option: "United States - US" },
  { value: "uruguay", option: "Uruguay - UY" },
  { value: "uzbekistan", option: "Uzbekistan - UZ" },
  { value: "vanuatu", option: "Vanuatu - VU" },
  { value: "vatican city", option: "Vatican City - VA" },
  { value: "venezuela", option: "Venezuela - VE" },
  { value: "vietnam", option: "Vietnam - VN" },
  { value: "yemen", option: "Yemen - YE" },
  { value: "zambia", option: "Zambia - ZM" },
  { value: "zimbabwe", option: "Zimbabwe - ZW" },
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
