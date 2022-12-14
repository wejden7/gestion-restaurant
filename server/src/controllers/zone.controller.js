import zoneModel from "#models/zone.model.js";
import brancheModel from "#models/branche.model.js";

import { brancheUser, zoneUser } from "#helpers/service.js";

import { validationResult } from "express-validator";

export const errorHandler = async (error, req, res, next) => {
  return res.status(500).json({
    message: "La connexion a échouée, merci de réessayer",
    errors: error,
  });
};

export const createZoneController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  const { branche } = req.body;
  try {
    const brancheExiste = await brancheUser(branche, req.user);
    if (!brancheExiste) return next("branche not found");
    const zone = await zoneModel.create(req.body);

    return res.status(200).json({
      message: "Zone created successfully",
      data: zone,
    });
  } catch (error) {
    next(error?.message);
  }
};

export const deleteZoneController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existe = await zoneUser(id, req.user);
    if (!existe) return next("zone not Autautization to delete or not found");
    await zoneModel.deleteOne({ _id: id });
    return res.status(200).json({
      message: "Zone deleted successfully",
      data: id,
    });
  } catch (error) {
    next(error.message);
  }
};

export const deleteZoneByBrancheController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brancheExiste = await brancheUser(id, req.user);
    if (!brancheExiste) return next("branche not authorized");

    const zone = await zoneModel.deleteMany({ branche: id });
    if (zone.deletedCount === 0) return next("zone not found");

    return res.status(200).json({
      message: "Zone deleted successfully",
      data: id,
    });
  } catch (error) {
    next(error.message);
  }
};

export const findZoneController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const existe = await zoneUser(id, req.user);
    if (!existe) return next("zone not Autautization to find or not found");

    const zone = await zoneModel.findById(id).populate("branche");

    return res.status(200).json({
      message: "Zone find successfully",
      data: zone,
    });
  } catch (error) {
    next(error.message);
  }
};

export const findZoneByBrancheController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const brancheExiste = await brancheUser(id, req.user);
    if (!brancheExiste) return next("branche not authorized");

    const zone = await zoneModel.find({ branche: id }).select("-branche -__v");
    return res.status(200).json({
      message: "Zone find successfully",
      data: zone,
    });
  } catch (error) {
    next(error.message);
  }
};

export const openCloseZoneController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existe = await zoneUser(id, req.user);
    if (!existe) return next("zone not Autautization to find or not found");

    const zone = await zoneModel.findById(id);
    if (!zone) return next("zone not found");
    zone.ferme = !zone.ferme;
    await zone.save();
    const branche = await brancheModel.findById({ _id: zone.branche });
    const zones = await zoneModel.find({ branche: branche._id });
    const newObject = {
      _id: branche._id,
      label: branche.label,
      zones: zones,
    };
    return res.status(200).json({
      message: "Zone update successfully",
      data: newObject,
    });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};
