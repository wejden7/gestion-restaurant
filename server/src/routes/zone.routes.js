import express from "express";

import {
  errorHandler,
  createZoneController,
  deleteZoneController,
  deleteZoneByBrancheController,
  findZoneController,
  findZoneByBrancheController,
  updateZoneController
} from "#controllers/zone.controller.js";

import { createZoneValidatore,updateZoneValidatore } from "#helpers/validator.js";

const router = express.Router();

router.post("/zone", createZoneValidatore, createZoneController, errorHandler);
router.delete("/zone/:id", deleteZoneController, errorHandler);
router.delete(
  "/zone-branche/:id",
  deleteZoneByBrancheController,
  errorHandler
);
router.get("/zone/:id", findZoneController, errorHandler);
router.get(
  "/zone-branche/:id",
  findZoneByBrancheController,
  errorHandler
);
router.put('/zone/:id',updateZoneValidatore,updateZoneController,errorHandler)

export default router;
