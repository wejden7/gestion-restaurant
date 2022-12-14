import express from "express";

import {
  errorHandler,
  createZoneController,
  deleteZoneController,
  deleteZoneByBrancheController,
  findZoneController,
  findZoneByBrancheController,
  openCloseZoneController,
} from "#controllers/zone.controller.js";

import { createZoneValidatore } from "#helpers/validator.js";

const router = express.Router();

router.post("/zone", createZoneValidatore, createZoneController, errorHandler);
router.delete("/zone/:id", deleteZoneController, errorHandler);
router.delete("/zone-branche/:id", deleteZoneByBrancheController, errorHandler);
router.get("/zone/:id", findZoneController, errorHandler);
router.get("/zone-branche/:id", findZoneByBrancheController, errorHandler);
router.put("/zone/:id", openCloseZoneController, errorHandler);

export default router;
