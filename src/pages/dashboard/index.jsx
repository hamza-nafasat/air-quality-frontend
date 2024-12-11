import { useState } from "react";
import Header from "../../components/layout/header/Header";
import Aside from "../../components/layout/aside/Aside";
import Main from "../../components/layout/main/Main";

const Dashboard = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const mobileNavHandler = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };
  return (
    <section className="w-full user-dashboard relative overflow-x-hidden overflow-y-scroll bg-[#f5f7fb] z-0 scrollbar-0 h-screen">
      <div className="flex flex-col-2 h-full">
        <div className="hidden lg:block">
          <Aside />
        </div>
        <div className="w-[100%] relative bg-[rgba(239,250,253,1)] overflow-x-hidden overflow-y-scroll second-column custom-scrollbar">
          <Header />
          <Main />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
