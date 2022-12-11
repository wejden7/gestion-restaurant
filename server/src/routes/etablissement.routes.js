import express from "express";
import {
  updateEtablissementController,
  findEtablissementController,
  handleError,
} from "#controllers/etablissement.controller.js";

import { updateEtablissementValidatore } from "#helpers/validator.js";

import { AuthorizationAdminMiddleware } from "#middleware/authorization.middleware.js";

const router = express.Router();

router.put(
  "/etablissement",
  AuthorizationAdminMiddleware,
  updateEtablissementValidatore,
  updateEtablissementController,
  handleError
);
router.get("/etablissement", findEtablissementController, handleError);

export default router;
