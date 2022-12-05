import React, { useState } from "react";
import { NavBar, SideBar } from "pages/dashboard/components";
import { Outlet } from "react-router-dom";
import "./Dashboard.style.scss";
import { UseStateDashboardContext } from "context/contextDaschboard";
import withAuthentification from "components/Protected/withAuthentification";
function Dashboard(props) {
  const { open, mode } = UseStateDashboardContext();
  return (
    <div className={`dashboard ${mode} ${open && "side-bar-open"} `}>
      <NavBar />
      <Outlet />
      <SideBar  />
    </div>
  );
}

export default withAuthentification(Dashboard);
