import React, { useEffect } from "react";
import { ModalComponent } from "components";
import useModel from "Hooks/useModel";
import BarLoader from "react-spinners/BarLoader";
import { Input } from "../";
import { useSelector } from "react-redux";
import { getPostes, getBranches } from "state/SettingSlice";
import useFormTeam from "Hooks/UseFormTeam";

function AddNewTeam() {
  const { register, onSubmit, errors, isSubmitting, error, code, control } =
    useFormTeam({ branche: "-1", post: "-1" }, false);
  const postes = useSelector(getPostes);
  const Branches = useSelector(getBranches);
  const { openModal, handleOpenModal, handleCloseModal } = useModel();

  return (
    <>
      <button onClick={handleOpenModal} className="btn-save-team"></button>
      <ModalComponent openModal={openModal} handleCloseModal={handleCloseModal}>
        <div className="model-team">
          <div className="model-team-header">
            <h1 className="model-team-header-title">Add One In Your Team</h1>
            <button onClick={handleCloseModal}></button>
          </div>
          <form onSubmit={onSubmit} className="form">
            <p className="text-error ">{error?.message}</p>
            <Input.InputText
              register={register}
              name="name"
              errors={errors.name?.message}
              icon="&#xf007;"
              placeholder="Name"
            />
            <Input.InputSelect
              control={control}
              data={postes}
              name="post"
              errors={errors.post?.message}
            />
            <Input.InputSelect
              control={control}
              data={Branches}
              name="branche"
              errors={errors.branche?.message}
            />

            <Input.InputText
              register={register}
              name="userName"
              errors={errors.userName?.message}
              icon="&#xf007;"
              placeholder="User Name "
            />
            <Input.InputDate
              register={register}
              name="dateStart"
              errors={errors.dateStart?.message}
              icon="&#xf007;"
              placeholder="Date to Starte"
            />

            <label className="label-group-time-work" htmlFor="">
              Time Work :
            </label>
            <div className="input-group-time-work">
              <Input.InputText
                register={register}
                name="timeWork.start"
                errors={errors.timeWork?.start?.message}
                icon="&#xf251;"
              />
              <Input.InputText
                register={register}
                name="timeWork.end"
                errors={errors.timeWork?.end?.message}
                icon="&#xf253;"
              />
            </div>
            <div className="code-login" htmlFor="file-team">
              <span className={`icon `}></span>
              <span className="span-text">code de login : {code}</span>
            </div>
            <button type="submit" className="btn-save">
              {!isSubmitting ? "save" : <BarLoader color="#fefbd8" />}
            </button>
          </form>
        </div>
      </ModalComponent>
    </>
  );
}

export default AddNewTeam;
