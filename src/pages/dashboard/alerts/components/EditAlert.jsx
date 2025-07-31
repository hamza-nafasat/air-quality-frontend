// /* eslint-disable react/prop-types */
// import { Fragment, useState } from "react";
// import { toast } from "react-toastify";
// import TextField from "../../../../components/shared/small/TextField";
// import Dropdown from "../../../../components/shared/small/Dropdown";

// const alertType = [
//   { option: "infence" },
//   { option: "outfence" },
//   { option: "speed-alert" },
//   { option: "sudden-stop" },
//   { option: "two-detection" },
//   { option: "tire-pressure" },
//   { option: "sensor-offline" },
//   { option: "idle-engine" },
//   { option: "damage-alert" },
// ];

// const severityType = [
//   { option: "high" },
//   { option: "medium" },
//   { option: "low" },
// ];

// const EditAlert = ({ onClose }) => {
//   const [inputEmail, setInputEmail] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     alertName: "",
//     alertType: "",
//     severityType: "",
//     email: "",
//     platform: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = () => {
//     setIsLoading(true);
//     if (!formData.alertType || !formData.severityType || !formData.platform) {
//       toast.error("All fields are required");
//       setIsLoading(false);
//       return;
//     }
//     toast.success("Alert saved successfully!");
//     setIsLoading(false);
//     onClose();
//   };

//   return (
//     <Fragment>
//       <div className="flex flex-col w-full mt-4 lg:mt-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div>
//             <TextField
//               name="alertName"
//               type="text"
//               value={formData.alertName}
//               onChange={handleChange}
//               placeholder="Enter alert name"
//               label="Alert Name"
//             />
//           </div>

//           <div>
//             <Dropdown
//               label="Alert Type"
//               options={alertType}
//               value={formData.alertType}
//               onSelect={(option) =>
//                 setFormData({ ...formData, alertType: option.option })
//               }
//             />
//           </div>

//           <div>
//             <Dropdown
//               label="Severity Type"
//               options={severityType}
//               onSelect={(option) =>
//                 setFormData({ ...formData, severityType: option.option })
//               }
//             />
//           </div>

//           {formData.alertType === "idle-engine" && (
//             <div>
//               <TextField label="Idle Time" type="time" />
//             </div>
//           )}

//           {formData.alertType === "tire-pressure" && (
//             <div>
//               <TextField
//                 label="Tyre Pressure"
//                 type="number"
//                 placeholder="Enter Tyre Pressure"
//               />
//             </div>
//           )}

//           {formData.alertType === "speed-alert" && (
//             <div>
//               <TextField
//                 type="number"
//                 label="Speed Alert"
//                 placeholder="Enter Speed Limit"
//               />
//             </div>
//           )}

//           {inputEmail && (
//             <div>
//               <TextField label="Email" type="email" placeholder="Enter Email" />
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
//           <h3 className="text-gray-900 text-sm md:text-base font-semibold">
//             NOTIFICATION TYPE*
//           </h3>
//           <div className="flex items-center gap-4">
//             <label className="flex items-center gap-2 text-gray-900 font-medium">
//               <input
//                 type="checkbox"
//                 checked={formData.platform === "email"}
//                 onChange={(event) => {
//                   handleChange(event);
//                   if (event.target.checked) setInputEmail(true);
//                 }}
//                 name="platform"
//                 value="email"
//               />
//               Email
//             </label>

//             <label className="flex items-center gap-2 text-gray-900 font-medium">
//               <input
//                 type="checkbox"
//                 checked={formData.platform === "platform"}
//                 onChange={(event) => {
//                   handleChange(event);
//                   if (event.target.checked) setInputEmail(false);
//                 }}
//                 name="platform"
//                 value="platform"
//               />
//               Platform
//             </label>
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 mt-8">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={isLoading}
//             className={`px-6 py-2 text-white rounded-md ${
//               isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {isLoading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default EditAlert;

/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TextField from '../../../../components/shared/small/TextField';
import Dropdown from '../../../../components/shared/small/Dropdown';
import { useUpdateAlertMutation } from '../../../../redux/apis/alertApi';

const alertType = [
  { option: 'low-temp' },
  { option: 'heigh-temp' },
  { option: 'low-humidity' },
  { option: 'heigh-humidity' },
  { option: 'low-co' },
  { option: 'heigh-co' },
  { option: 'low-co2' },
  { option: 'heigh-co2' },
  { option: 'low-ch' },
  { option: 'heigh-ch' },
  { option: 'low-tvoc' },
  { option: 'heigh-tvoc' },
  { option: 'damage' },
];

const severityType = [{ option: 'high' }, { option: 'medium' }, { option: 'low' }];

const EditAlert = ({ onClose, editData }) => {
  console.log('editData', editData);

  const [inputEmail, setInputEmail] = useState(false);
  const [updateAlert] = useUpdateAlertMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    alertName: '',
    alertType: '',
    severityType: '',
    email: '',
    platform: '',
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        alertName: editData?.name || '',
        alertType: editData?.type || '',
        severityType: editData?.severity || '',
        email: editData?.onMail || '',
        platform: editData?.platform || '',
      });
      setInputEmail(editData?.platform === 'email');
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const editId = editData._id;
  console.log('editId', editId);

  const handleSave = async () => {
    setIsLoading(true);

    const payload = {
      name: formData.alertName,
      type: formData.alertType,
      severity: formData.severityType,
      onMail: formData.email,
      platform: formData.platform,
    };

    try {
      await updateAlert({ alertId: editData._id, ...payload }).unwrap();
      toast.success('Alert updated successfully!');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || 'Failed to update alert');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col w-full mt-4 lg:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextField
            name="alertName"
            type="text"
            value={formData.alertName}
            onChange={handleChange}
            placeholder="Enter alert name"
            label="Alert Name"
          />

          <Dropdown
            label="Alert Type"
            options={alertType}
            value={formData.alertType}
            defaultText={formData.alertType}
            onSelect={(option) => setFormData({ ...formData, alertType: option.option })}
          />

          <Dropdown
            label="Severity Type"
            options={severityType}
            value={formData.severityType}
            defaultText={formData.severityType}
            onSelect={(option) => setFormData({ ...formData, severityType: option.option })}
          />

          {formData.alertType === 'idle-engine' && <TextField label="Idle Time" type="time" />}

          {formData.alertType === 'tire-pressure' && (
            <TextField label="Tyre Pressure" type="number" placeholder="Enter Tyre Pressure" />
          )}

          {formData.alertType === 'speed-alert' && (
            <TextField type="number" label="Speed Alert" placeholder="Enter Speed Limit" />
          )}

          {inputEmail && (
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <h3 className="text-gray-900 text-sm md:text-base font-semibold">NOTIFICATION TYPE*</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-gray-900 font-medium">
              <input
                type="radio"
                checked={formData.platform === 'email'}
                onChange={(e) => {
                  setFormData({ ...formData, platform: 'email' });
                  setInputEmail(true);
                }}
                name="platform"
                value="email"
              />
              Email
            </label>

            <label className="flex items-center gap-2 text-gray-900 font-medium">
              <input
                type="radio"
                checked={formData.platform === 'platform'}
                onChange={(e) => {
                  setFormData({ ...formData, platform: 'platform' });
                  setInputEmail(false);
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
              isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditAlert;
