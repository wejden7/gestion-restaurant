import presenceModel from "#models/presence.model.js";

import {} from "#helpers/service.js";

import { validationResult } from "express-validator";

export const errorHandler = async (error, req, res, next) => {
  return res.status(500).json({
    message: "La connexion a échouée, merci de réessayer",
    errors: error,
  });
};

export const createPresenceController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  return res.status(200).json({ wejden: "" });
};
