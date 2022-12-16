import employerModel from "#models/employer.model.js";
import brancheModel from "#models/branche.model.js";

import { etablissementByUserAdmin } from "./etablissement.service.js";

export const brancheUser = async (id, user) => {
  if (user.role === "admin") return await brancheUserAdmin(id, user);
  return await brancheUserEmployer(id, user);
};
const brancheUserAdmin = async (id, user) => {
  const etablissement = await etablissementByUserAdmin(user);
  const branche = await brancheModel.find({
    _id: id,
    etablissement: etablissement._id,
  });
  if (branche.length > 0) return true;
  return false;
};
const brancheUserEmployer = async (id, user) => {
  const employer = await employerModel.findOne({ _id: user._id, branche: id });
  if (!employer) return false;
  return true;
};
