import React from "react";
import { NavLink } from "react-router-dom";
import "./BtnLink.style.scss";
function BtnLink({ name, icon ,to}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "btn-nav-link active" : "btn-nav-link")}
   end >
     <span>{icon}</span>
      <h1 className="label-link">{name}</h1>
    </NavLink>
  );
}

export default BtnLink;
