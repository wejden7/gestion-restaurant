import React, { useState } from "react";

import UpdatePostes from "../updatePostes/updatePostes";
import { useSelector } from "react-redux";
import { getPostes } from "state/SettingSlice";

import useModel from "Hooks/useModel";
import ModalComponent from "components/Modal/Modal";
//* import style scss
import "./ListePostes.style.scss";
function ListePostes() {
  const { openModal, handleOpenModal, handleCloseModal } = useModel();
  const postes = useSelector(getPostes);
  const [id, setId] = useState("");

  const onClick = (id) => {
    setId(id);
    handleOpenModal();
  };

  return (
    <div className="liste-postes-style">
      {postes.map(({ label, _id }, index) => (
        <button
          key={_id}
          onClick={() => onClick(_id)}
          className="item-liste-postes"
        >
          <h1>{label}</h1>
        </button>
      ))}
      <ModalComponent openModal={openModal} handleCloseModal={handleCloseModal}>
        <UpdatePostes id={id} handleCloseModal={handleCloseModal}/>
      </ModalComponent>
    </div>
  );
}

export default ListePostes;
