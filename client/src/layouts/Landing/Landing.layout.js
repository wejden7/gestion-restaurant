import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "pages/landing/components";
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
