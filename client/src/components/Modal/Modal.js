import Modal from "@mui/material/Modal";
import React from "react";
import { UseStateDashboardContext } from "context/contextDaschboard";
import "./Modal.style.scss";
function ModalComponent({ children ,openModal,handleCloseModal}) {
  const {   mode} = UseStateDashboardContext();
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div  className={`modal ${mode}`}>{children}</div>
    </Modal>
  );
}

export default ModalComponent;
