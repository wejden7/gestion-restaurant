import React from "react";
import "./PreferanceDuCompte.style.scss";
import { Branche, Poste, Etablissement } from "components";

function PreferanceDuCompte() {
  return (
    <div className="setting-preferance">
      <Etablissement.EtablissementEdite />
      <Branche.AddNewBranche />
      <Branche.ListeBranche />
      <Poste.AddNewPost />
      <Poste.ListePostes />
    </div>
  );
}

export default PreferanceDuCompte;
