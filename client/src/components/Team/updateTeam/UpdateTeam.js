import React, { useState, memo } from "react";

// * import Component

// * import Hooks
import useFormTeam from "Hooks/UseFormTeam";

// * import from api
import { UseRefrecherCodeApi } from "utils/apis/team.api";

// * import slice and react-redux
import { useDispatch } from "react-redux";
import { deleteEmployer } from "state/TeamSlice";

// * import react-spinners
import BarLoader from "react-spinners/BarLoader";
import FormInput from "../Form/FormInput";
import ModelForm from "../Form/FormModel";

import "./UpdateTeam.style.scss";

const RefetcheCodeLogin = ({ id }) => {
  const { isFetching, refetch, data } = UseRefrecherCodeApi(id);
  return (
    <button
      onClick={refetch}
      type="button"
      className={`code-login `}
      htmlFor="file-team"
    >
      <BarLoader className="grid" color="#8288c3" loading={isFetching} />
      {!isFetching && (
        <>
          <span className="span-text">Refreche code login click hir :</span>
          <span className="span-text-code">{data}</span>
        </>
      )}
    </button>
  );
};

const DeleteTeam = ({ id }) => {
  const dispatch = useDispatch();
  const [isdelete, setIsDelete] = useState(false);
  const onDelete = async () => {
    setIsDelete(true);
    await dispatch(deleteEmployer(id))
      .unwrap()
      .then((t) => {
        setIsDelete(false);
      })
      .catch((e) => setIsDelete(false));
  };
  return (
    <button onClick={onDelete} type="button" className="btn-delete">
      {!isdelete ? "Delete" : <BarLoader color="#fefbd8" />}
    </button>
  );
};

const Form = ({ dataTeam }) => {
  const { onSubmit, isSubmitting, error, ...other } = useFormTeam(
    dataTeam,
    true
  );
  return (
    <form onSubmit={onSubmit} className="form">
      <p className="text-error ">{error?.message}</p>
      <FormInput useForm={other} />
      <div className="section-btn">
        <RefetcheCodeLogin id={dataTeam._id} />
        <button type="submit" className="btn-save">
          {!isSubmitting ? "Update" : <BarLoader color="#fefbd8" />}
        </button>
        <DeleteTeam id={dataTeam._id} />
      </div>
    </form>
  );
};

function UpdateTeam({ dataTeam }) {
  return (
    <ModelForm titel="Update" btnContent="update" btnClass="btn-update-team">
      <Form dataTeam={dataTeam} />
    </ModelForm>
  );
}

export default UpdateTeam;
