import { useState } from 'react';
import Aside from '../../../components/settings/Aside';
import Profile from '../profile/Profile';

const Settings = () => {
  const [activeButton, setActiveButton] = useState('profile');

  const handleButtonClick = (buttonName) => setActiveButton(buttonName);
  return (
    <div className="parentContainer h-full ">
      <div className="piechart p-5 ">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12  xl:col-span-2 border-r-[1px] border-[#00000030]">
            <Aside activeButton={activeButton} handleButtonClick={handleButtonClick} />
          </div>
          <div className="col-span-12 xl:col-span-10">
            <h3 className="text-base lg:text-lg font-[500] mb-4 xl:mb-0">My Profile</h3>
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
