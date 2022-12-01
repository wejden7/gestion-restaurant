import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "../components";
function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
