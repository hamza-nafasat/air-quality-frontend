import { useState } from "react";
import AddfloorsIcon from "../../assets/svgs/stepper/AddfloorsIcon";
import GeneralInfoIcon from "../../assets/svgs/stepper/GeneralInfoIcon";
import MappingIcon from "../../assets/svgs/stepper/MappingIcon";
import TwoDIcon from "../../assets/svgs/stepper/TwoDIcon";
import AddFloors from "./AddFloors";
import GeneralInfo from "./GeneralInfo";
import Mapping from "./Mapping";
import UploadModel from "./UploadModel";

const BuildingStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <UploadModel setCurrentStep={setCurrentStep} />;
      case 1:
        return <GeneralInfo setCurrentStep={setCurrentStep} />;
      case 2:
        return <Mapping setCurrentStep={setCurrentStep} />;
      case 3:
        return <AddFloors setCurrentStep={setCurrentStep} />;
      default:
        return null;
    }
  };

  const steps = [
    {
      label: "Upload 2D Model",
      icon: <TwoDIcon />,
    },
    {
      label: "General Info",
      icon: <GeneralInfoIcon />,
    },
    {
      label: "Mapping",
      icon: <MappingIcon />,
    },
    {
      label: "Add Floors",
      icon: <AddfloorsIcon />,
    },
  ];
  return (
    <div className="bg-white rounded-[18px] p-4 h-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center cursor-default ${
              currentStep >= index ? "opacity-100" : "opacity-50"
            } ${index < steps.length - 1 ? "flex-1" : ""}`}
          >
            <div className="flex items-center gap-1 bg-primary-lightBlue rounded-xl p-[6px] w-[185px] text-white">
              {step.icon}
              {step.label}
            </div>
            {index < steps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
      <div className="mt-6 md:mt-8">{renderStepContent(currentStep)}</div>
    </div>
  );
};

export default BuildingStepper;

const Arrow = () => {
  return (
    <div className="ml-[-1px] flex items-center flex-1">
      <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.5 10.9991L16.0696 10.7713C10.7073 7.93297 5.68524 4.49387 1.10036 0.520311L0.5 0L0.5 23.5L1.42178 22.5168C5.77715 17.871 10.8722 13.9791 16.5 10.9991Z"
          fill="#03A5E0"
        />
      </svg>
      <div className="border border-t border-primary-lightBlue flex-1 ml-[-4px] mt-[-2px]"></div>
      <div className="ml-[-6px] mt-[-0.5px]">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 1L7.5 6.53846L1.5 13" stroke="#03A5E0" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
