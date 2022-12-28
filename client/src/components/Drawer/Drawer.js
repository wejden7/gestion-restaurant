import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { UseStateDashboardContext } from "context/contextDaschboard";
//"left", "right", "top", "bottom"
import "./Drawer.style.scss";
export default function TemporaryDrawer({ open, onClose, children }) {
  const { mode } = UseStateDashboardContext();

  return (
    <div>
      <Drawer
        className={`drawer ${mode}`}
        anchor={"right"}
        open={open}
        onClose={onClose}
      >
        <div className="drawer-content">{children}</div>
      </Drawer>
    </div>
  );
}
