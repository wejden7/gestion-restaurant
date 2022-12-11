import permissionTagsModel from "#models/permissionTags.model.js";

import { validationResult } from "express-validator";

export const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    message: "La connexion a échouée, merci de réessayer",
    errors: err,
  });
};

export const creatPermissionTagsController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  try {
    const permission = await permissionTagsModel.create(req.body);

    return res.status(200).json({
        message: "permission created successfully",
        data: permission,
      });
  } catch (error) {
    next(error.message);
  }
};
