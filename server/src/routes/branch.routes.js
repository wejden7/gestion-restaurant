import express from "express";

import {
  createBrancheController,
  updateBrancheController,
  deleteBrancheController,
  findBrancheController,
  findBrancheByEtablissementController,
  handleError,
} from "#controllers/branch.controller.js";

import {
  createBrancheValidatore,
  updateBrancheValidatore,
} from "#helpers/validator.js";

import { AuthorizationAdminMiddleware } from "#middleware/authorization.middleware.js";

const router = express.Router();

router.post(
  "/branche",
  AuthorizationAdminMiddleware,
  createBrancheValidatore,
  createBrancheController,
  handleError
);
router.put(
  "/branche/:id",
  AuthorizationAdminMiddleware,
  updateBrancheValidatore,
  updateBrancheController,
  handleError
);
router.get("/branche/:id", findBrancheController, handleError);
router.get("/branche", findBrancheByEtablissementController, handleError);

router.delete(
  "/branche/:id",
  AuthorizationAdminMiddleware,
  deleteBrancheController,
  handleError
);

export default router;
