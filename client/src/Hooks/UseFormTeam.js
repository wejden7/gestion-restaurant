import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//* import react hook from and yup
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//* import from state
import { createEmployer, updateEmployer } from "state/TeamSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name  is reqired"),
  userName: Yup.string().required("userName  is reqired"),
  cnss: Yup.string().required("CNSS  is reqired"),
  cin: Yup.string().required("CIN Poste is reqired"),
  post: Yup.string().min(3, "Post is reqired"),
  holiday: Yup.string().min(3, "Holiday is reqired"),
  branche: Yup.string().min(3, "Post is reqired"),
  salaryType: Yup.string().min(3, "salary Type is reqired"),
  salaryBase: Yup.number().typeError("salaryBase is reqired"),
  dateStart: Yup.date()
    .typeError("Must be a Date type")
    .required("hour Worked is reqired"),
  timeWork: Yup.object({
    start: Yup.number()
      .typeError("Must be a number type")
      .required("start is reqired")
      .min(0, "The minimum amount is one")
      .max(23, "The minimum amount is one"),
    end: Yup.number()
      .typeError("Must be a number type")
      .required("end  is reqired")
      .min(0, "The minimum amount is one")
      .max(23, "The minimum amount is one"),
  }),
  familyStatus: Yup.object({
    status: Yup.string()
      .required("family Status is reqired")
      .min(3, "family Status is reqired"),
  }),
  WorkHoursPerWeek: Yup.number()
    .typeError("WorkHoursPerWeek is reqired")
    .min(40, "40 hour is min")
    .max("48", "48 hour is max"),
});

export default function useFormTeam(data, update) {
  let option = {
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  };
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [code, setcode] = useState("");
  const { register, handleSubmit, formState, reset, control, watch } =
    useForm(option);
  const useFieldParameters = { control, name: "familyStatus.enfant" };
  const { fields, append, remove } = useFieldArray(useFieldParameters);
  const { errors, isSubmitting } = formState;
  const watchStatusFamily = watch(
    "familyStatus.status",
    data.familyStatus.status || "-1"
  );

  const ajouterEnfants = () => {
    append({ age: 1 });
  };
  const clearCodel = () => {
    setcode("");
  };

  //* function si onSubmit
  const dispatcheCreate = async (data) => {
    console.log(data);
    setError("");
    await dispatch(createEmployer(data))
      .unwrap()
      .then((t) => {
        reset();
        fields.map((_, index) => remove(index));
        setcode(t.codeLogin);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  };
  const dispatcheUpdate = async (data) => {
    console.log(data);
    setError("");
    await dispatch(updateEmployer(data))
      .unwrap()
      .then((t) => {
        setcode(true);
      })
      .catch((e) => {
        setError(e);
      });
  };
  const onSubmit = handleSubmit(async (data, e) => {
    e.preventDefault();

    !update ? await dispatcheCreate(data) : await dispatcheUpdate(data);
  });

  return {
    register,
    onSubmit,
    errors,
    isSubmitting,
    error,
    code,
    control,
    fields,
    remove,
    reset,
    ajouterEnfants,
    watchStatusFamily,
    clearCodel,
  };
}
