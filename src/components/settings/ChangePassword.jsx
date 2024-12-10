import { useState } from "react";
import Aside from "./Aside";
import TextField from "../shared/small/TextField";
import { toast } from "react-toastify";
import { useUpdateMyProfileMutation } from "../../redux/apis/authApis";

const ChangePassword = () => {
  const [activeButton, setActiveButton] = useState("profile");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!oldPassword || !newPassword || !confirmPassword) return toast.error("Please fill all the fields");
      if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
      const formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      const response = await updateProfile(formData).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error while changing password");
      console.log("Error while changing password", error);
    }
  };

  return (
    <div className="parentContainer min-h-screen">
      <div className="piechart p-4 md:p-5">
        <div className="grid grid-cols-12 xl:grid-cols-12 gap-5">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-2">
            <Aside activeButton={activeButton} handleButtonClick={handleButtonClick} />
          </div>
          <div className="col-span-12 xl:col-span-10 2xl:col-span-10">
            <h3 className="text-base lg:text-lg font-[500] mb-4 xl:mb-0">Change Password</h3>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[15px] mt-4 p-4 gap-4"
              style={{
                boxShadow: "-1px 1px 2px rgba(0, 0, 0, 0.1), 2px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="grid grid-cols-1 gap-3 ">
                <TextField
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  required
                />
                <TextField
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                />
                <TextField
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
              </div>
              <div className="mt-3">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="bg-[#03A5E030] text-[#03A5E0] text-[14px] w-full md:w-auto py-3 px-6 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
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
