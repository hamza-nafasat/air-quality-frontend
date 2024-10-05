import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import Button from "../../shared/small/Button";
import { IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import HomeIcon from "../../../assets/svgs/pages/HomeIcon";
import BuildingIcon from "../../../assets/svgs/pages/BuildingIcon";
import DevicesIcon from "../../../assets/svgs/pages/DevicesIcon";
import ReportsIcon from "../../../assets/svgs/pages/ReportsIcon";
import SensorsIcon from "../../../assets/svgs/pages/SensorsIcon";
import SettingsIcon from "../../../assets/svgs/pages/SettingsIcon";
import ArrowbackIcon from "../../../assets/svgs/pages/ArrowbackIcon";
import SubscriptionIcon from "../../../assets/svgs/pages/SubscriptionIcon";

const Aside = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const location = useLocation();
  const locationSplit = location.pathname.split("/");
  const url = locationSplit[locationSplit.length - 1];
  // console.log(url);

  const handleNavOpen = () => setIsNavOpen(!isNavOpen);

  let pages = [
    {
      title: "dashboard",
      link: "/dashboard",
      icon: <HomeIcon activeLink={url === "dashboard"} />,
    },
    {
      title: url.includes("add-building") ? "add-building" : "buildings",
      link: "/dashboard/buildings",
      icon: <BuildingIcon activeLink={url.includes("buildings") || url.includes("add-building")} />,
    },
    {
      title: "devices",
      link: "/dashboard/devices",
      icon: <DevicesIcon activeLink={url === "devices"} />,
    },
    {
      title: "sensors",
      link: "/dashboard/sensors",
      icon: <SensorsIcon activeLink={url === "sensors"} />,
    },
    {
      title: "reports",
      link: "/dashboard/reports",
      icon: <ReportsIcon activeLink={url === "reports"} />,
    },
    {
      title: "subscription",
      link: "/dashboard/subscription",
      icon: <SubscriptionIcon activeLink={url === "subscription"} />,
    },
    {
      title: "settings",
      link: "/dashboard/settings",
      icon: <SettingsIcon activeLink={url === "settings"} />,
    },
  ];

  return (
    <div
      className={`p-4 rounded-t-md h-full relative flex flex-col justify-between transition-all duration-500 bg-white ${
        isNavOpen ? "w-[200px]" : "w-[65px]"
      }`}
    >
      <div className="absolute top-[6%] right-[-11px] cursor-pointer z-10" onClick={handleNavOpen}>
        <div
          className={`hidden lg:block transition-all duration-500 ${isNavOpen ? "rotate-0" : "rotate-180"}`}
        >
          <ArrowbackIcon />
        </div>
      </div>
      <div className="py-4">
        <div className="w-full mb-5 xl:mb-12 flex items-center justify-center gap-1">
          <img src={logo} alt="logo" className="w-[31px] h-[31px] block" />
          <p
            className={`text-primary-lightBlue odor-font font-medium text-base text-nowrap md:text-md transition-all duration-500 ${
              isNavOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            Air Quality
          </p>
        </div>
        <div className={`flex flex-col justify-center gap-2 ${isNavOpen ? "items-start" : "items-center"}`}>
          {pages?.map((page, i) => (
            <Link
              key={i}
              to={page.link}
              className={`flex items-center w-full min-w-fit p-2 cursor-pointer transition-all duration-400 ${
                isNavOpen ? "gap-2" : "gap-[0]"
              } ${page.title === url ? "bg-primary-lightBlue rounded-md" : ""}`}
            >
              <div
                className={`text-[20px] ${page.title === url ? "text-primary-lightBlue" : "text-white"}`}
              >
                {page.icon}
              </div>
              <p
                className={`navbar-title text-sm md:text-base capitalize transition-opacity duration-500 ${
                  page.title === url ? "text-white" : "text-[#526581]"
                } ${isNavOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
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