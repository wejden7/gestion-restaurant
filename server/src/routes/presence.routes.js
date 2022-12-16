import express from "express";

import {
  errorHandler,
  createPresenceController,
} from "#controllers/presence.controller.js";

import {} from "#helpers/validator.js";

const router = express.Router();

router.post("/presence", createPresenceController, errorHandler);

export default router;
