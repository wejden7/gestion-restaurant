import React, { useState } from "react";
import { useDispatch } from "react-redux";

//* import react hook from and yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//* import from state
import { createEmployer, updateEmployer } from "state/TeamSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name Poste is reqired"),
  userName: Yup.string().required("userName Poste is reqired"),
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
  post: Yup.string().required("Post is reqired").min(3),
  branche: Yup.string().required("Branche is reqired").min(3),
});

export default function useFormTeam(data, update) {
  let option = {
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  };
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [code, setcode] = useState("");
  const { register, handleSubmit, formState, reset, control } = useForm(option);
  const { errors, isSubmitting } = formState;

  
  //* function si onSubmit
  const dispatcheCreate = async (data) => {
    await dispatch(createEmployer(data))
      .unwrap()
      .then((t) => {
        reset();
        setcode(t.codeLogin);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  };
  const dispatcheUpdate = async (data) => {
    console.log(data);
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
  };
}
