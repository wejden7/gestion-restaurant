import express from "express";

import {
  createPostController,
  updatePostController,
  findPostController,
  findAllPostController,
  deletePostController,
  errorHandler,
} from "#controllers/post.controller.js";

import {
  createPostValidatore,
  updatePostValidatore,
} from "#helpers/validator.js";

import {
  AuthorizationAdminMiddleware,
} from "#middleware/authorization.middleware.js";


const router = express.Router();

router.post("/post",AuthorizationAdminMiddleware, createPostValidatore, createPostController, errorHandler);
router.put(
  "/post/:id",
  AuthorizationAdminMiddleware,
  updatePostValidatore,
  updatePostController,
  errorHandler
);
router.get("/post/:id", findPostController, errorHandler);
// *select all post of etablissement
router.get("/post",findAllPostController, errorHandler);
router.delete("/post/:id",AuthorizationAdminMiddleware, deletePostController, errorHandler);

export default router;
