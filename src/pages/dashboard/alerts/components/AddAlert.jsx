import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import TextField from '../../../../components/shared/small/TextField';
import Dropdown from '../../../../components/shared/small/Dropdown';
import { useCreateAlertMutation } from '../../../../redux/apis/alertApi';

const alertType = [
  { option: 'low-temp' },
  { option: 'high-temp' },
  { option: 'low-humidity' },
  { option: 'high-humidity' },
  { option: 'low-co' },
  { option: 'high-co' },
  { option: 'low-co2' },
  { option: 'high-co2' },
  { option: 'low-ch' },
  { option: 'high-ch' },
  { option: 'low-tvoc' },
  { option: 'high-tvoc' },
  { option: 'damage' },
];

const severityType = [{ option: 'high' }, { option: 'medium' }, { option: 'low' }];

const AddAlert = ({ onClose }) => {
  const [inputEmail, setInputEmail] = useState(false);
  const [createAlert, { isLoading }] = useCreateAlertMutation();

  const [formData, setFormData] = useState({
    alertName: '',
    alertType: '',
    severityType: '',
    email: '',
    platform: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const { alertName, alertType, severityType, platform, email } = formData;

    if (!alertName || !alertType || !severityType || !platform) {
      return toast.error('All required fields must be filled.');
    }

    const payload = {
      name: alertName,
      type: alertType,
      severity: severityType,
      platform,
    };

    if (inputEmail && email) {
      payload.onMail = email;
    }

    try {
      await createAlert(payload).unwrap();
      toast.success('Alert created successfully');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || 'Something went wrong');
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
            onSelect={(option) => setFormData({ ...formData, alertType: option.option })}
          />

          <Dropdown
            label="Severity Type"
            options={severityType}
            value={formData.severityType}
            onSelect={(option) => setFormData({ ...formData, severityType: option.option })}
          />

          {inputEmail && (
            <TextField
              name="email"
              type="email"
              label="Email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
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

export default AddAlert;
