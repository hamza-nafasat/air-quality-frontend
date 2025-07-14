/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Aside from './Aside';
import Button from '../shared/small/Button';
import Modal from '../shared/modal/Modal';
import TextField from '../shared/small/TextField';
import Dropdown from '../shared/small/Dropdown';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from '../../redux/apis/authApis';

const intervalTimesInSeconds = [
  { option: '3 minutes', value: '180000' },
  { option: '2 minutes', value: '120000' },
  { option: '1 minutes', value: '60000' },
  { option: '10 seconds', value: '10000' },
  { option: '30 seconds', value: '30000' },
  { option: '5 seconds', value: '5000' },
];

const Configuration = () => {
  const { user } = useSelector((state) => state.auth);
  const hasSubscription = Boolean(user?.subscriptionId);
  const { refetch } = useGetMyProfileQuery('');
  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();
  const [activeButton, setActiveButton] = useState('configuration');
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Remote Database');
  const [pendingOption, setPendingOption] = useState('');
  // const [timeInterval, setTimeInterval] = useState('');
  // const [defaultTextForInterval, setDefaultTextForInterval] = useState('3 minutes');
  const [timeInterval, setTimeInterval] = useState('180000'); // 3 min (ms)
  const [defaultTextForInterval, setDefaultTextForInterval] = useState('3 minutes');
  const [form, setForm] = useState({
    hostName: '',
    portName: '',
    username: '',
    password: '',
    databaseName: '',
  });

  const modalOpenHandler = () => setModal(true);
  const modalCloseHandler = () => setModal(false);
  const handleRadioChange = (event) => {
    setPendingOption(event.target.value);
    modalOpenHandler();
  };
  const handleConfirmChange = () => {
    setSelectedOption(pendingOption);
    modalCloseHandler();
  };
  const handleButtonClick = (buttonName) => setActiveButton(buttonName);

  const updateProfileHandler = async () => {
    try {
      const formData = new FormData();
      if (selectedOption === 'Local Database') {
        if (
          !form.databaseName ||
          !form.hostName ||
          !form.portName ||
          !form.username ||
          !form.password
        )
          return toast.error('Please fill all the fields of local database');
        formData.append('isCustomDb', 'true');
        formData.append('customDbHost', form.hostName);
        formData.append('customDbPort', form.portName);
        formData.append('customDbUsername', form.username);
        formData.append('customDbPassword', form.password);
        formData.append('customDbName', form.databaseName);
      }
      if (selectedOption == 'Remote Database') formData.append('isCustomDb', 'false');
      if (timeInterval) formData.append('interval', timeInterval);

      const response = await updateProfile(formData).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        await refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Error while updating profile');
      console.log('Error while updating profile', error);
    }
  };

  useEffect(() => {
    console.log('this is user', user);
    if (user) {
      setForm({
        hostName: user?.customDbHost || '',
        portName: user?.customDbPort || '',
        username: user?.customDbUsername || '',
        password: user?.customDbPassword || '',
        databaseName: user?.customDbName || '',
      });
      setSelectedOption(user?.isCustomDb ? 'Local Database' : 'Remote Database');
    }
    if (user?.interval) {
      const interval = intervalTimesInSeconds.find((item) => item.value == String(user?.interval));
      console.log(interval, interval?.option, user?.interval);
      setDefaultTextForInterval(interval?.option || 'Select Time Interval');
    }

    /* ───────────────────────────────────────────────────────── */
    /* 1.  Un‑subscribed user ‑‑ force 3‑minute default         */
    /* ───────────────────────────────────────────────────────── */
    if (!hasSubscription) {
      setDefaultTextForInterval('3 minutes');
      setTimeInterval('180000');
      return; // nothing else to check
    }

    /* ───────────────────────────────────────────────────────── */
    /* 2.  Subscribed user with a saved custom interval         */
    /* ───────────────────────────────────────────────────────── */
    if (user?.interval) {
      const match = intervalTimesInSeconds.find((i) => i.value === String(user.interval));
      setDefaultTextForInterval(match?.option ?? 'Select Time Interval');
      setTimeInterval(match?.value ?? '180000');
    }
  }, [user]);
  return (
    <div className="parentContainer min-h-screen">
      <div className="piechart p-4 md:p-5">
        <div className="grid grid-cols-12 xl:grid-cols-12 gap-5">
          {/* Sidebar */}

          <div className="col-span-12 lg:col-span-2">
            <Aside activeButton={activeButton} handleButtonClick={handleButtonClick} />
          </div>
          <div className="col-span-12 xl:col-span-10 2xl:col-span-10">
            <div className="bg-white rounded-[15px]">
              <h3 className="text-base lg:text-xl font-bold">Pull Request Intervals</h3>
              <div className="pl-0 md:pl-8 mt-4 md:mt-6">
                {/* <label className="text-sm md:text-base font-medium mb-2 block">
                  Select Time Intervals
                </label>
                <Dropdown
                  onSelect={(option) => setTimeInterval(option?.value)}
                  defaultText={defaultTextForInterval}
                  options={intervalTimesInSeconds}
                /> */}

                <label className="text-sm md:text-base font-medium mb-2 block">
                  Select Time Intervals
                </label>

                {hasSubscription ? (
                  <Dropdown
                    onSelect={(opt) => setTimeInterval(opt?.value)}
                    defaultText={defaultTextForInterval}
                    options={intervalTimesInSeconds}
                  />
                ) : (
                  <p className="text-sm text-gray-500">
                    Interval fixed at <strong>3&nbsp;minutes</strong>
                    &nbsp;(subscription required to change)
                  </p>
                )}

                <h3 className="text-sm md:text-base font-medium mb-2 mt-4 md:mt-6">
                  Database Type
                </h3>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      name="database"
                      value="Remote Database"
                      onChange={handleRadioChange}
                      checked={selectedOption === 'Remote Database'}
                    />
                    Remote Database
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      name="database"
                      value="Local Database"
                      onChange={handleRadioChange}
                      checked={selectedOption === 'Local Database'}
                    />
                    Local Database
                  </label>
                </div>
                <div className="mt-4">
                  {selectedOption === 'Local Database' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      <div className="lg:col-span-6">
                        <TextField
                          type="text"
                          placeholder="Host Name"
                          onChange={(e) => setForm({ ...form, hostName: e.target.value })}
                          value={form.hostName}
                        />
                      </div>
                      <div className="lg:col-span-6">
                        <TextField
                          type="number"
                          placeholder="Port Number"
                          onChange={(e) => setForm({ ...form, portName: e.target.value })}
                          value={form.portName}
                        />
                      </div>
                      <div className="lg:col-span-6">
                        <TextField
                          type="text"
                          placeholder="Database Name"
                          onChange={(e) => setForm({ ...form, databaseName: e.target.value })}
                          value={form.databaseName}
                        />
                      </div>
                      <div className="lg:col-span-6">
                        <TextField
                          type="text"
                          placeholder="Username"
                          onChange={(e) => setForm({ ...form, username: e.target.value })}
                          value={form.username}
                        />
                      </div>
                      <div className="lg:col-span-12">
                        <TextField
                          type="text"
                          placeholder="Password"
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          value={form.password}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    onClick={updateProfileHandler}
                    text="Save"
                    width="w-[150px]"
                    height="h-[40px] md:h-[50px]"
                  />
                </div>
              </div>
              {modal && (
                <Modal
                  onClose={modalCloseHandler}
                  title="Database Storage Confirmation"
                  width="w-[320px] md:w-[450px]"
                >
                  <ConfirmationModal onClose={modalCloseHandler} onConfirm={handleConfirmChange} />
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div>
      <h6 className="text-sm md:text-base text-gray-400 font-medium">
        Do you want to store your data in a local database
      </h6>
      <div className="mt-12 flex justify-end">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            bg="#787878"
            text="Cancel"
            width="w-[120px]"
            height="h-[40px] md:h-[50px]"
            onClick={onClose}
          />
          <Button
            bg="#0c67bc"
            text="Change"
            width="w-[120px]"
            height="h-[40px] md:h-[50px]"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};
