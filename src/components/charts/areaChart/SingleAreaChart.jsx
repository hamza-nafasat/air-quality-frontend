import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ChevronIcon from "../../../assets/svgs/buildings/ChevronIcon";

const SingleAreaChart = () => {
  const [series, setSeries] = useState([
    {
      name: "Temperature",
      data: [28, 40, 35, 50, 49, 60, 70, 55, 65, 55, 60, 75],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false, // Hide toolbar
      },
    },
    colors: ["#33B5E5"], // Main color for the line
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 5,
      colors: ["#33B5E5"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: [
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
      ],
      labels: {
        style: {
          colors: "#9aa0ac",
        },
      },
    },
    yaxis: {
      min: 10,
      max: 80,
      labels: {
        style: {
          colors: "#9aa0ac",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#f1f1f1",
    },
    tooltip: {
      theme: "light",
      x: {
        format: "HH:mm",
      },
      marker: {
        show: true,
      },
      y: {
        formatter: (value) => `${value} °F`,
      },
    },
    legend: {
      show: false,
    },
  });
  const data = ["Daily", "Weekly", "Monthly"];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Temperature</h3>
        {/* Example dropdown for filters */}
        <div className="flex gap-2">
          {/* <select className="border border-gray-300 rounded px-2 py-1">
            <option>Weekly</option>
            <option>Daily</option>
            <option>Monthly</option>
          </select> */}
          <CustomDropDown lists={["Daily", "Weekly", "Monthly"]} />
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
      {/* Custom Indicators Below the Chart */}
      {/* <div className="flex justify-around items-center mt-4 bg-blue-50 p-2 rounded-lg">
        <div className="text-center">
          <p className="text-blue-500 font-bold">40°F</p>
          <p className="text-sm">Low</p>
        </div>
        <div className="text-center">
          <p className="text-blue-500 font-bold">60°F</p>
          <p className="text-sm">Average</p>
        </div>
        <div className="text-center">
          <p className="text-blue-500 font-bold">90°F</p>
          <p className="text-sm">High</p>
        </div>
      </div> */}
    </div>
  );
};

export default SingleAreaChart;

const CustomDropDown = ({ lists }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(lists[0]);
  const selectHandler = (option) => {
    setSelectedOption(option);
    setIsOptionOpen(false);
  };
  const optionsHandler = () => setIsOptionOpen(!isOptionOpen);
  return (
    <div className="relative z-50">
      <div
        className="flex items-center justify-between text-sm text-[#060606cc] font-semibold gap-3 cursor-pointer border border-[#060606cc] py-1 px-2 rounded-[8px] text-nowrap"
        onClick={() => optionsHandler()}
      >
        {selectedOption}
        <div
          className={`transition-all duration-300 ${
            isOptionOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronIcon />
        </div>
      </div>
      {isOptionOpen && (
        <ul className="flex flex-col bg-white rounded-lg shadow-md absolute top-[30px] left-0 w-full">
          {lists.map((list, i) => (
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
