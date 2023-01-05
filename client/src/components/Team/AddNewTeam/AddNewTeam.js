import React from "react";
import BarLoader from "react-spinners/BarLoader";
import useFormTeam from "Hooks/UseFormTeam";
import FormInput from "../Form/FormInput";
import ModelForm from "../Form/FormModel";

import "./AddNewTeam.style.scss";

const option = {
  branche: "-1",
  post: "-1",
  holiday: "-1",
  salaryType: "-1",
  familyStatus: { status: "-1" },
};
const Form = () => {
  const { onSubmit, isSubmitting, error, code, clearCodel, ...other } =
    useFormTeam(option, false);

  return code.length === 0 ? (
    <form onSubmit={onSubmit} className="form">
      <p className="text-error ">{error?.message}</p>
      <FormInput useForm={other} />
      <button type="submit" className="btn-save">
        {!isSubmitting ? "save" : <BarLoader color="#fefbd8" />}
      </button>
    </form>
  ) : (
    <div className="succed">
      <div>
        <div class="cadre" code={code}></div>
        <button onClick={clearCodel}>New</button>
      </div>
    </div>
  );
};

function AddNewTeam() {
  return (
    <ModelForm titel="Add" btnContent="" btnClass="btn-save-team">
      <Form />
    </ModelForm>
  );
}

export default AddNewTeam;
