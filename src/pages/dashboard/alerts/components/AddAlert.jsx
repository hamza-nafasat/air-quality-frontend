import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import TextField from "../../../../components/shared/small/TextField";
import Dropdown from "../../../../components/shared/small/Dropdown";

const alertType = [
  { type: "infence" },
  { type: "outfence" },
  { type: "speed-alert" },
  { type: "sudden-stop" },
  { type: "two-detection" },
  { type: "tire-pressure" },
  { type: "sensor-offline" },
  { type: "idle-engine" },
  { type: "damage-alert" },
];

const alertTypeOptions = alertType.map((item) => item.type);

const severityType = [{ type: "high" }, { type: "medium" }, { type: "low" }];

const AddAlert = ({ onClose }) => {
  const [inputEmail, setInputEmail] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    alertName: "",
    alertType: "",
    severityType: "",
    email: "",
    platform: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsLoading(true);
    if (!formData.alertType || !formData.severityType || !formData.platform) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }
    toast.success("Alert saved successfully!");
    setIsLoading(false);
    onClose();
  };

  return (
    <Fragment>
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-900 font-semibold text-lg md:text-xl">
          <button className="h-6" onClick={onClose}>
            <img src="/path/to/back-icon.svg" alt="Back" className="h-full" />
          </button>
          ADD ALERT
        </div>
        <button onClick={onClose}>
          <img src="/path/to/close-icon.svg" alt="Close" className="h-6" />
        </button>
      </div> */}

      <div className="flex flex-col w-full mt-4 lg:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            {/* <label className="block mb-2 text-sm font-medium text-gray-700">
              Alert Name
            </label>
            <input
              name="alertName"
              type="text"
              value={formData.alertName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter alert name"
            /> */}
            <TextField
              name="alertName"
              type="text"
              value={formData.alertName}
              onChange={handleChange}
              placeholder="Enter alert name"
              label="Alert Name"
            />
          </div>

          <div>
            <Dropdown label="Alert Type" options={alertTypeOptions} />
          </div>

          <div>
            <Dropdown label="Severity Type" options={severityType} />
          </div>

          {formData.alertType === "idle-engine" && (
            <div>
              <TextField label="Idle Time" type="time" />
            </div>
          )}

          {formData.alertType === "tire-pressure" && (
            <div>
              <TextField
                label="Tyre Pressure"
                type="number"
                placeholder="Enter Tyre Pressure"
              />
            </div>
          )}

          {formData.alertType === "speed-alert" && (
            <div>
              <TextField
                type="number"
                label="Speed Alert"
                placeholder="Enter Speed Limit"
              />
            </div>
          )}

          {inputEmail && (
            <div>
              <TextField label="Email" type="email" placeholder="Enter Email" />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <h3 className="text-gray-900 text-sm md:text-base font-semibold">
            NOTIFICATION TYPE*
          </h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-gray-900 font-medium">
              <input
                type="checkbox"
                checked={formData.platform === "email"}
                onChange={(event) => {
                  handleChange(event);
                  if (event.target.checked) setInputEmail(true);
                }}
                name="platform"
                value="email"
              />
              Email
            </label>

            <label className="flex items-center gap-2 text-gray-900 font-medium">
              <input
                type="checkbox"
                checked={formData.platform === "platform"}
                onChange={(event) => {
                  handleChange(event);
                  if (event.target.checked) setInputEmail(false);
                }}
                name="platform"
                value="platform"
              />
              Platform
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`px-6 py-2 text-white rounded-md ${
              isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddAlert;
