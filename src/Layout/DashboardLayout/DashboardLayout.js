import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-dvh h-full">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
