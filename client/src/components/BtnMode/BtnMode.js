import React from "react";
import { UseStateDashboardContext } from "context/contextDaschboard";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "./BtnMode.style.scss";
function BtnMode() {
  const { onClickDark, onClickLight } = UseStateDashboardContext();
  return (
    <div className="btn-mode-theme">
      <button
        onClick={onClickDark}
        className="btn-mode-theme-btn btn-mode-dark-btn"
      >
        <MdDarkMode />
        <h1>Dark</h1>
      </button>
      <button
        onClick={onClickLight}
        className="btn-mode-theme-btn btn-mode-light-btn"
      >
        <MdLightMode /> <h1>Light</h1>
      </button>
    </div>
  );
}

export default BtnMode;
