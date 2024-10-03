import React, { useState } from "react";
import ChevronIcon from "../../../../assets/svgs/buildings/ChevronIcon";
import Slider from "react-slick";
import Chart from "react-apexcharts";
import { NextArrow, PrevArrow } from "../../CustomArrows";

const data = [
  {
    value: 78,
    label: "Humidity",
    colors: ["#FF4560", "#008FFB", "#00E396", "#FEB019"],
  },
  {
    value: 55,
    label: "Temperature",
    colors: ["#FF5733", "#33FF57", "#5733FF", "#FFC300"],
  },
  {
    value: 90,
    label: "Air Quality",
    colors: ["#FF33A6", "#A633FF", "#33FFC1", "#C1FF33"],
  },
];

const CurrentHumidityChart = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm md:text-base font-semibold md:font-bold text-[#060606cc]">
          Current Humidity
        </h2>
        <CustomDropDown lists={["Week", "Month", "Year"]} />
      </div>
      <div>
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index} className="flex justify-center items-center">
              <div>
                <ChartComponent value={item.value} colors={item.colors} />
                <div className="text-center">
                  <p className="text-sm font-medium text-[#060606cc]">
                    {item.label}
                  </p>
                  <p className="text-lg md:text-[24px] font-semibold text-primary-lightBlue">
                    {item.value}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CurrentHumidityChart;

const ChartComponent = ({ value, colors }) => {
  const chartOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: true,
          value: {
            fontWeight: "600",
            fontSize: "34px",
            color: "rgba(3, 165, 224, 1)",
            offsetY: 0,
            show: true,
            formatter: () => `${value}%`,
          },
        },
      },
    },
    series: [value],
    labels: [""],
    colors: colors,
  };

  return (
    <Chart
      options={chartOptions}
      series={chartOptions.series}
      type="radialBar"
      height="250"
    />
  );
};

const CustomDropDown = ({ lists }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Week");
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
