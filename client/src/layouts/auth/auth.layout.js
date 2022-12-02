import React from "react";
import { Outlet } from "react-router-dom";

import "./auth.style.scss";

function auth() {
  return (
    <div className="body">
   
        <Outlet />
    
    </div>
  );
}

export default auth;
