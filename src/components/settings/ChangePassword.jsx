import { useState } from "react";
import Aside from "./Aside";
import TextField from "../shared/small/TextField";

const ChangePassword = () => {
  const [activeButton, setActiveButton] = useState("profile");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="parentContainer min-h-screen">
      <div className="piechart p-4 md:p-5">
        <div className="grid grid-cols-12 xl:grid-cols-12 gap-5">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-2">
            <Aside
              activeButton={activeButton}
              handleButtonClick={handleButtonClick}
            />
          </div>
          <div className="col-span-12 xl:col-span-10 2xl:col-span-10">
            <h3 className="text-base lg:text-lg font-[500] mb-4 xl:mb-0">
              Change Password
            </h3>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[15px] mt-4 p-4 gap-4"
              style={{
                boxShadow:
                  "-1px 1px 2px rgba(0, 0, 0, 0.1), 2px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="grid grid-cols-1 gap-3 ">
                <TextField
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                />
                <TextField
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                />
                <TextField
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="bg-[#03A5E030] text-[#03A5E0] text-[14px] w-full md:w-auto py-3 px-6 rounded cursor-pointer"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
