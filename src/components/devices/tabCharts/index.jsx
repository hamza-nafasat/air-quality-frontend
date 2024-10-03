import React, { useState } from "react";
import CarbonDioxideChart from "./CarbonDioxideChart";

const TabContent = ({ title, content }) => (
  <div className="">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p>{content}</p>
  </div>
);

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Carbon Dioxide", chart: <CarbonDioxideChart /> },
    { title: "Humidity", chart: <CarbonDioxideChart /> },
    { title: "Methane", chart: <CarbonDioxideChart /> },
    { title: "Carbon Monoxide", chart: <CarbonDioxideChart /> },
    { title: "Temperature", chart: <CarbonDioxideChart /> },
    { title: "LPG", chart: <CarbonDioxideChart /> },
  ];

  return (
    <div className="">
      <div className="flex justify-center gap-3 mb-6 flex-wrap text-justify">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-3 px-6 text-xs rounded-lg transition duration-300 ${
              activeTab === index
                ? "bg-[#03A5E0] text-white shadow-lg"
                : "bg-[#E2F7FF] text-[#03A5E0] hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div>
        <TabContent title={tabs[activeTab].chart} />
      </div>
    </div>
  );
};

export default Tabs;
