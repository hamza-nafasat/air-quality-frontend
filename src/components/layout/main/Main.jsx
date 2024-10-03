import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BuildingsData from '../../../pages/dashboard/buildingsData/BuildingsData'

const Main = () => {
  const location = useLocation();
  return (
    <div className="p-4">
      {(location.pathname === "/dashboard" && <BuildingsData />) ||
        (location.pathname === "/dashboard/" && <BuildingsData />)}
      <Outlet />
    </div>
  );
};

export default Main;
