import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { IoIosArrowForward, IoIosLogOut } from 'react-icons/io';
import { IoMenuOutline } from 'react-icons/io5';
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { toast } from 'react-toastify';
import profilePic from '../../../assets/images/header/profilepic.png';
import NotificationIcon from '../../../assets/svgs/pages/NotificationIcon';
import { useLogoutMutation } from '../../../redux/apis/authApis';
import Aside from '../aside/Aside';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExist } from '../../../redux/slices/authSlice';
import Button from '../../shared/small/Button';
import { useGetNotificationsByUserQuery } from '../../../redux/apis/notificationApis';
import { BiSolidError } from 'react-icons/bi';
import { RiErrorWarningFill } from 'react-icons/ri';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileActive, setProfileActive] = useState(false);
  const [notificationActive, setNotificationActive] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const profileRef = useRef();
  const notificationRef = useRef();
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const path = pathname[pathname.length - 1].replaceAll('-', ' ');
  const [logout, { isLoading }] = useLogoutMutation();
  const count = useSelector((state) => state.notification.count);
  const displayCount = count > 9 ? '9+' : count;
  const mobileNavHandler = () => setMobileNav(!mobileNav);

  const handleProfile = () => {
    setProfileActive(!profileActive);
    setNotificationActive(false);
  };

  const handleNotification = () => {
    setNotificationActive(!notificationActive);
    setProfileActive(false);
  };

  const logoutHandler = async () => {
    try {
      const response = await logout().unwrap();
      console.log('response while logout ', response);
      if (response?.success) {
        toast.success('Logout Successfully');
        await dispatch(userNotExist());
        return navigate('/login');
      }
    } catch (error) {
      console.log('Error while logout', error);
      toast.error(error?.data?.message || 'Error while logout');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setProfileActive(false);
        setNotificationActive(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [profileRef, notificationRef]);

  return (
    <>
      <div className="px-2 sm:px-6 py-3 sm:py-4 flex flex-col justify-between gap-3 bg-[url('assets/images/header/header-bg.png')] bg-no-repeat bg-cover bg-center h-[202px]">
        <div className="flex items-center justify-between">
          <div className="opacity-100 lg:opacity-0 cursor-pointer" onClick={mobileNavHandler}>
            <IoMenuOutline color="#fff" size={30} />
          </div>
          {/* profile and notification */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative">
              <div
                className="cursor-pointer"
                onClick={() => handleNotification()}
                ref={notificationRef}
              >
                <NotificationIcon />
              </div>
              <div className="absolute top-[0px] right-[0px] bg-primary-lightBlue rounded-full w-[18px] h-[18px] text-white grid place-items-center text-[10px] font-medium border-2 border-white">
                {displayCount}
              </div>
              {notificationActive && (
                <div className="absolute top-[57px] right-[-60px] sm:right-0 bg-white drop-shadow-md rounded-lg w-[240px] sm:w-[280px] h-[300px] border z-10 overflow-y-scroll custom-scrollbar">
                  <Notifications />
                </div>
              )}
            </div>
            <div className="w-[1px] bg-[#d0d6de] h-[40px]"></div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative" ref={profileRef}>
                <p
                  className="flex items-center gap-2 text-base text-white cursor-pointer"
                  onClick={() => handleProfile()}
                >
                  Hello, <span className="font-semibold">MKS</span>
                  <FaChevronDown size={10} rotate={profileActive ? 180 : 90} />
                </p>
                {profileActive && (
                  <div className="absolute top-[50px] right-0 bg-white shadow-md rounded-lg w-[150px] z-10 border">
                    <Link
                      className="flex items-center justify-between px-3 py-2 border-b"
                      to={'/dashboard/profile'}
                      onClick={() => setProfileActive(false)}
                    >
                      Profile
                      <IoIosArrowForward />
                    </Link>
                    <div
                      className={`flex cursor-pointer items-center justify-between px-3 py-2 cursor-pointer1${
                        isLoading ? ' opacity-50 cursor-not-allowed' : ''
                      } `}
                      onClick={logoutHandler}
                    >
                      logout
                      <IoIosLogOut />
                    </div>
                  </div>
                )}
              </div>
              <img
                src={profilePic}
                alt="profile-pic"
                className="w-[38px] h-[38px] rounded-full object-cover hidden md:inline-block border-2 border-primary-lightBlue"
              />
            </div>
          </div>
        </div>
        {pathname[2] === 'building-view' ? (
          <p></p>
        ) : (
          <h2 className="text-sm sm:text-md md:text-lg font-medium sm:font-semibold md:font-bold text-white uppercase truncate">
            {path}
          </h2>
        )}
      </div>
      <div
        className={`fixed inset-0 w-full h-full bg-[#000000b9] z-50 transition-all duration-500 ${
          mobileNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileNav(false)}
      >
        <div
          className={`absolute top-3 left-3 h-full transition-transform duration-500 ease-in-out ${
            mobileNav ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Aside />
        </div>
      </div>
    </>
  );
};

export default Header;

const notificationLists = [
  {
    userProfile: profilePic,
    title: 'Exceeded Time Limit',
    message: 'Visitor stayed too long.',
    time: '2m',
  },
  {
    userProfile: profilePic,
    title: 'Exceeded Time Limit',
    message: 'Visitor stayed too long.',
    time: '2m',
  },
  {
    userProfile: profilePic,
    title: 'Exceeded Time Limit',
    message: 'Visitor stayed too long.',
    time: '2m',
  },
  {
    userProfile: profilePic,
    title: 'Exceeded Time Limit',
    message: 'Visitor stayed too long.',
    time: '2m',
  },
  {
    userProfile: profilePic,
    title: 'Vehicle Misuse Detected',
    message: 'Unauthorized vehicle use.',
    time: '5m',
  },
  {
    userProfile: profilePic,
    title: 'Lost Smart Badge',
    message: 'Badge reported missing.',
    time: '10m',
  },
  {
    userProfile: profilePic,
    title: 'System Alert Triggered',
    message: 'Sensor detected issue.',
    time: '15m',
  },
  {
    userProfile: profilePic,
    title: 'Motion Detected Alert',
    message: 'Unexpected motion seen.',
    time: '20m',
  },
  {
    userProfile: profilePic,
    title: 'Low Battery Warning',
    message: 'Replace battery soon.',
    time: '25m',
  },
];

const Notifications = () => {
  const { user } = useSelector((state) => state.auth);
  const userID = user?._id;

  const { data: response, isLoading } = useGetNotificationsByUserQuery(userID);
  const notification = response?.data?.slice(0, 10) || [];

  const navigate = useNavigate();
  const allNotificationHandle = () => {
    navigate('/dashboard/notifications');
  };
  return (
    <div className="relative">
      <div>
        <h3 className="text-base md:text-md text-primary-lightBlue font-semibold px-3 pt-3 pb-2 border-b sticky top-0 left-0 bg-white">
          Notifications
        </h3>

        <div className="mt-1">
          {/* ✅ Loading State */}
          {isLoading ? (
            <div className=" h-[180px] flex items-center justify-center ">
              <div className="flex justify-center items-center p-6">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : notification.length > 0 ? (
            notification.map((notification, i) => (
              <div
                key={i}
                className="border-b py-1 px-2 flex items-center justify-between gap-1 cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <div>
                    {notification.severity === 'high' ? (
                      <RiErrorWarningFill className="text-red-500" />
                    ) : (
                      <BiSolidError className="text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-medium">{notification.title}</h3>
                    <p className="text-[10px] text-[#00000099]">{notification.message}</p>
                  </div>
                </div>
                <p className="text-[#00000099] text-[10px]">{notification.time}</p>
              </div>
            ))
          ) : (
            <p className="p-3 text-sm text-center">No notifications yet!</p>
          )}
        </div>
      </div>

      <div className="text-base md:text-md text-primary-lightBlue font-semibold px-3 pt-3 pb-2 border-b sticky bottom-0 left-0 bg-white">
        <Button text={'See all'} onClick={allNotificationHandle} />
      </div>
    </div>
  );
};
