import employerModel from "#models/employer.model.js";
import brancheModel from "#models/branche.model.js";

import {
  randomString,
  postUser,
  brancheUser,
  employerUser,
  etablissementByUser,
} from "#helpers/service.js";

import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export const errorHandler = async (error, req, res, next) => {
  return res.status(500).json({
    message: "La connexion a échouée, merci de réessayer",
    errors: error,
  });
};

export const createEmployerController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);
  const { post, branche, userName } = req.body;

  try {
    const postExiste = await postUser(post, req.user);
    if (!postExiste) return next("post not found");
    const brancheExiste = await brancheUser(branche, req.user);
    if (!brancheExiste) return next("branche not found");
    const employerExiste = await employerModel.findOne({ userName });
    if (employerExiste) return next("userName existe");
    const codeLogin = randomString(8, req.body.name);
    const salt = bcrypt.genSaltSync(10);
    req.body.codeLogin = bcrypt.hashSync(codeLogin, salt);
    const employer = await employerModel.create(req.body);

    return res.status(200).json({
      message: "employer created successfully",
      data: employer,
      codeLogin: codeLogin,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const findEmployerController = async (req, res, next) => {
  const { user } = req;

  try {
    if (user.role === "admin") {
      const { _id } = await etablissementByUser(user);
      var condition = { etablissement: _id };
    } else {
      const employer = await employerModel.findById({ _id: user._id });
      var condition = { _id: employer.branche };
    }
    const branches = await brancheModel.find(condition);
    const employers = await employerModel
      .find({ branche: { $in: branches } })
      .select("-codeLogin");
    return res.status(200).json({
      message: "Employer deleted successfully",
      data: employers,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const deleteEmployerController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const existe = await employerUser(id, req.user);
    if (!existe) return next("employer not found or  not authorized");
    const employer = await employerModel.findByIdAndDelete(id);
    if (!employer) return next("employer not found");

    return res.status(200).json({
      message: "Employer deleted successfully",
      data: id,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const updateEmployerController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  const { id } = req.params;
  const { post, branche } = req.body;

  try {
    const existe = await employerUser(id, req.user);
    if (!existe) return next("employer not found or  not authorized");
    const postExiste = await postUser(post, req.user);
    if (!postExiste) return next("post not found");
    const brancheExiste = await brancheUser(branche, req.user);
    if (!brancheExiste) return next("branche not found");

    const employee = await employerModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Employer update successfully",
      data: employee,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const updateCodeLoginEmployerController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const existe = await employerUser(id, req.user);
    if (!existe) return next("employer not found or  not authorized");

    const employer = await employerModel.findById(id);

    const codeLogin = randomString(8, employer.name);
    const salt = bcrypt.genSaltSync(10);
    employer.codeLogin = bcrypt.hashSync(codeLogin, salt);

    await employer.save();
    return res.status(200).json({
      message: "code Login Employer update successfully",
      data: codeLogin,
    });
  } catch (error) {
    return next(error.message);
  }
};
