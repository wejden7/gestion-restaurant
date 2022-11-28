import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  verificationCodeController, 
  updatePasswordController,
  handleError,
} from "#controllers/auth.controller.js";
import { registerValidatore, loginValidatore, emailValidatore, verificationCodeValidatore,updatePasswordValidatore} from "#helpers/validator.js";
import auth from '#middleware/auth.middleware.js'
const router = express.Router();

router.post("/register", registerValidatore, registerController, handleError);
router.post("/login", loginValidatore, loginController, handleError);
router.post("/forgotPassword",emailValidatore, forgotPasswordController, handleError);
router.post("/verificationCode",verificationCodeValidatore, verificationCodeController, handleError);
router.post("/updatePassword",auth,updatePasswordValidatore, updatePasswordController, handleError);
export default router;