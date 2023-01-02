import React from "react";
import { UseStateDashboardContext } from "context/contextDaschboard";
import { BtnMenu, Notification } from "components";
import { logOut } from "state/AuthSlice";
import { useDispatch } from "react-redux";
import "./NavBar.style.scss";
function NavBar() {
  const { cliskSideBar } = UseStateDashboardContext();
  const dispatch = useDispatch();

  const onClick_logout = () => {
    dispatch(logOut());
  };
  return (
    <div className="nav-bar-dashboard">
      <BtnMenu onClick={cliskSideBar} />
      <div className="nav-bar-dashboard-right">
        <Notification />
        <button
          onClick={onClick_logout}
          className="nav-bar-dashboard-btn-logout"
        ></button>
      </div>
    </div>
  );
}

export default NavBar;
