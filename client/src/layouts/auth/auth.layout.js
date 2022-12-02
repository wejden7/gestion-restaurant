import React from "react";
import { Outlet } from "react-router-dom";

import "./auth.style.scss";

function auth() {
  return (
    <div className="body">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default auth;
