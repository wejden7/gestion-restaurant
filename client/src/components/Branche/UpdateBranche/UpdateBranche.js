import React, { useEffect } from "react";
import useBranche from "Hooks/UseBranche";
import { useSelector } from "react-redux";
import { getBrancheById } from "state/SettingSlice";
import BarLoader from "react-spinners/BarLoader";
import FormInput from "../Components/FomrInput/FormInput";
import "./UpdateBranche.style.scss";
function UpdateBranche({ id, annuler }) {
  const branche = useSelector((state) => getBrancheById(state, id));
  const { onSubmit, isSubmitting, success, ajouterZone, ...other } = useBranche(
    branche,
    true
  );
  useEffect(() => {
    if (success) annuler();
  }, [success]);

  return (
    <div className="update-branche">
      <form onSubmit={onSubmit} className="form-group">
        <FormInput useForm={other} />
        <button type="button" className="btn-icon" onClick={ajouterZone} />
        <div className="btn">
          <button type="submit" className="btn-save">
            {!isSubmitting ? "save" : <BarLoader color="#fefbd8" width={30} />}
          </button>
          <button type="button" onClick={annuler} className="btn-save">
            annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBranche;
