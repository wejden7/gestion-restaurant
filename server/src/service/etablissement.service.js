import employerModel from "#models/employer.model.js";
import userModel from "#models/user.model.js";
import etablissementModel from "#models/etablissement.model.js";
import brancheModel from "#models/branche.model.js";
import zoneModel from "#models/zone.model.js";

import parametresModel from "#models/parametres.model.js";
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

export const createDefaultEtablissement = async () => {
  const etablissement = await etablissementModel.create({
    label: "restaurant",
  });
  const branche = await brancheModel.create({
    label: "restaurant 1",
    etablissement: etablissement._id,
  });
  const zone = await zoneModel.create({
    label: "zone1",
    branche: branche._id,
  });
  const parametre = await parametresModel.create({ etablissement: etablissement._id });
  return etablissement;
};
