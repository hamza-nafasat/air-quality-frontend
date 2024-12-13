/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import {
//   createRuleEngineActions,
//   getAllRuleEngineActions,
// } from "../../../../../redux/actions/ruleEngine.actions";

import { FaChevronDown } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import Button from "../../../../components/shared/small/Button";
import TextField from "../../../../components/shared/small/TextField";
import Dropdown from "../../../../components/shared/small/Dropdown";

const alertType = [
  { option: "speed-alert" },
  { option: "sudden-stop" },
  { option: "two-detection" },
  { option: "tire-pressure" },
  { option: "sensor-offline" },
  { option: "idle-engine" },
  { option: "damage-alert" },
];

const severityType = [
  { option: "high" },
  { option: "medium" },
  { option: "low" },
];

const AddRuleEngine = ({ onClose }) => {
  const dispatch = useDispatch();
  const [addLoading, setAddLoading] = useState(false);
  const [isAccordionComplete, setIsAccordionComplete] = useState(true);
  const [accordionList, setAccordionList] = useState([{ id: 1, type: "" }]);
  const [formData, setFormData] = useState({
    alertName: "",
    severityType: "",
    email: "",
    platform: "",
    status: "",
  });
  const [inputEmail, setInputEmail] = useState(false);

  const handleAddAccordion = () => {
    setAccordionList((prevList) => [
      ...prevList,
      { id: prevList.length + 1, type: "" },
    ]);
  };

  const handleRemoveAccordion = (id) => {
    setAccordionList((prevList) =>
      prevList.filter((accordion) => accordion.id !== id)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      platform: checked ? name : "",
    }));
    if (name === "email") {
      setInputEmail(true);
    } else {
      setInputEmail(false);
    }
  };

  const handleSave = async () => {
    const { alertName, email, severityType, platform, status } = formData;
    if (!alertName || !severityType || !platform || !status)
      return toast.error("All fields are required");
    if (platform === "email" && !email) return toast.error("Email is required");
    const alerts = accordionList
      .map((item) => {
        const data = {};
        if (item?.type) data.type = item.type;
        if (item?.speed) data.speed = item.speed;
        if (item?.lessThen) data.lessThen = item.lessThen;
        if (item?.moreThen) data.moreThen = item.moreThen;

        if (data.type) return data;
        return null;
      })
      .filter(Boolean);

    if (!alerts.length)
      return toast.error("At least one alert type is required");
    if (!isAccordionComplete) return setIsAccordionComplete(true);

    try {
      setAddLoading(true);
      await dispatch(
        createRuleEngineActions({
          alerts,
          name: formData.alertName,
          severity: formData.severityType,
          platform: formData.platform,
          onMil: formData.email,
          status: formData.status,
        })
      );
      await dispatch(getAllRuleEngineActions());
      onClose();
      setAddLoading(false);
    } catch (error) {
      setAddLoading(false);
      console.log("Error in creating rule engine", error);
    }
  };
  return (
    <div className="">
      {/* Form */}
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Alert Name Field */}
          <div>
            <TextField
              type="text"
              label="Alert Name"
              required
              placeholder="Alert Name"
              value={formData.alertName || ""}
              onChange={handleChange}
            />
          </div>

          {/* Severity Type Dropdown */}
          <div>
            <Dropdown label="Severity Type" options={severityType} />
          </div>

          {/* Status Dropdown */}
          <div>
            <Dropdown
              label="Status"
              options={[{ option: "Enable" }, { option: "Disable" }]}
            />
          </div>

          {/* Email Input */}
          {inputEmail && (
            <div>
              <TextField
                type="email"
                label="Email"
                placeholder="Enter Email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </div>

        {/* Notification Type */}
        <div className="mt-4 flex justify-between items-center">
          <span className="font-semibold text-sm">NOTIFICATION TYPE*</span>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="email"
                checked={formData.platform === "email"}
                onChange={handleCheckboxChange}
                className="text-indigo-500 focus:ring-indigo-300"
              />
              <span>Email</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="platform"
                checked={formData.platform === "platform"}
                onChange={handleCheckboxChange}
                className="text-indigo-500 focus:ring-indigo-300"
              />
              <span>Platform</span>
            </label>
          </div>
        </div>

        {/* Accordion Component */}
        <div className="mt-6">
          {accordionList?.map((accordion) => (
            <Accordion
              key={accordion.id}
              id={accordion.id}
              onRemove={handleRemoveAccordion}
              accordionList={accordionList}
              setAccordionList={setAccordionList}
            />
          ))}
          <button
            onClick={handleAddAccordion}
            // className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center gap-2"
          >
            <MdAddBox fontSize={30} color="#03A5E0" />
          </button>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end items-center gap-4 mt-6">
          <Button
            text="Save"
            width=" w-full md:w-[100px]"
            onClick={handleSave}
            disabled={addLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddRuleEngine;

const Accordion = ({ id, onRemove, accordionList, setAccordionList }) => {
  const [formData, setFormData] = useState({});

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Handle alert type change
  const handleChange = (e) => {
    setAccordionList((prevList) =>
      prevList.map((accordion) => {
        if (accordion.id === id) {
          return {
            ...accordion,
            [e.target.name]: e.target.value,
          };
        }
        return accordion;
      })
    );
  };

  // Filter alert types based on what's already selected
  const availableAlertTypes = alertType.filter((type) => {
    const allSelectedAlertTypes = accordionList?.map(
      (accordion) => accordion.alert
    );
    return !allSelectedAlertTypes.includes(type?.type);
  });

  useEffect(() => {
    setFormData(accordionList.find((accordion) => accordion?.id === id) || {});
  }, [id, accordionList]);

  return (
    <div className="border border-gray-300 rounded-lg my-4 shadow-sm">
      {/* Accordion Summary */}
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-100"
        onClick={toggleAccordion}
      >
        <h6 className="font-semibold text-sm">Alert Configuration</h6>
        <FaChevronDown
          className={`text-gray-500 transition-all duration-500 ${
            isAccordionOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Accordion Details */}
      {isAccordionOpen && (
        <div className="p-3 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Alert Type Dropdown */}
            <div>
              <Dropdown
                label="Alert Type"
                options={alertType}
                value={formData.alertType}
                onSelect={(option) =>
                  setFormData({ ...formData, alertType: option.option })
                }
              />
            </div>

            {/* Additional Fields for Specific Alert Types */}
            {(formData?.alertType === "tire-pressure" ||
              formData?.alertType === "speed-alert") && (
              <>
                <div>
                  <TextField
                    label="Less Than"
                    type="number"
                    onChange={handleChange}
                    value={formData?.lessThen || ""}
                  />
                </div>
                <div>
                  <TextField
                    label="More Than"
                    type="number"
                    onChange={handleChange}
                    value={formData?.moreThen || ""}
                  />
                </div>
              </>
            )}
            {formData?.alertType === "idle-engine" && (
              <div>
                <TextField
                  label="Time in Seconds"
                  text="number"
                  placeholder="Time in Seconds"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              text="Close"
              width=" w-full md:w-[80px]"
              onClick={() => onRemove(id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
