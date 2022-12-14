import React, { useState } from "react";

import ModalComponent from "components/Modal/Modal";
import UpdatePostes from "../updatePostes/updatePostes";
import { useSelector } from "react-redux";
import { getPostes } from "state/SettingSlice";
import { UseStateDashboardContext } from "context/contextDaschboard";
//* import style scss
import "./ListePostes.style.scss";
function ListePostes() {
  const { handleOpenModal } = UseStateDashboardContext();
  const postes = useSelector(getPostes);
  const [id, setId] = useState("");

  const onClick = (id) => {
    setId(id);
    handleOpenModal();
  };

  return (
    <div className="liste-postes-style">
      {postes.map(({ label, _id }, index) => (
        <button key={_id} onClick={() => onClick(_id)} className="item-liste-postes">
          <h1>{label}</h1>
        </button>
      ))}
      <ModalComponent>
        <UpdatePostes id={id} />
      </ModalComponent>
    </div>
  );
}

export default ListePostes;
