import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import BarLoader from "react-spinners/BarLoader";
import "./input.scss";

export const TextInputName = ({ register, error }) => {
  return (
    <label className="input" htmlFor="form-name">
      <input id="form-name" type="text" placeholder="Name" {...register} />
      {error && <p className="error-name">{error}</p>}
      <BsFillPersonFill className="form-icon" />
    </label>
  );
};
export const TextInputCode = ({ register, error }) => {
  return (
    <label className="input" htmlFor="form-name">
      <input id="form-name" type="text" placeholder="Code" {...register} />
      {error && <p className="error-name">{error}</p>}
      <RiLockPasswordFill className="form-icon" />
    </label>
  );
};

export const EmailInput = ({ register, error }) => {
  return (
    <label className="input" htmlFor="form-email">
      <input id="form-email" type="text" placeholder="Email" {...register} />
      {error && <p className="error-name">{error}</p>}
      <MdEmail className="form-icon" />
    </label>
  );
};

export const PasswordInput = ({ register, error }) => {
  return (
    <label className="input" htmlFor="form-password">
      <input
        id="form-password"
        type="password"
        placeholder="Password"
        {...register}
      />
      {error && <p className="error-name">{error}</p>}
      <HiLockClosed className="form-icon" />
    </label>
  );
};

export const SubmitInput = ({ isSubmitting, label }) => {
  return (
    <button disabled={isSubmitting} className="btn-auth" type="submit">
      {!isSubmitting ? label : <BarLoader color="#fefbd8" />}
    </button>
  );
};
