import React from "react";
import BarLoader from "react-spinners/BarLoader";
import useFormPoste from "Hooks/useFormPoste";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { getPostesById, deletePoste } from "state/SettingSlice";
import { findPermissionTagsApi } from "utils/apis/poste.api";
import "./updatePostes.style.scss";
import { InputText } from "components/Input/Input";
const PermissionListe = ({ register }) => {
  const { isSuccess, isFetching, isError, data } = useQuery(
    ["pemission"],
    findPermissionTagsApi,
    { manual: true }
  );
  return (
    <div className="liste-permission">
      {isSuccess &&
        data.map((item, index) => (
          <div className="checkbox-liste-permission" key={index}>
            <label htmlFor={item._id}>{item.name}</label>
            <input
              {...register("permission")}
              value={item._id}
              id={item._id}
              type="checkbox"
            />
          </div>
        ))}
    </div>
  );
};

const UpdatePostes = ({ id ,handleCloseModal}) => {
  const dispatch = useDispatch();

  const poste = useSelector((state) => getPostesById(state, id));
  const { register, onSubmit, errors, isSubmitting } = useFormPoste(
    poste,
    true
  );
  const onDelete = async () => {
    await dispatch(deletePoste(id))
      .unwrap()
      .then(() => {
        handleCloseModal();
      })
      .catch(() => {});
  };

  return (
      <div className="update-postes">
        <form onSubmit={onSubmit} className="form-group-update-post">
         
          <InputText
          register={register}
          name="label"
          placeholder="Name de Poste"
          icon="&#xf82f;"
          errors={errors.label?.message}
        />
          <PermissionListe register={register} />
          <div className="btn-group-update-postes">
            <button type="submit" className="btn btn-save-update-postes">
              {" "}
              {!isSubmitting ? (
                "save"
              ) : (
                <BarLoader color="#fefbd8" width={30} />
              )}
            </button>
            <button
              onClick={handleCloseModal}
              type="button"
              className="btn btn-close-update-postes"
            >
              Annuler
            </button>
            <button
              onClick={onDelete}
              type="button"
              className="btn btn-delete-update-postes"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
  );
};

export default UpdatePostes;
