import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaChevronDown } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
import Button from '../../../../components/shared/small/Button';
import TextField from '../../../../components/shared/small/TextField';
import Dropdown from '../../../../components/shared/small/Dropdown';
import MultipleSelector from '../../../../components/shared/small/MultipleSelector';
// import { useGetAllRuleEnginesQuery } from '../../../../services/ruleEngineApi';
import { useCreateRuleMutation } from '../../../../redux/apis/ruleEngineApi';

const alertType = [
  { option: 'ch' },
  { option: 'co' },
  { option: 'co2' },
  { option: 'humidity' },
  { option: 'temperature' },
  { option: 'tvoc' },
];

const severityType = [{ option: 'high' }, { option: 'medium' }, { option: 'low' }];

const AddRuleEngine = ({ onClose, isLoading, data }) => {
  const [createRuleEngine] = useCreateRuleMutation();
  // const { refetch } = useGetAllRuleEnginesQuery();
  const [addLoading, setAddLoading] = useState(false);
  const [isAccordionComplete, setIsAccordionComplete] = useState(true);
  const [accordionList, setAccordionList] = useState([{ id: 1, type: '' }]);
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [inputEmail, setInputEmail] = useState(false);
  console.log('addselectedBuildings', selectedBuildings);

  const [formData, setFormData] = useState({
    alertName: '',
    severityType: '',
    email: '',
    platform: '',
    status: '',
  });

  const handleAddAccordion = () => {
    setAccordionList((prevList) => [...prevList, { id: prevList.length + 1, type: '' }]);
  };

  const handleRemoveAccordion = (id) => {
    setAccordionList((prevList) => prevList.filter((accordion) => accordion.id !== id));
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
      platform: checked ? name : '',
    }));
    setInputEmail(name === 'email');
  };

  const handleSave = async () => {
    const { alertName, email, severityType, platform, status } = formData;

    if (!alertName || !severityType || !platform || !status)
      return toast.error('All fields are required');
    if (platform === 'email' && !email) return toast.error('Email is required');
    if (!selectedBuildings.length) return toast.error('Select at least one building');

    const alerts = accordionList
      .map((item) => {
        const data = {};
        if (item?.alertType) data.type = item.alertType;
        if (item?.lessThen) data.lessThen = item.lessThen;
        if (item?.moreThen) data.moreThen = item.moreThen;
        // if (item?.sensorUniqueId) data.sensorUniqueId = item.sensorUniqueId;
        if (data.type) return data;
        return null;
      })
      .filter(Boolean);

    if (!alerts.length) return toast.error('At least one valid alert config is required');

    try {
      setAddLoading(true);

      await createRuleEngine({
        name: alertName,
        alerts,
        severity: severityType,
        platform,
        status,
        onMail: email,
        building: selectedBuildings.map((b) => b._id), // ✅ convert here
      }).unwrap();

      toast.success('Rule Engine created successfully');
      // refetch();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || 'Failed to create Rule Engine');
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
    <div className="">
      {/* Form */}
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <TextField
              type="text"
              label="Alert Name"
              required
              placeholder="Alert Name"
              name="alertName"
              value={formData.alertName || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <Dropdown
              label="Severity Type"
              options={severityType}
              onSelect={(option) => setFormData({ ...formData, severityType: option.option })}
            />
          </div>

          {/* <MultipleSelector
            label="Buildings"
            options={data} // [{ _id, name }]
            // defaultText="Select Buildings"
            value={selectedBuildings}
            onSelect={(selected) => setSelectedBuildings(selected.map((s) => s._id))}
          /> */}
          <MultipleSelector
            label="Buildings"
            options={data} // [{ _id, name }]
            value={selectedBuildings} // should be full objects
            onSelect={(selected) => setSelectedBuildings(selected)} // don't map to _id here
          />

          <div>
            <Dropdown
              label="Status"
              options={[{ option: 'enable' }, { option: 'disable' }]}
              onSelect={(option) => setFormData({ ...formData, status: option.option })}
            />
          </div>

          {inputEmail && (
            <div>
              <TextField
                type="email"
                label="Email"
                name="email"
                placeholder="Enter Email"
                value={formData.email || ''}
                onChange={handleChange}
                required
              />
            </div>
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
                className="text-indigo-500 focus:ring-indigo-300"
              />
              <span>Email</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="platform"
                checked={formData.platform === 'platform'}
                onChange={handleCheckboxChange}
                className="text-indigo-500 focus:ring-indigo-300"
              />
              <span>Platform</span>
            </label>
          </div>
        </div>

        {/* Accordion Component */}
        <div className="mt-6">
          {accordionList.map((accordion) => (
            <Accordion
              key={accordion.id}
              id={accordion.id}
              onRemove={handleRemoveAccordion}
              accordionList={accordionList}
              setAccordionList={setAccordionList}
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

export default AddRuleEngine;

const Accordion = ({ id, onRemove, accordionList, setAccordionList }) => {
  const [formData, setFormData] = useState({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => setIsAccordionOpen(!isAccordionOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccordionList((prevList) =>
      prevList.map((accordion) =>
        accordion.id === id ? { ...accordion, [name]: value } : accordion
      )
    );
  };

  useEffect(() => {
    setFormData(accordionList.find((a) => a.id === id) || {});
  }, [id, accordionList]);

  return (
    <div className="border border-gray-300 rounded-lg my-4 shadow-sm">
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-100"
        onClick={toggleAccordion}
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
            <div>
              <Dropdown
                label="Alert Type"
                options={alertType}
                value={formData.alertType}
                onSelect={(option) =>
                  setAccordionList((prevList) =>
                    prevList.map((accordion) =>
                      accordion.id === id ? { ...accordion, alertType: option.option } : accordion
                    )
                  )
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* <TextField
                label="Sensor Unique ID"
                name="sensorUniqueId"
                type="text"
                onChange={handleChange}
                value={formData?.sensorUniqueId || ''}
              /> */}
              <TextField
                label="Less Than"
                name="lessThen"
                type="number"
                onChange={handleChange}
                value={formData?.lessThen || ''}
              />
              <TextField
                label="More Than"
                name="moreThen"
                type="number"
                onChange={handleChange}
                value={formData?.moreThen || ''}
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
