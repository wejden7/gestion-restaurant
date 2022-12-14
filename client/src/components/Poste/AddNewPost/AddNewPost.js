import useFormPoste from "Hooks/useFormPoste";
import React from "react";
import BarLoader from "react-spinners/BarLoader";
import "./AddNewPost.style.scss";
function AddNewPost() {
  const { register, onSubmit, errors, isSubmitting } =
    useFormPoste({ label: "" }, false);
  return (
    <div className="add-poste">
      <h1 className="title-groupe">Poste</h1>
      <form onSubmit={onSubmit} className="form-group-add-post">
        <label className="input-group" htmlFor="name-group">
          <input
            {...register("label")}
            type="text"
            id="name-group"
            placeholder="Name de Poste"
          />
          <p className="error_input">{errors.label?.message}</p>
        </label>
        <button type="submit" className="btn-poste">
          {!isSubmitting ? "save" : <BarLoader color="#fefbd8" width={30} />}
        </button>
      </form>
    </div>
  );
}

export default AddNewPost;
