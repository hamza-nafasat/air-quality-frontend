/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ChevronIcon from "../../../assets/svgs/buildings/ChevronIcon";

const DoubleAreaChart = () => {
  const [series, setSeries] = useState([
    {
      name: "Temperature",
      data: [30, 40, 35, 50, 49, 60, 70, 70, 68, 65, 60, 55, 40, 70, 60],
    },
    {
      name: "CO Levels",
      data: [20, 30, 25, 40, 39, 50, 60, 55, 60, 65, 70, 75, 65, 55, 45],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: ["#33B5E5", "#8E44AD"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
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
    xaxis: {
      categories: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
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
        format: "dd/MM",
      },
      marker: {
        show: true,
      },
      y: {
        formatter: (value) => `${value} C`,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      markers: {
        fillColors: ["#33B5E5", "#8E44AD"],
      },
    },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h5>Sensors Activity</h5>
        {/* Example dropdowns for filters */}
        <div className="flex items-center justify-between gap-2">
          <CustomDropDown lists={["All Floors", "Floor 1", "Floor 2"]} />
          <CustomDropDown lists={["Temp,CO", "Temp Only", "CO Only"]} />
        </div>
        {/* <div className="flex gap-2">
          <select className="border border-gray-300 rounded px-2 py-1">
            <option>All Floors</option>
            <option>Floor 1</option>
            <option>Floor 2</option>
          </select>
          <select className="border border-gray-300 rounded px-2 py-1">
            <option>Temp,CO</option>
            <option>Temp Only</option>
            <option>CO Only</option>
          </select>
        </div> */}
      </div>
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default DoubleAreaChart;

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
