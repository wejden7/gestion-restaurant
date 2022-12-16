import postModel from "#models/post.model.js";

import {etablissementByUserEmployer,etablissementByUser} from "#service/etablissement.service.js"
export const postUser = async (id, user) => {
  if (user.role === "admin") return await postUserAdmin(id, user);
  return await postUserEmployer(id, user);
};
const postUserAdmin = async (id, user) => {
  const etablissement = await etablissementByUser(user);
  const post = await postModel.findOne({
    _id: id,
    etablissement: etablissement._id,
  });
  if (!post) return false;
  return true;
};
const postUserEmployer = async (id, user) => {
  const etablissement = await etablissementByUserEmployer(user);
  const post = await postModel.findOne({
    _id: id,
    etablissement: etablissement._id,
  });
  if (!post) return false;
  return true;
};


