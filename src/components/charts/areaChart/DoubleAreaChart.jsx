/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ChevronIcon from "../../../assets/svgs/buildings/ChevronIcon";

const DoubleAreaChart = ({ chartsData }) => {
  const [selectedOption, setSelectedOption] = useState("Temp & Humi");
  const [series, setSeries] = useState([]);
  const [options] = useState({
    chart: {
      height: 350,
      type: "area",
      toolbar: { show: false },
    },
    colors: ["#33B5E5", "#8E44AD"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 90, 100] },
    },
    xaxis: {
      categories: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      labels: { style: { colors: "#9aa0ac" } },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return Number(value).toFixed(0);
        },
      },
    },
    grid: { show: true, borderColor: "#f1f1f1" },
    tooltip: {
      theme: "light",
      x: { format: "dd/MM" },
      marker: { show: true },
      y: { formatter: (value) => `${value} C` },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      markers: { fillColors: ["#33B5E5", "#8E44AD"] },
    },
  });
  useEffect(() => {
    if (selectedOption === "Temp & Humi") {
      setSeries([
        { name: "temperature", data: chartsData?.temperature },
        { name: "Humidity", data: chartsData?.humidity },
      ]);
    } else if (selectedOption === "Co & Co2") {
      setSeries([
        { name: "Co", data: chartsData?.co },
        { name: "Co2", data: chartsData?.co2 },
      ]);
    } else if (selectedOption === "Tvoc & Ch") {
      setSeries([
        { name: "Tvoc", data: chartsData?.tvoc },
        { name: "Ch", data: chartsData?.ch },
      ]);
    }
  }, [selectedOption, chartsData]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h5>Sensors Activity</h5>
        <div className="flex items-center justify-between gap-2">
          <CustomDropDown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            lists={["Temp & Humi", "Co & Co2", "Tvoc & Ch"]}
          />
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default DoubleAreaChart;

const CustomDropDown = ({ lists, selectedOption, setSelectedOption }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const selectHandler = (option) => {
    setSelectedOption(option);
    setIsOptionOpen(false);
  };
  const optionsHandler = () => setIsOptionOpen(!isOptionOpen);
  return (
    <div className="relative z-50">
      <div
        className="flex items-center justify-between text-sm text-[#060606cc] font-semibold gap-3 cursor-pointer 
        border border-[#060606cc] py-1 px-2 rounded-[8px] text-nowrap"
        onClick={() => optionsHandler()}
      >
        {selectedOption}
        <div className={`transition-all duration-300 ${isOptionOpen ? "rotate-180" : "rotate-0"}`}>
          <ChevronIcon />
        </div>
      </div>
      {isOptionOpen && (
        <ul className="flex flex-col bg-white rounded-lg shadow-md absolute top-[30px] left-0 w-full">
          {lists?.map((list, i) => (
            <li
              key={i}
              className="py-1 px-2 border-b text-sm font-semibold cursor-pointer text-[#060606f7] hover:bg-gray-100"
              onClick={() => selectHandler(list)}
            >
              {list}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
