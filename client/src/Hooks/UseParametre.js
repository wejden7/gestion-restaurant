import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//* import react hook from and yup
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//* import from state
import { selectData, updateParametre } from "state/ParametreSlice";

const validationSchema = Yup.object().shape({
  bonus: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("Label is required"),
      amount: Yup.number()
        .typeError("amount is a number")
        .required("amount is required"),
    })
  ),
  retenue: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("Label is required"),

      for: Yup.string().min(3, "for is required"),
      categaure: Yup.string().max(1, "categaure is required"),
    })
  ),
});

export default function useFormParametre() {
  const data = useSelector(selectData);
  console.log(data);
  let option = {
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  };
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, control, handleSubmit, formState, reset } = useForm(option);
  const useFieldBonus = { control, name: "bonus" };
  const useFieldRetenue = { control, name: "retenue" };
  const {
    fields: bonusFileds,
    append: bonusAppend,
    remove: BonusREmove,
  } = useFieldArray(useFieldBonus);
  const {
    fields: retenueFildes,
    append: retenueAppend,
    remove: retenueRemove,
  } = useFieldArray(useFieldRetenue);
  const { errors, isSubmitting } = formState;

  const ajouterBonus = () => {
    bonusAppend({ label: "", amount: null });
  };
  const ajouterRetenue = () => {
    retenueAppend({
      label: "",
      amount: null,
      taux: null,
      formule: "",
      for: "-1",
      categaure: "-1",
    });
  };
  //* function si onSubmit

  const dispatcheUpdate = async (data) => {
    console.log(data);
    await dispatch(updateParametre(data))
      .unwrap()
      .then((t) => {
        setSuccess(true);
      })
      .catch((e) => {
        console.log(e);
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
    control,
    errors,
    isSubmitting,
    error,
    success,
    bonusFileds,
    ajouterBonus,
    BonusREmove,
    retenueFildes,
    ajouterRetenue,
    retenueRemove,
  };
}
