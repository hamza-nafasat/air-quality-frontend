import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Aside = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user.role === 'user';
  const isAdminORSubscription = ['user', 'Subscription_Manager'].includes(user.role);

  // const isAdmin = true;
  console.log('isAdmin', isAdminORSubscription);
  return (
    <div className="grid grid-col-1 gap-5  sticky top-10 left-0 " style={{ marginRight: '10px' }}>
      <NavLink
        to="/dashboard/settings"
        className={({ isActive }) =>
          `w-full px-6 py-3 flex items-center justify-center rounded-lg text-center ${
            isActive ? 'border-[2px] border-[#03A5E0] bg-gray-200 text-[#03A5E0]' : 'bg-gray-200'
          }`
        }
      >
        Profile
      </NavLink>
      {isAdminORSubscription && (
        <NavLink
          to="/dashboard/subscription-history"
          className={({ isActive }) =>
            `w-full  px-6 py-3 flex items-center justify-center rounded-lg text-center ${
              isActive ? 'border-[2px] border-[#03A5E0] bg-gray-200 text-[#03A5E0]' : 'bg-gray-200'
            }`
          }
        >
          Subscription Plan
        </NavLink>
      )}

      <NavLink
        to="/dashboard/change-password"
        className={({ isActive }) =>
          `w-full  px-6 py-3  flex items-center justify-center rounded-lg text-center ${
            isActive ? 'border-[2px] border-[#03A5E0] bg-gray-200 text-[#03A5E0]' : 'bg-gray-200'
          }`
        }
      >
        Change Password
      </NavLink>
      {isAdmin && (
        <NavLink
          to="/dashboard/configuration"
          className={({ isActive }) =>
            `w-full  px-6 py-3  flex items-center justify-center rounded-lg text-center ${
              isActive ? 'border-[2px] border-[#03A5E0] bg-gray-200 text-[#03A5E0]' : 'bg-gray-200'
            }`
          }
        >
          Configuration
        </NavLink>
      )}
    </div>
  );
};

export default Aside;
