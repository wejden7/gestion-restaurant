import { validationResult } from "express-validator";

//* import * from helpers
import { etablissementByUser } from "#service/etablissement.service.js";
import { postUser} from '#service/post.service.js'

//* import  from models
import postModel from "#models/post.model.js";

export const errorHandler = async (error, req, res, next) => {
  return res.status(500).json({
    message: "La connexion a échouée, merci de réessayer",
    errors: error,
  });
};
export const createPostController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  const { label } = req.body;
  try {
    const etablissement = await etablissementByUser(req.user);
    if (!etablissement) return next("etablissement not found");

    const post = await postModel.create({
      label,
      etablissement: etablissement._id,
    });
    return res.status(200).json({
      message: "post created successfully",
      data: post,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const updatePostController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  const { id } = req.params;

  try {
    const existe = await postUser(id, req.user);
    if (!existe) return next("existe not found or not authorized");
    const post = await postModel.findById(id);
    if (!post) return next("post not found");
    post.permission = req.body.permission;
    post.label = req.body.label;
    await post.save();
    return res.status(200).json({
      message: "post update successfully",
      data: post,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const findPostController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const existe = await postUser(id, req.user);
    if (!existe) return next("post not found or not authorized");

    const post = await postModel.findById(id).populate("etablissement");
    if (!post) return next("post not found");

    return res.status(200).json({
      message: "post find successfully",
      data: post,
    });
  } catch (error) {
    return next(error.message);
  }
};
export const findAllPostController = async (req, res, next) => {
  try {
    const etablissement = await etablissementByUser(req.user);
    if (!etablissement) return next("etablissement not found");

    const post = await postModel
      .find({ etablissement: etablissement._id })
      .populate("etablissement");
    if (post.length === 0) return next("post not found");

    return res.status(200).json({
      message: "post find successfully",
      data: post,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const deletePostController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const existe = await postUser(id, req.user);
    if (!existe) return next("post not found or not authorized");

    const post = await postModel.findByIdAndDelete(id);
    if (!post) return next("post not found");
    return res.status(200).json({
      message: "post find successfully",
      data: id,
    });
  } catch (error) {
    return next(error.message);
  }
};
