import { NavLink } from "react-router-dom";

const Aside = () => {
  return (
    <div
      className="grid grid-col-1 gap-5 sticky top-10 left-0 "
      style={{ marginRight: "10px" }}
    >
      <NavLink
        to="/dashboard/settings"
        className={({ isActive }) =>
          `w-full px-6 py-3 flex items-center justify-center rounded-lg text-center ${
            isActive
              ? "border-[2px] border-[#03A5E0] bg-gray-200 text-[#03A5E0]"
              : "bg-gray-200"
          }`
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/dashboard/subscription-history"
        className={({ isActive }) =>
          `w-full  px-6 py-3 flex items-center justify-center rounded-lg text-center ${
            isActive
              ? "border-[2px] border-[#03A5E0] bg-gray-200 text-[#03A5E0]"
              : "bg-gray-200"
          }`
        }
      >
        Subscription Plan
      </NavLink>
      <NavLink
        to="/dashboard/change-password"
        className={({ isActive }) =>
          `w-full  px-6 py-3  flex items-center justify-center rounded-lg text-center ${
            isActive
              ? "border-[2px] border-[#03A5E0] bg-gray-200 text-[#03A5E0]"
              : "bg-gray-200"
          }`
        }
      >
        Change Password
      </NavLink>
    </div>
  );
};

export default Aside;
