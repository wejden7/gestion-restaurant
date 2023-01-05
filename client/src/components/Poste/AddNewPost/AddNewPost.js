import useFormPoste from "Hooks/useFormPoste";
import React from "react";
import BarLoader from "react-spinners/BarLoader";
import { InputText } from "components/Input/Input";
import "./AddNewPost.style.scss";
function AddNewPost() {
  const { register, onSubmit, errors, isSubmitting } = useFormPoste(
    { label: "" },
    false
  );
  return (
    <div className="add-poste">
      <h1 className="title-groupe">Poste</h1>
      <form onSubmit={onSubmit} className="form-group">
        <InputText
          register={register}
          name="label"
          placeholder="Name de Poste"
          icon="&#xf82f;"
          errors={errors.label?.message}
        />
        <button type="submit" className="btn-save">
          {!isSubmitting ? "save" : <BarLoader color="#fefbd8" width={30} />}
        </button>
      </form>
    </div>
  );
}

export default AddNewPost;
