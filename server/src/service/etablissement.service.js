import employerModel from "#models/employer.model.js";
import brancheModel from "#models/branche.model.js";
import userModel from "#models/user.model.js";

export const etablissementByUser = async (user) => {
  if (user.role === "admin") return await etablissementByUserAdmin(user);
  return await etablissementByUserEmployer(user);
};
export const etablissementByUserAdmin = async ({ _id }) => {
  const user = await userModel.findById(_id).populate("etablissement");

  const { etablissement } = user;
  return etablissement;
};
export const etablissementByUserEmployer = async ({ _id }) => {
  const employer = await employerModel.findById(_id);
  const { branche } = employer;
  const branche_ = await brancheModel
    .findById(branche)
    .populate("etablissement");
  const { etablissement } = branche_;

  return etablissement;
};
