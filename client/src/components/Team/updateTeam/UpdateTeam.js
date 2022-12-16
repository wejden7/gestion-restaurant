import React, { useState } from "react";

// * import Component
import { ModalComponent } from "components";
import { Input } from "../";

// * import Hooks
import useFormTeam from "Hooks/UseFormTeam";
import useModel from "Hooks/useModel";

// * import from api
import { UseRefrecherCodeApi } from "utils/apis/team.api";

// * import slice and react-redux
import { useSelector, useDispatch } from "react-redux";
import { getPostes, getBranches } from "state/SettingSlice";
import { deleteEmployer } from "state/TeamSlice";

// * import react-spinners
import BarLoader from "react-spinners/BarLoader";
import GridLoader from "react-spinners/GridLoader";

function UpdateTeam({ dataTeam }) {
  const dispatch = useDispatch();
  const postes = useSelector(getPostes);
  const Branches = useSelector(getBranches);
  const [isdelete, setIsDelete] = useState(false);
  const { isFetching, refetch, data } = UseRefrecherCodeApi(dataTeam._id);
  const { openModal, handleOpenModal, handleCloseModal } = useModel();
  const { InputSelect, InputText } = Input;
  const { register, onSubmit, errors, isSubmitting, error, control } =
    useFormTeam(dataTeam, true);

  const onDelete = async () => {
    setIsDelete(true);
    await dispatch(deleteEmployer(dataTeam._id))
      .unwrap()
      .then((t) => {
        handleCloseModal();
        setIsDelete(false);
      })
      .catch((e) => setIsDelete(false));
  };

  return (
    <>
      <button onClick={handleOpenModal} className="btn-update-team">
        update
      </button>
      <ModalComponent openModal={openModal} handleCloseModal={handleCloseModal}>
        <div className="model-team">
          <div className="model-team-header">
            <h1 className="model-team-header-title">Update</h1>

            <button onClick={handleCloseModal}></button>
          </div>

          <form onSubmit={onSubmit} className="form">
            <p className="text-error ">{error?.message}</p>
            <InputText
              register={register}
              name="name"
              errors={errors.name?.message}
              icon="&#xf007;"
            />
            <InputSelect
              control={control}
              data={postes}
              name="post"
              errors={errors.post?.message}
            />
            <InputSelect
              control={control}
              data={Branches}
              name="branche"
              errors={errors.branche?.message}
            />

            <InputText
              register={register}
              name="userName"
              errors={errors.userName?.message}
              icon="&#xf007;"
            />

            <label className="label-group-time-work" htmlFor="">
              Time Work :
            </label>
            <div className="input-group-time-work">
              <InputText
                register={register}
                name="timeWork.start"
                errors={errors.timeWork?.start?.message}
                icon="&#xf251;"
              />
              <InputText
                register={register}
                name="timeWork.end"
                errors={errors.timeWork?.end?.message}
                icon="&#xf253;"
              />
            </div>

            <button
              onClick={refetch}
              type="button"
              className={`code-login }`}
              htmlFor="file-team"
            >
              <span className="span-text">{data}</span>
              <span className={`icon ${isFetching && "loading"}`}></span>
              <GridLoader
                className="grid"
                color="#8288c3"
                loading={isFetching}
              />
              <span className="span-text">Refreche code login click hir</span>
            </button>
            <button type="submit" className="btn-save">
              {!isSubmitting ? "Update" : <BarLoader color="#fefbd8" />}
            </button>
            <button onClick={onDelete} type="button" className="btn-delete">
              {!isdelete ? "Delete" : <BarLoader color="#fefbd8" />}
            </button>
          </form>
        </div>
      </ModalComponent>
    </>
  );
}

export default UpdateTeam;
