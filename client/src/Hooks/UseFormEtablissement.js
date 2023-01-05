import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//* import react hook from and yup
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//* import from state
import { getEtablissement, updateEtablissement } from "state/SettingSlice";

const validationSchema = Yup.object().shape({
  label: Yup.string().required("Branche is reqired"),
});

export default function useFormEtablissement(data) {
  const dispatch = useDispatch();
  const etablissement = useSelector(getEtablissement);
  let option = {
    resolver: yupResolver(validationSchema),
    defaultValues: etablissement,
  };
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm(option);
  const { errors, isSubmitting } = formState;

  //* function si onSubmit

  const dispatcheUpdate = async (data) => {
    await dispatch(updateEtablissement(data))
      .unwrap()
      .then((t) => {
        setSuccess(true);
      })
      .catch((e) => {
        setError(e);
      });
  };
  const onSubmit = handleSubmit(async (data, e) => {
    e.preventDefault();
    await dispatcheUpdate(data);
  });

  return {
    register,
    onSubmit,
    errors,
    isSubmitting,
    error,
    success,
  };
}
