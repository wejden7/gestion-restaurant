import { validationResult } from "express-validator";

//* import from helpers
import { etablissementByUser } from "#service/etablissement.service.js";

//* import from models
import etablissementModel from "#models/etablissement.model.js";

//* contoller
export const handleError = (error, req, res, next) => {
  return res.status(500).json({ send: false, error: error });
};

export const updateEtablissementController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  const { label } = req.body;

  try {
    const { _id } = await etablissementByUser(req.user);
    const etablissement = await etablissementModel.findByIdAndUpdate(
      _id,
      { label },
      { new: true }
    );
    return res.status(200).json({
      message: "Etablissement update successfully",
      data: etablissement,
    });
  } catch (error) {
    next(error.message);
  }
};

export const findEtablissementController = async (req, res, next) => {
 
  try {
    const { _id } = await etablissementByUser(req.user);
    const etablissement = await etablissementModel.findById(_id);
    if (!etablissement) return next("etablissement not found");
    return res.status(200).json({
      message: "Etablissement find successfully",
      data: etablissement,
    });
  } catch (error) {
    next(error.message);
  }
};
