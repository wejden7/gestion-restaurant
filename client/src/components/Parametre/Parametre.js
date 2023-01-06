import useFormParametre from "Hooks/UseParametre";
import React from "react";
import BarLoader from "react-spinners/BarLoader";
import { forRetenue ,categorieRetenue } from "utils/Data/Data";
import "./Parametre.style.scss";
import { InputText, InputSelectLabel } from "components/Input/Input";
const Parametre = () => {
  const {
    register,
    onSubmit,
    errors,
    isSubmitting,
    error,
    control,
    success,
    bonusFileds,
    ajouterBonus,
    BonusREmove,
    retenueFildes,
    ajouterRetenue,
    retenueRemove,
  } = useFormParametre();
  return (
    <form className="form-parametre" onSubmit={onSubmit}>
      <button className=" btn btn-save" type="submit">
      {!isSubmitting ? "save" : <BarLoader color="#fefbd8" width={30} />}
      </button>
      <div className="form-parametre-containt">
        <div className="container">
          <div className="section">
            <label htmlFor="">Taux Majouration Heure Supp</label>
            <div className="section-1">
              <InputText
                register={register}
                name="tauxMajourationHeuresSupp.one"
                placeholder="One"
                icon="&#x25;"
              />
              <InputText
                register={register}
                name="tauxMajourationHeuresSupp.tow"
                placeholder="Tow"
                icon="&#x25;"
              />
            </div>
          </div>
          <div className="section">
            <label htmlFor="">Salary Min</label>

            <InputText
              register={register}
              name="salaryMin"
              placeholder="0"
              icon="&#x24;"
            />
          </div>
        </div>
        <div className="titel-section">
          <h1>Bonus </h1>
          <button type="button" className="btn" onClick={ajouterBonus}>
            Add New
          </button>
        </div>

        {bonusFileds.map((item, index) => (
          <div className="section-3" key={item.id}>
            <InputText
              register={register}
              name={`bonus.${index}.label`}
              placeholder="label"
              icon="&#xf682;"
              errors={
                errors?.bonus
                  ? errors.bonus[index]
                    ? errors.bonus[index].label?.message
                    : ""
                  : ""
              }
            />

            <InputText
              register={register}
              name={`bonus.${index}.amount`}
              placeholder="amount"
              icon="&#xf682;"
              errors={
                errors?.bonus
                  ? errors.bonus[index]
                    ? errors.bonus[index].amount?.message
                    : ""
                  : ""
              }
            />
            <button className="btn " onClick={() => BonusREmove(index)}>
              Delete
            </button>
          </div>
        ))}
        <div className="titel-section">
          <h1>Retenue </h1>
          <button type="button" className="btn" onClick={ajouterRetenue}>
            Add New
          </button>
        </div>
        {retenueFildes.map((item, index) => (
          <div className="section-3" key={item.id}>
            <InputText
              register={register}
              name={`retenue.${index}.label`}
              placeholder="label"
              icon="&#xf682;"
              errors={
                errors?.retenue
                  ? errors.retenue[index]
                    ? errors.retenue[index].label?.message
                    : ""
                  : ""
              }
            />
            <InputText
              register={register}
              name={`retenue.${index}.taux`}
              placeholder="taux"
              icon="&#xf682;"
              errors={
                errors?.retenue
                  ? errors.retenue[index]
                    ? errors.retenue[index].taux?.message
                    : ""
                  : ""
              }
            />

            <InputText
              register={register}
              name={`retenue.${index}.amount`}
              placeholder="amount"
              icon="&#xf682;"
              errors={
                errors?.retenue
                  ? errors.retenue[index]
                    ? errors.retenue[index].amount?.message
                    : ""
                  : ""
              }
            />
            <InputText
              register={register}
              name={`retenue.${index}.formule`}
              placeholder="formule"
              icon="&#xf682;"
              errors={
                errors?.retenue
                  ? errors.retenue[index]
                    ? errors.retenue[index].formule?.message
                    : ""
                  : ""
              }
            />
            <InputSelectLabel
              control={control}
              name={`retenue.${index}.for`}
              data={forRetenue}
              placeholder="select For "
              icon="&#xf682;"
              errors={
                errors?.retenue
                  ? errors.retenue[index]
                    ? errors.retenue[index].for?.message
                    : ""
                  : ""
              }
            />
            <InputSelectLabel
              control={control}
              name={`retenue.${index}.categaure`}
              data={categorieRetenue}
              placeholder="Select Categaure"
              icon="&#xf682;"
              errors={
                errors?.retenue
                  ? errors.retenue[index]
                    ? errors.retenue[index].categaure?.message
                    : ""
                  : ""
              }
            />
            <button
              className="btn btn-retenue "
              onClick={() => retenueRemove(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Parametre;
