import React from "react";
import { AddNewTeam } from "components";
import "./TeamList.style.scss";

const TeamListItem = () => {
  return (
    <div className="team-list-item">
      <div className="avatar">W</div>
      <div className="username">Wejden chneti</div>
      <div className="work-post">Derecteur generale</div>
      <div className="time-work">8h a 16h</div>
      <div className="status active" />
    </div>
  );
};
function TeamList() {
  return (
    <div className="team-list">
      <div className="titel">
        Team List
        <AddNewTeam />
      </div>

      <div className="team-list-items">
        {[1, 2, 3, 4, 5, 6, 7, 5, 9, 8, 6, 8].map((item, index) => (
          <TeamListItem />
        ))}
      </div>
    </div>
  );
}

export default TeamList;
