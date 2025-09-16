// import { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import logo from '../../../assets/images/logo.png';
// import Button from '../../shared/small/Button';
// import { IoIosArrowBack, IoIosLogOut } from 'react-icons/io';
// import HomeIcon from '../../../assets/svgs/pages/HomeIcon';
// import BuildingIcon from '../../../assets/svgs/pages/BuildingIcon';
// import DevicesIcon from '../../../assets/svgs/pages/DevicesIcon';
// import ReportsIcon from '../../../assets/svgs/pages/ReportsIcon';
// import SensorsIcon from '../../../assets/svgs/pages/SensorsIcon';
// import SettingsIcon from '../../../assets/svgs/pages/SettingsIcon';
// import ArrowbackIcon from '../../../assets/svgs/pages/ArrowbackIcon';
// import SubscriptionIcon from '../../../assets/svgs/pages/SubscriptionIcon';

// const Aside = () => {
//   const navigate = useNavigate();
//   const [isNavOpen, setIsNavOpen] = useState(true);
//   const location = useLocation();
//   const locationSplit = location.pathname.split('/');
//   const url = locationSplit[locationSplit.length - 1];
//   // console.log(url);

//   const handleNavOpen = () => setIsNavOpen(!isNavOpen);

//   let pages = [
//     {
//       title: 'dashboard',
//       link: '/dashboard',
//       icon: <HomeIcon activeLink={url === 'dashboard'} />,
//     },
//     {
//       title: url.includes('add-building') ? 'add-building' : 'buildings',
//       link: '/dashboard/buildings',
//       icon: <BuildingIcon activeLink={url.includes('buildings') || url.includes('add-building')} />,
//     },
//     {
//       title: 'devices',
//       link: '/dashboard/devices',
//       icon: <DevicesIcon activeLink={url === 'devices'} />,
//     },
//     {
//       title: 'sensors',
//       link: '/dashboard/sensors',
//       icon: <SensorsIcon activeLink={url.includes('sensors') || url.includes('sensors/sensor-detai')} />,
//     },
//     {
//       title: 'reports',
//       link: '/dashboard/reports',
//       icon: <ReportsIcon activeLink={url === 'reports'} />,
//     },
//     {
//       title: 'alert type',
//       link: '/dashboard/alerts',
//       icon: <ReportsIcon activeLink={url === 'alerts'} />,
//     },
//     {
//       title: 'subscription',
//       link: '/dashboard/subscription',
//       icon: <SubscriptionIcon activeLink={url === 'subscription'} />,
//     },
//     {
//       title: 'settings',
//       link: '/dashboard/settings',
//       icon: <SettingsIcon activeLink={url === 'settings'} />,
//     },
//   ];

//   return (
//     <div
//       className={`p-4 rounded-t-md h-full relative flex flex-col justify-between transition-all duration-500 bg-white ${
//         isNavOpen ? 'w-[200px]' : 'w-[65px]'
//       }`}
//     >
//       <div className="absolute top-[6%] right-[-11px] cursor-pointer z-10" onClick={handleNavOpen}>
//         <div
//           className={`hidden lg:block transition-all duration-500 ${
//             isNavOpen ? 'rotate-0' : 'rotate-180'
//           }`}
//         >
//           <ArrowbackIcon />
//         </div>
//       </div>
//       <div className="py-4">
//         <div className="w-full mb-5 xl:mb-12 flex items-center justify-center gap-1">
//           <img src={logo} alt="logo" className="w-[31px] h-[31px] block" />
//           <p
//             className={`text-primary-lightBlue odor-font font-medium text-base text-nowrap md:text-md transition-all duration-500 ${
//               isNavOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
//             }`}
//           >
//             Air Quality
//           </p>
//         </div>
//         <div
//           className={`flex flex-col justify-center gap-2 ${
//             isNavOpen ? 'items-start' : 'items-center'
//           }`}
//         >
//           {pages?.map((page, i) => (
//             <Link
//               key={i}
//               to={page.link}
//               className={`flex items-center w-full min-w-fit p-2 cursor-pointer transition-all duration-400 ${
//                 isNavOpen ? 'gap-2' : 'gap-[0]'
//               } ${page.title === url ? 'bg-primary-lightBlue rounded-md' : ''}`}
//             >
//               <div
//                 className={`text-[20px] ${
//                   page.title === url ? 'text-primary-lightBlue' : 'text-white'
//                 }`}
//               >
//                 {page.icon}
//               </div>
//               <p
//                 className={`navbar-title text-sm md:text-base capitalize transition-opacity duration-500 ${
//                   page.title === url ? 'text-white' : 'text-[#526581]'
//                 } ${isNavOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
//               >
//                 {page.title}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Aside;

// import { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import logo from '../../../assets/images/logo.png';
// import Button from '../../shared/small/Button';
// import { IoIosArrowBack, IoIosLogOut } from 'react-icons/io';
// import HomeIcon from '../../../assets/svgs/pages/HomeIcon';
// import BuildingIcon from '../../../assets/svgs/pages/BuildingIcon';
// import DevicesIcon from '../../../assets/svgs/pages/DevicesIcon';
// import ReportsIcon from '../../../assets/svgs/pages/ReportsIcon';
// import SensorsIcon from '../../../assets/svgs/pages/SensorsIcon';
// import SettingsIcon from '../../../assets/svgs/pages/SettingsIcon';
// import ArrowbackIcon from '../../../assets/svgs/pages/ArrowbackIcon';
// import SubscriptionIcon from '../../../assets/svgs/pages/SubscriptionIcon';
// import { PiUsers } from 'react-icons/pi';

// const Aside = () => {
//   const navigate = useNavigate();
//   const [isNavOpen, setIsNavOpen] = useState(true);
//   const location = useLocation();

//   // Use full path (without leading slash)
//   const url = location.pathname.replace(/^\/+/, '');

//   const handleNavOpen = () => setIsNavOpen(!isNavOpen);

//   const pages = [
//     {
//       title: 'dashboard',
//       link: '/dashboard',
//       isActive: url === 'dashboard',
//       icon: <HomeIcon activeLink={url === 'dashboard'} />,
//     },

//     {
//       title: 'Managers',
//       link: '/dashboard/users',
//       isActive: url.startsWith('dashboard/users'),
//       icon: <PiUsers activeLink={url.startsWith('dashboard/users')} />,
//     },
//     {
//       title: url.includes('add-building') ? 'add-building' : 'buildings',
//       link: '/dashboard/buildings',
//       isActive:
//         url.startsWith('dashboard/buildings') ||
//         url.includes('add-building') ||
//         url.includes('dashboard/building-view') ||
//         url.includes('dashboard/floor-view'),
//       icon: (
//         <BuildingIcon
//           activeLink={
//             url.startsWith('dashboard/buildings') ||
//             url.includes('add-building') ||
//             url.includes('dashboard/building-view') ||
//             url.includes('dashboard/floor-view')
//           }
//         />
//       ),
//     },

//     {
//       title: 'sensors',
//       link: '/dashboard/sensors',
//       isActive: url.startsWith('dashboard/sensors'),
//       icon: <SensorsIcon activeLink={url.startsWith('dashboard/sensors')} />,
//     },
//     {
//       title: 'reports',
//       link: '/dashboard/reports',
//       isActive: url.startsWith('dashboard/reports'),
//       icon: <ReportsIcon activeLink={url.startsWith('dashboard/reports')} />,
//     },
//     {
//       title: 'alert type',
//       link: '/dashboard/alerts',
//       isActive: url.startsWith('dashboard/alerts'),
//       icon: <ReportsIcon activeLink={url.startsWith('dashboard/alerts')} />,
//     },
//     {
//       title: 'subscription',
//       link: '/dashboard/subscription',
//       isActive: url.startsWith('dashboard/subscription'),
//       icon: <SubscriptionIcon activeLink={url.startsWith('dashboard/subscription')} />,
//     },
//     {
//       title: 'settings',
//       link: '/dashboard/settings',
//       isActive: url.startsWith('dashboard/settings'),
//       icon: <SettingsIcon activeLink={url.startsWith('dashboard/settings')} />,
//     },
//   ];

//   return (
//     <div
//       className={`p-4 rounded-t-md h-full relative flex flex-col justify-between transition-all duration-500 bg-white ${
//         isNavOpen ? 'w-[200px]' : 'w-[65px]'
//       }`}
//     >
//       <div className="absolute top-[6%] right-[-11px] cursor-pointer z-10" onClick={handleNavOpen}>
//         <div
//           className={`hidden lg:block transition-all duration-500 ${
//             isNavOpen ? 'rotate-0' : 'rotate-180'
//           }`}
//         >
//           <ArrowbackIcon />
//         </div>
//       </div>
//       <div className="py-4">
//         <div className="w-full mb-5 xl:mb-12 flex items-center justify-center gap-1">
//           <img src={logo} alt="logo" className="w-[31px] h-[31px] block" />
//           <p
//             className={`text-primary-lightBlue odor-font font-medium text-base text-nowrap md:text-md transition-all duration-500 ${
//               isNavOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
//             }`}
//           >
//             Air Quality
//           </p>
//         </div>
//         <div
//           className={`flex flex-col justify-center gap-2 ${
//             isNavOpen ? 'items-start' : 'items-center'
//           }`}
//         >
//           {pages?.map((page, i) => (
//             <Link
//               key={i}
//               to={page.link}
//               className={`flex items-center w-full min-w-fit p-2 cursor-pointer transition-all duration-400 ${
//                 isNavOpen ? 'gap-2' : 'gap-[0]'
//               } ${page.isActive ? 'bg-primary-lightBlue rounded-md' : ''}`}
//             >
//               <div className={`text-[20px] ${page.isActive ? 'text-white' : 'text-[#526581]'}`}>
//                 {page.icon}
//               </div>
//               <p
//                 className={`navbar-title text-sm md:text-base capitalize transition-opacity duration-500 ${
//                   page.isActive ? 'text-white' : 'text-[#526581]'
//                 } ${isNavOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
//               >
//                 {page.title}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Aside;
import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import ArrowbackIcon from '../../../assets/svgs/pages/ArrowbackIcon';
import HomeIcon from '../../../assets/svgs/pages/HomeIcon';
import BuildingIcon from '../../../assets/svgs/pages/BuildingIcon';
import ReportsIcon from '../../../assets/svgs/pages/ReportsIcon';
import SensorsIcon from '../../../assets/svgs/pages/SensorsIcon';
import SettingsIcon from '../../../assets/svgs/pages/SettingsIcon';
import SubscriptionIcon from '../../../assets/svgs/pages/SubscriptionIcon';
import { PiUsers } from 'react-icons/pi';
import { useSelector } from 'react-redux';

const Aside = () => {
  const { user } = useSelector((state) => state.auth);

  const [isNavOpen, setIsNavOpen] = useState(true);
  const location = useLocation();
  const url = location.pathname.replace(/^\/+/, '');

  const handleNavOpen = () => setIsNavOpen(!isNavOpen);

  // ✅ Define all possible pages
  const allPages = [
    {
      title: 'dashboard',
      link: '/dashboard',
      isActive: url === 'dashboard',
      icon: <HomeIcon activeLink={url === 'dashboard'} />,
    },
    {
      title: 'Managers',
      link: '/dashboard/manager',
      isActive: url.startsWith('dashboard/manager'),
      icon: <PiUsers activeLink={url.startsWith('dashboard/manager')} />,
    },
    {
      title: 'Users',
      link: '/dashboard/users',
      isActive: url.startsWith('dashboard/users'),
      icon: <PiUsers activeLink={url.startsWith('dashboard/users')} />,
    },
    {
      title: url.includes('add-building') ? 'add-building' : 'buildings',
      link: '/dashboard/buildings',
      isActive:
        url.startsWith('dashboard/buildings') ||
        url.includes('add-building') ||
        url.includes('dashboard/building-view') ||
        url.includes('dashboard/floor-view'),
      icon: (
        <BuildingIcon
          activeLink={
            url.startsWith('dashboard/buildings') ||
            url.includes('add-building') ||
            url.includes('dashboard/building-view') ||
            url.includes('dashboard/floor-view')
          }
        />
      ),
    },
    {
      title: 'sensors',
      link: '/dashboard/sensors',
      isActive: url.startsWith('dashboard/sensors'),
      icon: <SensorsIcon activeLink={url.startsWith('dashboard/sensors')} />,
    },
    {
      title: 'reports',
      link: '/dashboard/reports',
      isActive: url.startsWith('dashboard/reports'),
      icon: <ReportsIcon activeLink={url.startsWith('dashboard/reports')} />,
    },
    {
      title: 'alert type',
      link: '/dashboard/alerts',
      isActive: url.startsWith('dashboard/alerts'),
      icon: <ReportsIcon activeLink={url.startsWith('dashboard/alerts')} />,
    },
    {
      title: 'subscription',
      link: '/dashboard/subscription',
      isActive: url.startsWith('dashboard/subscription'),
      icon: <SubscriptionIcon activeLink={url.startsWith('dashboard/subscription')} />,
    },
    {
      title: 'settings',
      link: '/dashboard/settings',
      isActive: url.startsWith('dashboard/settings'),
      icon: <SettingsIcon activeLink={url.startsWith('dashboard/settings')} />,
    },
  ];

  // ✅ Filter pages based on role
  const filteredPages = useMemo(() => {
    if (!user) return [];
    if (user.role === 'sub_admin') {
      // Show all pages except "users"
      return allPages.filter((p) => p.title !== 'Users');
    }

    switch (user.role) {
      case 'Report_Manager':
        return allPages.filter((p) => ['dashboard', 'reports', 'settings'].includes(p.title));
      case 'super_admin':
        return allPages.filter((p) =>
          ['dashboard', 'buildings', 'Users', 'settings'].includes(p.title)
        );
      case 'Inspection_manager':
        return allPages.filter((p) => ['dashboard', 'buildings', 'settings'].includes(p.title));
      case 'Subscription_Manager':
        return allPages.filter((p) => ['dashboard', 'subscription', 'settings'].includes(p.title));
      default:
        return [];
    }
  }, [user, url]);

  return (
    <div
      className={`p-4 rounded-t-md h-full relative flex flex-col justify-between transition-all duration-500 bg-white ${
        isNavOpen ? 'w-[200px]' : 'w-[65px]'
      }`}
    >
      {/* Toggle Arrow */}
      <div className="absolute top-[6%] right-[-11px] cursor-pointer z-10" onClick={handleNavOpen}>
        <div
          className={`hidden lg:block transition-all duration-500 ${
            isNavOpen ? 'rotate-0' : 'rotate-180'
          }`}
        >
          <ArrowbackIcon />
        </div>
      </div>

      {/* Logo */}
      <div className="py-4">
        <div className="w-full mb-5 xl:mb-12 flex items-center justify-center gap-1">
          <img src={logo} alt="logo" className="w-[31px] h-[31px] block" />
          <p
            className={`text-primary-lightBlue odor-font font-medium text-base transition-all duration-500 ${
              isNavOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}
          >
            Air Quality
          </p>
        </div>

        {/* ✅ Role-based pages */}
        <div
          className={`flex flex-col justify-center gap-2 ${
            isNavOpen ? 'items-start' : 'items-center'
          }`}
        >
          {filteredPages.map((page, i) => (
            <Link
              key={i}
              to={page.link}
              className={`flex items-center w-full min-w-fit p-2 cursor-pointer transition-all duration-400 ${
                isNavOpen ? 'gap-2' : 'gap-[0]'
              } ${page.isActive ? 'bg-primary-lightBlue rounded-md' : ''}`}
            >
              <div className={`text-[20px] ${page.isActive ? 'text-white' : 'text-[#526581]'}`}>
                {page.icon}
              </div>
              <p
                className={`navbar-title text-sm md:text-base capitalize transition-opacity duration-500 ${
                  page.isActive ? 'text-white' : 'text-[#526581]'
                } ${isNavOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
              >
                {page.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;
