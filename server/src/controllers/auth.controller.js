import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// * import from models
import userModel from "#models/user.model.js";
import employerModel from "#models/employer.model.js";
import etablissementModel from "#models/etablissement.model.js";

// * import from service
import {
  createToken,
  createTokenEmplyer,
  randomString,
  durationHourUpdate,
  bcryptService,
  bcryptServiceCompar,
} from "#helpers/service.js";
import {
  createDefaultEtablissement,
  etablissementByUserEmployer,
} from "#service/etablissement.service.js";
import sendMail from "#helpers/sendMail.js";

export const registerController = async (req, res, next) => {
  const { email, password } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  try {
    const user = await userModel.findOne({ email });
    if (user) return next(` This email already exists`);

    req.body.password = bcryptService(password);
    const etablissement = await createDefaultEtablissement();
    req.body.etablissement = etablissement._id;
    const newUser = await userModel.create(req.body);
    const tokenObject = {
      _id: newUser._id,
      etablissement: newUser.etablissement._id,
      role: "admin",
    };
    const token = createToken(tokenObject);

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(error.message);
  }
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
    if (bcryptServiceCompar(password, user.password))
      return next("change password : Old password does not match");
    const newUser = await userModel.findOne({ _id: user._id });
    newUser.password = bcryptService(password);
    newUser.code = null;
    newUser.save();
    return res.status(200).json({ message: "password update" });
  } catch (error) {
    return next(error.message);
  }
};
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  try {
    const user = await userModel.findOne({ email }).populate("etablissement");
    if (!user) return next(` Email not found`);

    if (!bcryptServiceCompar(password, user.password))
      return next("incorrect password");

    const tokenObject = {
      _id: user._id,
      etablissement: user.etablissement._id,
      role: "admin",
    };
    const token = createToken(tokenObject);
    const resault = {
      _id: user._id,
      name: user.name,
      TextLogin: user.email,
      role: "admin",
    };
    return res.status(201).json({
      message: "login successfully",
      data: resault,
      etablissement: user.etablissement,
      token: token,
    });
  } catch (error) {
    return next(error.message);
  }
};
export const loginbyTokenController = async (req, res, next) => {
  const { _id, etablissement, role } = req.user;

  let user;
  if (role === "admin") {
    user = await userModel.findById({ _id: _id });
  } else {
    user = await employerModel.findById({ _id: _id });
  }

  const etablissement_ = await etablissementModel.findById({ _id: etablissement });

   const resault = {
    _id: user._id,
    name: user.name,
    TextLogin: user.email||user.userName,
    role: role,
  };
  return res.status(200).json({
    message: "login successfully",
    data: resault,
    etablissement:etablissement_
  });
};
export const loginEmployerController = async (req, res, next) => {
  const { userName, codeLogin } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  try {
    const employer = await employerModel.findOne({ userName }).populate("post");
    if (!employer) return next(` user Name not found`);

    if (!bcrypt.compareSync(codeLogin, employer.codeLogin))
      return next("incorrect code Login");

    const etablissement = await etablissementByUserEmployer({
      _id: employer._id,
    });
    const tokenObject = {
      _id: employer._id,
      etablissement: etablissement._id,
      role: employer.post.label,
    };
    const token = createToken(tokenObject);
    const resault = {
      _id: employer._id,
      name: employer.name,
      TextLogin: employer.userName,
      role: employer.post.label,
    };
    return res.status(201).json({
      message: "login successfully",
      data: resault,
      etablissement: etablissement,
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
