import React from "react";
import useBranche from "Hooks/UseBranche";
import BarLoader from "react-spinners/BarLoader";
import "./AddNewBranche.style.scss";
const AddNewBranche = () => {
  const {
    register,
    onSubmit,
    errors,
    isSubmitting,
    error,
    success,
    fields,
    remove,
    ajouterZone,
  } = useBranche({ label: "", zones: [{ label: "" }] }, false);

  return (
    <div className="add-branche">
      <h1 className="title-groupe">Branche</h1>
      <form onSubmit={onSubmit} className="form-group">
        <label className="input-group" htmlFor="name-group">
          <input
            {...register("label")}
            type="text"
            id="name-group"
            placeholder="Name Branche"
          />
          <p className="error">{errors.label?.message}</p>
        </label>

        <div className="zone ">
          {fields.map((item, index) => (
            <label
              key={item.id}
              className="input-group input-group-zone"
              htmlFor="name-group"
            >
              <input
                {...register(`zones.${index}.label`)}
                type="text"
                id="name-group"
                placeholder="Name Zone"
              />
              {errors?.zones && (
                <p className="error">{errors?.zones[index]?.label.message}</p>
              )}
              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)}></button>
              )}
            </label>
          ))}
        </div>
        <button
          type="button"
          className="btn-branche btn-append-branche"
          onClick={ajouterZone}
        ></button>
        <button type="submit" className="btn-branche btn-save-branche">
          {" "}
          {!isSubmitting ? "save" : <BarLoader color="#fefbd8" width={30} />}
        </button>
      </form>
    </div>
  );
};

export default AddNewBranche;
