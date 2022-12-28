import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import userModel from "#models/user.model.js";
import etablissementModel from "#models/etablissement.model.js";
import brancheModel from "#models/branche.model.js";
import zoneModel from "#models/zone.model.js";
import employerModel from "#models/employer.model.js";
import {
  createToken,
  createTokenEmplyer,
  randomString,
  durationHourUpdate,
} from "#helpers/service.js";
import sendMail from "#helpers/sendMail.js";

export const registerController = async (req, res, next) => {
  const { email, password } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  try {
    const user = await userModel.findOne({ email });
    if (user) return next(` This email already exists`);

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);
    req.body.type = "admin";
    const etablissement = await etablissementModel.create({
      label: "restaurant",
    });
    const branche = await brancheModel.create({
      label: "restaurant 1",
      etablissement: etablissement._id,
    });
    const zone = await zoneModel.create({
      label: "zone1",
      branche: branche._id,
    });
    req.body.etablissement = etablissement._id;
    const newUser = await userModel.create(req.body);

    const token = createToken(newUser);

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
      token: token,
    });
  } catch (error) {
    next(error.message);
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  try {
    const user = await userModel.findOne({ email });
    if (!user) return next(` Email not found`);

    if (!bcrypt.compareSync(password, user.password))
      return next("incorrect password");

    const token = createToken(user);
    const resault = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdDate: user.createdDate,
      role: "admin",
    };
    return res.status(201).json({
      message: "login successfully",
      data: resault,
      token: token,
    });
  } catch (error) {
    return next(error.message);
  }
};
export const loginbyTokenController = async (req, res, next) => {
  const { user } = req;

  let userById;
  let token;
  if (user.role === "admin") {
    console.log(user);
    userById = await userModel.findById(user._id);
    token = createToken(userById);
  } else {
    userById = await employerModel.findById(user._id);
    token = createTokenEmplyer(userById);
  }
  const resault = {
    _id: user._id,
    name: userById.name,
    email: userById?.email || userById?.userName,
    createdDate: userById.createdDate || null,
    role: user.role,
  };

  return res.status(200).json({
    message: "login successfully",
    data: resault,
    token: token,
  });
};

export const forgotPasswordController = async (req, res, next) => {
  const { email } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  try {
    const user = await userModel.findOne({ email });
    if (!user) return next("L’adresse mail est inconnue");

    const code = randomString(4);

    user.code = code;
    user.updatedDate = new Date();
    user.save();

    await sendMail(user.email, code);

    return res
      .status(200)
      .json({ message: "email code send successfully", data: user.email });
  } catch (error) {
    return next(error.message);
  }
};

export const verificationCodeController = async (req, res, next) => {
  const { email, code } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  try {
    const user = await userModel.findOne({ email, code });
    if (!user) return next("Code not valide, merci de réessayer");

    const hour = durationHourUpdate(user.updatedDate);
    if (hour < 1) {
      const token = createToken(user);
      return res.status(200).json({ message: "code valide", token: token });
    }

    user.code = null;
    user.updatedDate = new Date();
    user.save();
    return next("code not valide réessayer de nouveau ");
  } catch (error) {
    return next(error.message);
  }
};

export const updatePasswordController = async (req, res, next) => {
  const { password } = req.body;
  const { user } = req;
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);
  try {
    if (bcrypt.compareSync(password, user.password))
      return next("change password : Old password does not match");
    const newUser = await userModel.findOne({ _id: user._id });
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);
    newUser.updatedDate = new Date();
    newUser.code = null;
    newUser.save();
    return res.status(200).json({ message: "password update" });
  } catch (error) {
    return next(error.message);
  }
};

export const loginEmployerController = async (req, res, next) => {
  const { userName, codeLogin } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  try {
    const employer = await employerModel.findOne({ userName });
    if (!employer) return next(` user Name not found`);

    if (!bcrypt.compareSync(codeLogin, employer.codeLogin))
      return next("incorrect code Login");

    const token = createTokenEmplyer(employer);
    const resault = {
      _id: employer._id,
      name: employer.name,
      email: employer.userName,
      createdDate: null,
      role: "Employer",
    };
    return res.status(201).json({
      message: "login successfully",
      data: resault,
      token: token,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const handleError = async (error, req, res, next) => {
  return res.status(500).json({
    message: "La connexion a échouée, merci de réessayer",
    errors: error,
  });
};
