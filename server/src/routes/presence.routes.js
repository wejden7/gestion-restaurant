import express from "express";

import {
  errorHandler,
  addPresenceController,
  quitePresenceController,
  updatePresenceController,
  createPresenceController,
  checkPresenceController,
  checkMePresanceController,
} from "#controllers/presence.controller.js";

import {} from "#helpers/validator.js";

const router = express.Router();

router.post("/presence/:id", createPresenceController, errorHandler);
router.post("/presence-work", addPresenceController, errorHandler);
router.post("/presence-quite", quitePresenceController, errorHandler);
router.post("/presence-check", checkMePresanceController, errorHandler);
router.put("/presence/:id", updatePresenceController, errorHandler);
router.get("/presence", checkPresenceController, errorHandler);

export default router;
