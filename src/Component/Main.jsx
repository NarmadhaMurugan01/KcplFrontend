import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";

const Main = () => {
  return (
    <div className="main">
      <Sidebar />
      <div className="container py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
