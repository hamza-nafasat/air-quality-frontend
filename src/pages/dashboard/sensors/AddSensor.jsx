/* eslint-disable react/prop-types */
import { useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import Button from '../../../components/shared/small/Button';
import TextField from '../../../components/shared/small/TextField';
import { useCreateSensorMutation } from '../../../redux/apis/sensorApis';
import { sensorOptionsForMultiSelect } from './sensorOptions';

const severities = ['low', 'medium', 'high'];

const AddSensor = ({ onClose }) => {
  const [addSensor, { isLoading }] = useCreateSensorMutation();
  const [form, setForm] = useState({
    name: '',
    uniqueId: uuidv4(),
    parameters: [],
    parameterValues: [],
  });
  const [openParam, setOpenParam] = useState(null);

  // handle multi select
  const handleChangeFroMultiSelect = (selectedOptions) => {
    const selectedParams = selectedOptions.map((option) => option.value);

    const newValues = selectedParams.flatMap((param) =>
      severities.map((sev) => {
        const existing = form.parameterValues.find((p) => p.name === param && p.severity === sev);
        return (
          existing || {
            name: param,
            min: '',
            max: '',
            severity: sev,
            color: '#000000',
          }
        );
      })
    );

    setForm((prev) => ({
      ...prev,
      parameters: selectedParams,
      parameterValues: newValues,
    }));
  };

  // handle parameter changes
  const handleParamValueChange = (paramName, severity, field, value) => {
    setForm((prev) => ({
      ...prev,
      parameterValues: prev.parameterValues.map((p) =>
        p.name === paramName && p.severity === severity ? { ...p, [field]: value } : p
      ),
    }));
  };

  // final submit
  const handleAddSensor = async () => {
    try {
      // basic validations
      if (!form.name || !form.uniqueId) {
        return toast.error('❌ Please fill all the required fields (Name & Unique Id)');
      }
      if (form.parameters.length === 0) {
        return toast.error('❌ Please select at least one parameter');
      }

      // validation for min, max, color
      const invalid = form.parameterValues.some((p) => !p.min || !p.max || !p.color);
      if (invalid) {
        return toast.error('❌ Please fill min, max, and color for all parameter severities');
      }

      // API call
      const response = await addSensor({
        name: form.name,
        uniqueId: form.uniqueId,
        parameters: form.parameters,
        parameterValues: form.parameterValues, // ✅ 4th field
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message);
      }
      onClose?.();
    } catch (error) {
      console.error('Error while adding sensor', error);
      toast.error(error?.data?.message || 'Error while adding sensor');
    }
  };

  return (
    <div>
      <h6 className="text-base md:text-lg text-[#000]">General Info</h6>

      {/* Basic Info */}
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TextField
          label="Name"
          type="text"
          placeholder="Device Name"
          value={form?.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm md:text-base font-[600]">Parameters</label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                border: '1px solid #333',
                borderRadius: '10px',
                outline: 'none',
                minHeight: '50px',
                fontSize: '14px',
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                fontSize: '14px',
                zIndex: 999,
              }),
            }}
            options={sensorOptionsForMultiSelect}
            onChange={handleChangeFroMultiSelect}
            value={sensorOptionsForMultiSelect.filter((option) =>
              form?.parameters?.includes(option?.value)
            )}
          />
        </div>

        <TextField
          label="Unique Id"
          type="text"
          placeholder="Device Unique Id"
          value={form?.uniqueId}
          onChange={(e) => setForm({ ...form, uniqueId: e.target.value })}
        />
      </div>

      {/* Parameter Accordion */}
      <div className="mt-4 space-y-2">
        {form.parameters.map((param) => (
          <div key={param} className="border rounded-lg shadow">
            <button
              className="w-full text-left p-2 bg-gray-100 font-semibold"
              onClick={() => setOpenParam(openParam === param ? null : param)}
            >
              {param.toUpperCase()}
            </button>
            {openParam === param && (
              <div className="p-3 space-y-3">
                {severities.map((sev) => {
                  const current = form.parameterValues.find(
                    (p) => p.name === param && p.severity === sev
                  );
                  return (
                    <div
                      key={sev}
                      className="border rounded p-2 grid grid-cols-1 md:grid-cols-4 gap-2 items-center"
                    >
                      <span className="capitalize font-medium">{sev}</span>
                      <TextField
                        type="number"
                        placeholder="Min"
                        value={current?.min || ''}
                        onChange={(e) => handleParamValueChange(param, sev, 'min', e.target.value)}
                      />
                      <TextField
                        type="number"
                        placeholder="Max"
                        value={current?.max || ''}
                        onChange={(e) => handleParamValueChange(param, sev, 'max', e.target.value)}
                      />
                      <TextField
                        type="color"
                        value={current?.color || '#000000'}
                        onChange={(e) =>
                          handleParamValueChange(param, sev, 'color', e.target.value)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-4">
        <Button
          disabled={isLoading}
          onClick={handleAddSensor}
          text="Add Sensor"
          width="w-full md:w-[150px]"
          height="h-[40px] md:h-[50px]"
        />
      </div>
    </div>
  );
};

export default AddSensor;
