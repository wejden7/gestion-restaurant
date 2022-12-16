import React from "react";
import { TeamComponent } from "components";
import "./Team.style.scss";

function Team() {
  return (
    <div className="content-dashboard content-dashboard-Team">
      <TeamComponent.TeamList/>
    </div>
  );
}

export default Team;
