import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import withAutorization from "components/Protected/withAutorization";
import "./Setting.style.scss";
function Setting() {
  let activeClassName = "underline";
  return (
    <div className="content-dashboard content-dashboard-setting">
      <div className="content-dashboard-setting-link">
        <NavLink
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
          to=""
          end
        >
          Préférénces du compte
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
          to="code"
          end
        >
          Identificationet et sécurité
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
          to="f"
          end
        >
          Historique d'activité
        </NavLink>
      </div>
      <div className="content-dashboard-setting-content">
        <Outlet />
      </div>
    </div>
  );
}

export default withAutorization(Setting,"setting",true) ;
