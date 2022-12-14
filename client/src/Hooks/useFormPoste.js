import React, { useState } from "react";
import { useDispatch } from "react-redux";

//* import react hook from and yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//* import from state
import { createPoste ,updatePoste} from "state/SettingSlice";

const validationSchema = Yup.object().shape({
  label: Yup.string().required("Name Poste is reqired"),
});

export default function useFormPoste(data, update) {
  let option = {
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  };
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm(option);
  const { errors, isSubmitting } = formState;

  //* function si onSubmit
  const dispatcheCreate = async (data) => {
    await dispatch(createPoste(data))
      .unwrap()
      .then((t) => {
        reset();
        setSuccess(true);
      })
      .catch((e) => {
        setError(e);
      });
  };
  const dispatcheUpdate = async (data) => {
    console.log(data)
    await dispatch(updatePoste(data))
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
    !update ? await dispatcheCreate(data) : await dispatcheUpdate(data);
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
