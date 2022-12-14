import React from "react";
import { ModalComponent } from "components";
import { UseStateDashboardContext } from "context/contextDaschboard";
import "./AddNewTeam.style.scss";
function AddNewTeam() {
  const { handleCloseModal, handleOpenModal } = UseStateDashboardContext();
  return (
    <>
      <button onClick={handleOpenModal} className="btn-add-new-team"></button>
      <ModalComponent>
        <div className="add-new-team">
          <div className="title">
            <h1>Add One In Your Team</h1>
            <button onClick={handleCloseModal}></button>
          </div>
          <form className="form">
            <label className="input-label" icon="&#xf007;" htmlFor="">
              <input className="input-text" type="text" placeholder="Name" />
            </label>

            <label className="input-label" icon="&#xf007;" htmlFor="">
              <input
                className="input-text"
                type="text"
                placeholder="User name"
              />
            </label>

            <label className="input-label" icon="&#xf023;" htmlFor="">
              <input
                className="input-text"
                type="text"
                placeholder="Password"
              />
            </label>

            <label className="label-group-time-work" htmlFor="">
              Time Work :
            </label>
            <div className="input-group-time-work">
              <label icon="&#xf251;" className="input-label" htmlFor="">
                {" "}
                <input className="input-text" type="text" placeholder="Start" />
              </label>

              <label icon="&#xf253;" className="input-label" htmlFor="">
                {" "}
                <input className="input-text" type="text" placeholder="End" />
              </label>
            </div>
            <label className="input-file" htmlFor="file-team">
              <input id="file-team" type="file" />
              <span>Select Image de type</span>
            </label>
          </form>
        </div>
      </ModalComponent>
    </>
  );
}

export default AddNewTeam;
