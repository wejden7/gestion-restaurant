import ModalComponent from "components/Modal/Modal";
import useModel from "Hooks/useModel";
import React from "react";
const ModelForm = ({ children, titel, btnContent, btnClass }) => {
  const { openModal, handleOpenModal, handleCloseModal } = useModel();
  return (
    <>
      <button onClick={handleOpenModal} className={btnClass}>
        {btnContent}
      </button>
      <ModalComponent openModal={openModal} handleCloseModal={handleCloseModal}>
        <div className="model-team">
          <div className="model-team-header">
            <h1 className="model-team-header-title">{titel}</h1>
            <button onClick={handleCloseModal}></button>
          </div>
          {children}
        </div>
      </ModalComponent>
    </>
  );
};
export default ModelForm;
