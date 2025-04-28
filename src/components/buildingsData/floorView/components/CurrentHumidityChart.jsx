/* eslint-disable react/prop-types */
import { useState } from "react";
import Chart from "react-apexcharts";
import Slider from "react-slick";
import ChevronIcon from "../../../../assets/svgs/buildings/ChevronIcon";
import { NextArrow, PrevArrow } from "../../CustomArrows";

const CurrentHumidityChart = ({ floorData }) => {
  const colors = [
    "#3300FF",
    "#17FF00",
    "#FF0061",
    "#00ABFF",
    "#F6FF00",
    "#BD00FF",
    "#00FF72",
    "#FF2800",
    "#0021FF",
    "#6CFF00",
    "#FF00B6",
    "#00FFFC",
    "#FFB200",
    "#6700FF",
    "#00FF1D",
    "#FF002C",
    "#0077FF",
    "#C1FF00",
    "#F100FF",
    "#00FFA7",
    "#FF5D00",
    "#1200FF",
    "#37FF00",
    "#FF0082",
    "#00CCFF",
  ];

  // console.log("data", floorData);
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
        <h2 className="text-sm md:text-base font-semibold md:font-bold text-[#060606cc]">Current Air Quality</h2>
        {/* <CustomDropDown lists={["Week", "Month", "Year"]} /> */}
      </div>
      <div>
        <Slider {...settings}>
          {floorData?.map((item, index) => {
            return (
              <div key={index} className="flex justify-center items-center">
                <div>
                  <ChartComponent value={item[1]?.level} colors={[colors[Math.round(Math.random() * 12)]]} />
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#060606cc]">{item[0]?.toUpperCase()}</p>
                    {/* <p className="text-lg md:text-[24px] font-semibold text-primary-lightBlue">{item[1]?.level}</p> */}
                  </div>
                </div>
              </div>
            );
          })}
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
            formatter: () => `${value}`,
          },
        },
      },
    },
    series: [value],
    labels: [""],
    colors: colors,
  };

  return <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height="250" />;
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
        <div className={`transition-all duration-300 ${isOptionOpen ? "rotate-180" : "rotate-0"}`}>
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
