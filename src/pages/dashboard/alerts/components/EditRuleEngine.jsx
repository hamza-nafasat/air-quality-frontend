import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaChevronDown } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
import Button from '../../../../components/shared/small/Button';
import TextField from '../../../../components/shared/small/TextField';
import Dropdown from '../../../../components/shared/small/Dropdown';
import MultipleSelector from '../../../../components/shared/small/MultipleSelector';
import { useUpdateRuleMutation } from '../../../../redux/apis/ruleEngineApi';

const alertType = [
  { option: 'ch' },
  { option: 'co' },
  { option: 'co2' },
  { option: 'humidity' },
  { option: 'temperature' },
  { option: 'tvoc' },
];

const severityType = [{ option: 'high' }, { option: 'medium' }, { option: 'low' }];

const EditRuleEngine = ({ isLoading, onClose, data, editData }) => {
  const [updateRuleEngine] = useUpdateRuleMutation();
  const [accordionList, setAccordionList] = useState([]);
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [inputEmail, setInputEmail] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  console.log('data', data);
  console.log('editData', editData);

  const [formData, setFormData] = useState({
    alertName: '',
    severityType: '',
    email: '',
    platform: '',
    status: '',
  });
  console.log('formDataformData', editData);
  console.log('datadatadatadata', data);

  useEffect(() => {
    if (editData) {
      const { name, severity, onMail, platform, status, alerts, building } = editData;

      setFormData({
        alertName: name || '',
        severityType: severity || '',
        email: onMail || '',
        platform: platform || '',
        status: status || '',
      });

      setAccordionList(
        alerts?.map((item, idx) => ({
          id: idx + 1,
          alertType: item.type,
          lessThen: item.lessThen,
          moreThen: item.moreThen,
        }))
      );

      // const preSelected = data?.filter((b) => building?.includes(b._id));
      // setSelectedBuildings(preSelected);
      if (editData && data?.length) {
        const preSelected = data.filter((item) => editData.building.includes(item._id));
        setSelectedBuildings(preSelected);
      }
      setInputEmail(platform === 'email');
    }
  }, [editData, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      platform: checked ? name : '',
    }));
    setInputEmail(name === 'email');
  };

  const handleAddAccordion = () => {
    setAccordionList((prev) => [...prev, { id: prev.length + 1, type: '' }]);
  };

  const handleRemoveAccordion = (id) => {
    setAccordionList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = async () => {
    const { alertName, email, severityType, platform, status } = formData;

    if (!alertName || !severityType || !platform || !status)
      return toast.error('All fields are required');
    if (platform === 'email' && !email) return toast.error('Email is required');
    if (!selectedBuildings.length) return toast.error('Select at least one building');

    const alerts = accordionList
      .map(({ alertType, lessThen, moreThen }) => {
        const obj = {};
        if (alertType) obj.type = alertType;
        if (lessThen) obj.lessThen = lessThen;
        if (moreThen) obj.moreThen = moreThen;
        return obj.type ? obj : null;
      })
      .filter(Boolean);

    if (!alerts.length) return toast.error('At least one alert is required');

    try {
      setAddLoading(true);
      await updateRuleEngine({
        ruleId: editData._id,
        payload: {
          name: alertName,
          severity: severityType,
          platform,
          status,
          onMail: email,
          building: selectedBuildings?.map((b) => b._id),
          alerts,
        },
      }).unwrap();

      toast.success('Rule Engine updated successfully');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || 'Failed to update Rule Engine');
    } finally {
      setAddLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center ">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            type="text"
            label="Alert Name"
            name="alertName"
            value={formData.alertName}
            onChange={handleChange}
            required
          />

          <MultipleSelector
            label="Buildings"
            options={data}
            value={selectedBuildings} // pre-selected will now work
            onSelect={(selected) => setSelectedBuildings(selected)}
          />

          <MultipleSelector
            label="Buildings"
            options={data}
            // defaultText={selectedBuildings?.map((item) => item.name)}
            value={selectedBuildings}
            onSelect={(selected) => setSelectedBuildings(selected)}
          />

          <Dropdown
            label="Status"
            options={[{ option: 'enable' }, { option: 'disable' }]}
            value={formData.status}
            defaultText={formData.status}
            onSelect={(option) => setFormData({ ...formData, status: option.option })}
          />

          {inputEmail && (
            <TextField
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="font-semibold text-sm">NOTIFICATION TYPE*</span>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="email"
                checked={formData.platform === 'email'}
                onChange={handleCheckboxChange}
              />
              <span>Email</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="platform"
                checked={formData.platform === 'platform'}
                onChange={handleCheckboxChange}
              />
              <span>Platform</span>
            </label>
          </div>
        </div>

        <div className="mt-6">
          {accordionList?.map((item, idx) => (
            <Accordion
              key={item.id}
              id={item.id}
              data={item}
              onRemove={handleRemoveAccordion}
              setAccordionList={setAccordionList}
              accordionList={accordionList}
            />
          ))}
          <button onClick={handleAddAccordion}>
            <MdAddBox fontSize={30} color="#03A5E0" />
          </button>
        </div>

        <div className="flex justify-end items-center gap-4 mt-6">
          <Button
            text="Save"
            width="w-full md:w-[100px]"
            onClick={handleSave}
            disabled={addLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditRuleEngine;

const Accordion = ({ id, data, onRemove, setAccordionList, accordionList }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccordionList((prev) =>
      prev?.map((item) => (item.id === id ? { ...item, [name]: value } : item))
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg my-4 shadow-sm">
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-100"
        onClick={() => setIsAccordionOpen((prev) => !prev)}
      >
        <h6 className="font-semibold text-sm">Alert Configuration</h6>
        <FaChevronDown
          className={`text-gray-500 transition-all duration-500 ${
            isAccordionOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {isAccordionOpen && (
        <div className="p-3 bg-white">
          <div className="grid grid-cols-1 gap-4">
            <Dropdown
              label="Alert Type"
              options={alertType}
              value={data.alertType}
              defaultText={data.alertType}
              onSelect={(option) =>
                setAccordionList((prev) =>
                  prev?.map((item) =>
                    item.id === id ? { ...item, alertType: option.option } : item
                  )
                )
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label="Less Than"
                name="lessThen"
                type="number"
                value={data.lessThen || ''}
                onChange={handleChange}
              />
              <TextField
                label="More Than"
                name="moreThen"
                type="number"
                value={data.moreThen || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button text="Close" width="w-full md:w-[80px]" onClick={() => onRemove(id)} />
          </div>
        </div>
      )}
    </div>
  );
};
