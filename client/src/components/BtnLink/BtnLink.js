import React from "react";
import { NavLink } from "react-router-dom";
import "./BtnLink.style.scss";
function BtnLink({name,icon}) {
  return (
    <NavLink  className="btn-nav-link" >
      {icon}<h1>{name}</h1>
    </NavLink>
  );
}

export default BtnLink;
