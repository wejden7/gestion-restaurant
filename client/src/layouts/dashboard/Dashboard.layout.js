import React from "react";
import { NavBar, SideBar } from "components";
import { Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.style.scss";
import { UseStateDashboardContext } from "context/contextDaschboard";
import withAuthentification from "components/Protected/withAuthentification";
import { DashboardSettingPath } from "utils/router/pathRouter.util";
function Dashboard(props) {
  const { open, mode } = UseStateDashboardContext();
  const navigate = useNavigate();
  const onClick = () => {
    navigate(DashboardSettingPath);
  };
  return (
    <div className={`dashboard ${mode} ${open && "side-bar-open"} `}>
      <NavBar />
      <Outlet />
      <button onClick={onClick} className="btn-setting"></button>
      <SideBar />
    </div>
  );
}

export default withAuthentification(Dashboard);
