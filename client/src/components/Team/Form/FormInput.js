import React from "react";
import { Input } from "components";
import { holiday, salaryType, familyStatus } from "utils/Data/Data";
import { useSelector } from "react-redux";
import { getPostes, getBranches } from "state/SettingSlice";
import "./Form.style.scss";
const FormInput = ({ useForm }) => {
  const postes = useSelector(getPostes);
  const Branches = useSelector(getBranches);
  const {
    register,
    errors,
    control,
    fields,
    ajouterEnfants,
    remove,
    watchStatusFamily,
  } = useForm;
  return (
    <>
      <div className="section">
        <Input.InputText
          register={register}
          name="name"
          errors={errors.name?.message}
          icon="&#xf007;"
          placeholder="Name"
        />
        <Input.InputText
          register={register}
          name="userName"
          errors={errors.userName?.message}
          icon="&#xf007;"
          placeholder="User Name "
        />
        <Input.InputText
          register={register}
          name="cin"
          errors={errors.cin?.message}
          icon="&#xf007;"
          placeholder="cin"
        />
        <Input.InputText
          register={register}
          name="address"
          errors={errors.address?.message}
          icon="&#xf007;"
          placeholder="address"
        />
        <Input.InputSelectLabel
          control={control}
          data={postes}
          name="post"
          placeholder="Select post"
          errors={errors.post?.message}
        />
        <Input.InputSelectLabel
          control={control}
          data={Branches}
          name="branche"
          placeholder="Select branche"
          errors={errors.branche?.message}
        />

        <Input.InputDate
          control={control}
          name="dateStart"
          errors={errors.dateStart?.message}
          icon="&#xf007;"
          placeholder="Date to Starte"
        />

        <Input.InputText
          register={register}
          name="WorkHoursPerWeek"
          errors={errors.WorkHoursPerWeek?.message}
          icon="&#xf007;"
          placeholder="Heures de travail par semaine"
        />
        <Input.InputSelectLabel
          control={control}
          data={holiday}
          name="holiday"
          placeholder="Select Holiday"
          errors={errors.holiday?.message}
        />
        <Input.InputSelectLabel
          control={control}
          data={salaryType}
          name="salaryType"
          placeholder="Select Salary Type"
          errors={errors.salaryType?.message}
        />

        <Input.InputText
          register={register}
          name="cnss"
          errors={errors.cnss?.message}
          icon="&#xf007;"
          placeholder="cnss"
        />

        <Input.InputText
          register={register}
          name="rib"
          errors={errors.rib?.message}
          icon="&#xf007;"
          placeholder=" Rib"
        />
        <Input.InputText
          register={register}
          name="salaryBase"
          errors={errors.salaryBase?.message}
          icon="&#xf007;"
          placeholder="salary Base"
        />
        <div className="input-group-time-work">
          <Input.InputText
            register={register}
            name="timeWork.start"
            errors={errors.timeWork?.start?.message}
            icon="&#xf251;"
            placeholder="Start  Work"
          />
          <Input.InputText
            register={register}
            name="timeWork.end"
            errors={errors.timeWork?.end?.message}
            icon="&#xf253;"
            placeholder="End  Work"
          />
        </div>
        <Input.InputSelectLabel
          control={control}
          data={familyStatus}
          name="familyStatus.status"
          placeholder="Select family Status"
          errors={errors.familyStatus?.status?.message}
        />
      </div>

      <div className="section ">
        {watchStatusFamily != "-1" && watchStatusFamily != "Single" && (
          <button
            type="button"
            className="btn-add-Enfant"
            onClick={ajouterEnfants}
          >
            Add Un Enfant
          </button>
        )}
        {fields.map((item, index) => (
          <div className="input-enfant" key={index}>
            <Input.InputText
              register={register}
              name={`familyStatus.enfant.${index}.age`}
              type="text"
              id="name-group"
              placeholder="Age"
            />
            <button
              type="button"
              className="btn-remove-enfant"
              onClick={() => remove(index)}
            ></button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FormInput;
