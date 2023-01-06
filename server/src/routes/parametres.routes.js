import express from "express";

import {
  findContoller,
  updateContoller,
  handleError,
} from "../controllers/parametres.controller.js";
import {} from "#helpers/validator.js";

const router = express.Router();
router.get("/parametre", findContoller, handleError);
router.put("/parametre", updateContoller, handleError);

export default router;
