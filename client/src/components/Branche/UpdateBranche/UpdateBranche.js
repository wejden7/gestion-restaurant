import React, { useEffect } from "react";
import useBranche from "Hooks/UseBranche";
import { useSelector } from "react-redux";
import { getBrancheById } from "state/SettingSlice";
import BarLoader from "react-spinners/BarLoader";
import "./UpdateBranche.style.scss";
function UpdateBranche({ id, annuler }) {
  const branche = useSelector((state) => getBrancheById(state, id));
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
  } = useBranche(branche, true);
  useEffect(() => {
    if (success) annuler();
  }, [success]);

  return (
    <div className="update-branche">
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
        <button
          type="button"
          onClick={annuler}
          className="btn-branche btn-save-branche"
        >
          annuler
        </button>
      </form>
    </div>
  );
}

export default UpdateBranche;
