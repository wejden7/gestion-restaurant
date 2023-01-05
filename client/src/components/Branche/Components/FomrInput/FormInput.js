import React from "react";
import { InputText } from "components/Input/Input";
import "./FormInput.style.scss";
const FormInput = ({ useForm }) => {
  const { register, errors, fields, remove } = useForm;
  return (
    <>
      <InputText
        register={register}
        name="label"
        placeholder="Label"
        errors={errors.label?.message}
        icon="&#xf126;"
      />

      <InputText
        register={register}
        name="adresse"
        placeholder="Adresse"
        icon="&#xf3c5;"
      />
      <InputText
        register={register}
        name="tel"
        placeholder="Tel"
        icon="&#xf2a0;"
      />

      {fields.map((item, index) => (
        <label key={item.id} className="input-zone" htmlFor="name-group">
          <InputText
            register={register}
            name={`zones.${index}.label`}
            placeholder="Zones"
            icon="&#xf682;"
            errors={
              errors?.zones
                ? errors.zones[index]
                  ? errors.zones[index].label?.message
                  : ""
                : ""
            }
          />

          {fields.length > 1 && (
            <span type="button" onClick={() => remove(index)}></span>
          )}
        </label>
      ))}
    </>
  );
};

export default FormInput;
