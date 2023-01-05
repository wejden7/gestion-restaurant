import React, { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import { Input } from "components";
import useFormEtablissement from "Hooks/UseFormEtablissement";
import './EtablissementEdite.style.scss'
const EtablissementEdite = () => {
  const { register, onSubmit, errors, isSubmitting, error, success } =
    useFormEtablissement();
  return (
    <div className="section">
      <h1 className="title-groupe">Etablissement</h1>
      <form onSubmit={onSubmit} className="form-group" htmlFor="name-group">
        <Input.InputText
          register={register}
          name="label"
          errors={errors?.label?.message}
          placeholder="Label"
          icon="&#xf594;"
        />
        <Input.InputText
          register={register}
          name="pays"
          errors={errors?.pays?.message}
          placeholder="Pays"
          icon="&#xf0ac;"
        />
        <Input.InputText
          register={register}
          name="ncnss"
          errors={errors?.ncnss?.message}
          placeholder="Numero Cnss"
          icon="&#xf02a;"
        />
        <Input.InputText
          register={register}
          name="matriculeFiscale"
          errors={errors?.matriculeFiscale?.message}
          placeholder="Matricule Fiscale"
          icon="&#xf02a;"
        />
        <Input.InputText
          register={register}
          name="registreCommerce"
          errors={errors?.registreCommerce?.message}
          placeholder="Registre Commerce"
          icon="&#xf02a;"
        />
        <Input.InputText
          register={register}
          name="rib"
          errors={errors?.rib?.message}
          placeholder="Rib"
          icon="&#xf02a;"
        />
        <button className="btn-save">
          {!isSubmitting ? "save" : <BarLoader color="#fefbd8" width={30} />}
        </button>
      </form>
    </div>
  );
};

export default EtablissementEdite;
