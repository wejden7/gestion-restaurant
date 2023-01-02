import employerModel from "#models/employer.model.js";
import brancheModel from "#models/branche.model.js";
import { etablissementByUserAdmin } from "#service/etablissement.service.js";
export const employerUser = async (id, user) => {
  if (user.role === "admin") return await employerUserAdmin(id, user);
  return await employerUserEmployer(id, user);
};
const employerUserAdmin = async (id, user) => {
  const etablissement = await etablissementByUserAdmin(user);
  const branches = await brancheModel
    .find({ etablissement: etablissement._id })
    .select("_id");
  var newtab = [];
  branches.map((item) => newtab.push(item._id));
  const employer = await employerModel.findOne({
    _id: id,
    branche: { $in: newtab },
  });
  if (!employer) return false;
  return true;
};
const employerUserEmployer = async (id, user) => {
  const { branche } = await employerModel.findOne({ _id: user._id });
  const employer = await employerModel.findOne({ _id: id, branche: branche });
  if (!employer) return false;
  return true;
};

export const employersByUser = async (user) => {
  if (user.role === "admin") return await employersByUserAdmin(user);
  return await employersByUserEmployer(user);
};

const employersByUserAdmin = async (user) => {
  const etablissement = await etablissementByUserAdmin(user);
  const branches = await brancheModel
    .find({ etablissement: etablissement._id })
    .select("_id");
  var newtab = [];
  branches.map((item) => newtab.push(item._id));
  let employer = await employerModel
    .find({
      branche: { $in: newtab },
    })
    .select("_id");
  employer = employer.map((item) => item._id);
  return employer;
};
const employersByUserEmployer = async (user) => {
  const { branche } = await employerModel.findOne({ _id: user._id });
  const employer = await employerModel.find({ branche: branche });

  return employer;
};
