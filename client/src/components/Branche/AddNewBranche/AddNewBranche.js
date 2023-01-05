import React from "react";
import useBranche from "Hooks/UseBranche";
import BarLoader from "react-spinners/BarLoader";
import "./AddNewBranche.style.scss";
import FormInput from "../Components/FomrInput/FormInput";
const AddNewBranche = () => {
  const { onSubmit, isSubmitting, ajouterZone, ...other } = useBranche(
    { label: "", zones: [{ label: "" }] },
    false
  );

  return (
    <div className="section">
      <h1 className="title-groupe">Branche</h1>
      <form onSubmit={onSubmit} className="form-group">
        <FormInput useForm={other} />
        <button type="button" className="btn-icon" onClick={ajouterZone} />
        <button type="submit" className="btn-save">
          {" "}
          {!isSubmitting ? "save" : <BarLoader color="#fefbd8" width={30} />}
        </button>
      </form>
    </div>
  );
};

export default AddNewBranche;
