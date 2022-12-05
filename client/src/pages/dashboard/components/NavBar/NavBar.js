import React from "react";
import { UseStateDashboardContext } from "context/contextDaschboard";
import {BtnMenu} from 'components'
import "./NavBar.style.scss";
function NavBar() {
  const { open, cliskSideBar } = UseStateDashboardContext();
  return (
    <div className="nav-bar-dashboard">
    <BtnMenu  onClick={cliskSideBar}/>
    </div>
  );
}

export default NavBar;
