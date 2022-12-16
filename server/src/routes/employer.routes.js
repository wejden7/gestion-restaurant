import express from "express";
import {
  createEmployerController,
  deleteEmployerController,
  updateEmployerController,
  updateCodeLoginEmployerController,
  findEmployerController,
  errorHandler,
} from "#controllers/employer.controller.js";

import { createEmployerValidatore } from "#helpers/validator.js";

const router = express.Router();

router.post(
  "/employer",
  createEmployerValidatore,
  createEmployerController,
  errorHandler
);

router.delete("/employer/:id", deleteEmployerController, errorHandler);
router.put(
  "/employer/:id",
  createEmployerValidatore,
  updateEmployerController,
  errorHandler
);
router.put(
  "/employer-code-login/:id",
  updateCodeLoginEmployerController,
  errorHandler
);
router.get(
  "/employer",
  findEmployerController,
  errorHandler
);

export default router;
