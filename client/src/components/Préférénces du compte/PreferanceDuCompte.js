import React, { useState, useEffect } from "react";
import "./PreferanceDuCompte.style.scss";
import BarLoader from "react-spinners/BarLoader";
import { Branche, Poste } from "components";
import { useSelector, useDispatch } from "react-redux";
import { getEtablissement, updateEtablissement } from "state/SettingSlice";
const EtablissementEdite = () => {
  const etablissement = useSelector(getEtablissement);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(etablissement?.label || "");
  }, [etablissement]);
  const onChange = (e) => {
    setName(e.target.value);
  };
  const onClikBtn = async () => {
    setSubmit(true);
    if (name.length !== 0) {
      setIsSubmitting(true);
      await dispatch(updateEtablissement({ label: name })).then((e) =>
        setIsSubmitting(false)
      );
    }
  };
  return (
    <div className="etablissement">
      <h1 className="title-groupe">Etablissement</h1>
      <div className="form-group" htmlFor="name-group">
        <label className="input-group">
          <input
            value={name}
            onChange={onChange}
            type="text"
            id="name-group"
            placeholder="Nom de l'établissement"
          />
          {submit && name.length === 0 && <p className="error_input">kkkk</p>}
        </label>

        <button onClick={onClikBtn} type="button" className="btn-etablissement">
          {!isSubmitting ? "save" : <BarLoader color="#fefbd8" width={30} />}
        </button>
      </div>
    </div>
  );
};

function PreferanceDuCompte() {
  return (
    <div className="setting-preferance">
      <EtablissementEdite />
      <Branche.AddNewBranche />
      <Branche.ListeBranche />
      <Poste.AddNewPost />
      <Poste.ListePostes />
    </div>
  );
}

export default PreferanceDuCompte;
