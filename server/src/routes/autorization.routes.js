import express from "express";

import {
  autorizationController,
  handleError,
} from "#controllers/Autorization.controller.js";

import {} from "#helpers/validator.js";

const router = express.Router();

router.get("/autorization", autorizationController, handleError);

export default router;
