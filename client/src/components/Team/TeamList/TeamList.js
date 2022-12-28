import React from "react";
import withAutorization from "components/Protected/withAutorization";
// * import components
import { AddNewTeam, UpdateTeam } from "../";

// * import react-redux
import { useSelector } from "react-redux";

// * import slice
import { selectAllTeam, getTeamStatus } from "state/TeamSlice";
import { getPostesById, getBrancheById } from "state/SettingSlice";

import PuffLoader from "react-spinners/PuffLoader";

// * import style
import "./TeamList.style.scss";

const TeamListItem = ({ team }) => {
  const post = useSelector((state) => getPostesById(state, team.post));
  const branche = useSelector((state) => getBrancheById(state, team.branche));
  return (
    <div className="team-list-item">
      <div className="avatar">
        {team.name[0]}
        <span className="status active" />
      </div>
      <div className="username">{team.name}</div>
      <div className="branche">{branche?.label}</div>
      <div className="work-post">{post?.label}</div>
      <div className="time-work">
        {team.timeWork.start}h a {team.timeWork.end}h
      </div>

      <UpdateTeam dataTeam={team} />
    </div>
  );
};
const TeamList = () => {
  const teams = useSelector(selectAllTeam);
  const status = useSelector(getTeamStatus);
  var content = (
    <div className="loading">
      <PuffLoader color="#618685" size={100} />
    </div>
  );
  if (status === "succeeded")
    content = teams.map((item, index) => (
      <TeamListItem key={index} team={item} />
    ));
  if (status === "failed") content = "Error";
  return (
    <div className="team-list">
      <div className="titel">
        Team List
        <AddNewTeam />
      </div>
      <div className="team-list-items">{content}</div>
    </div>
  );
};

export default withAutorization(TeamList, "get employer"
);
