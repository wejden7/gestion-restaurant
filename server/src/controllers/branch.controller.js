import { validationResult } from "express-validator";

//* import from helpers
import { etablissementByUser } from "#helpers/service.js";

//* import from models
import brancheModel from "#models/branche.model.js";
import employerModel from "#models/employer.model.js";

export const handleError = (error, req, res, next) => {
  return res.status(500).json({ send: false, error: error });
};

export const createBrancheController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  const { label } = req.body;

  try {
    const etablissement = await etablissementByUser(req.user);

    if (!etablissement) return next("etablissement not found");

    const branche = await brancheModel.create({
      label: label,
      etablissement: etablissement._id,
    });

    return res.status(200).json({
      message: "Branche created successfully",
      data: branche,
    });
  } catch (error) {
    next(error.message);
  }
};

export const updateBrancheController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);
  const { id } = req.params;

  try {
    const newBranche = await brancheModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!newBranche) return next("branche not found");
    return res.status(200).json({
      message: "Branche update successfully",
      data: newBranche,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const deleteBrancheController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const branche = await brancheModel.findByIdAndDelete(id);
    if (!branche) return next("branche not found");

    return res.status(200).json({
      message: "Branche deleted successfully",
      data: id,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const findBrancheController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const branche = await brancheModel.findById(id).populate("etablissement");
    if (!branche) return next("branche not found");
    return res.status(200).json({
      message: "Branche find successfully",
      data: branche,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const findBrancheByEtablissementController = async (req, res, next) => {
  const { user } = req;
  try {
    if (user.role === "admin") {
      const { _id } = await etablissementByUser(user);
      var condition = { etablissement: _id };
    } else {
      const employer = await employerModel.findById({ _id: user._id });
      var condition = { _id: employer.branche };
    }

    const branche = await brancheModel.find(condition).select("-etablissement");
    if (branche.length === 0) return next("branche not found");
    return res.status(200).json({
      message: "Branche find successfully",
      data: branche,
    });
  } catch (error) {
    return next(error.message);
  }
};
