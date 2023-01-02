import React, { useState } from "react";
import {
  AiOutlineSetting,
  AiOutlineMessage,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "state/AuthSlice";
import { DashboardPAth } from "utils/router/path.utils";
import "./AvatarUser.style.scss";

const profileUrl =
  "https://img.freepik.com/photos-gratuite/gros-plan-jeune-homme-reussi-souriant-camera-debout-tenue-decontractee-fond-bleu_1258-66609.jpg?w=740&t=st=1669907779~exp=1669908379~hmac=71618393f862154bc196c47013b61589bfb20722c9e285a1954f5cc4f9454f0a";

function AvatarUser({ user }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onClickDrop = () => {
    setOpen((l) => !l);
  };

  const signOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="Avatar-user">
      <img onClick={onClickDrop} src={profileUrl} alt="Profil url" />
      {open && (
        <div className="Avatar-user-dropdown">
          <h1>{user.name}</h1>
          <h3>{user.TextLogin}</h3>
          <h2>{user.role}</h2>
          <div className="divider" />
          <Link className="link">
            <HiAdjustmentsHorizontal />
            Parametre
          </Link>
          <Link className="link">
            <AiOutlineMessage />
            Messagerie
          </Link>
          <Link className="link">
            <AiOutlineSetting /> Setting
          </Link>
          <button onClick={signOut} className="link">
            <AiOutlinePoweroff /> Sign Out
          </button>
          <div className="divider" />
          <Link to={DashboardPAth} className="btn-dashboard">
            Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}

export default AvatarUser;
