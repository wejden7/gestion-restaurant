import { check } from "express-validator";

export const loginValidatore = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];

export const registerValidatore = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4 })
    .withMessage("Name must contain at least 4 characters"),

 

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];
/** check("type")
    .notEmpty()
    .withMessage("type is required")
    .isIn(["admin", "employee"])
    .withMessage("Type must contain admin or employee"), */

export const emailValidatore = [
  check("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Must be a valid email address"),

]

export const verificationCodeValidatore = [
  check("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Must be a valid email address"),

  check("code")
  .notEmpty()
  .withMessage("Email is required")
  .isLength({ min: 4 ,max:4})
  .withMessage("Code must contain 4 characters")
]

export const updatePasswordValidatore = [
  check("password")
  .notEmpty()
  .withMessage("Password is required")
  .isLength({ min: 6 })
  .withMessage("Password must contain at least 6 characters")
  .matches(/\d/)
  .withMessage("Password must contain a number"),

]