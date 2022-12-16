import employerModel from "#models/employer.model.js";
import brancheModel from "#models/branche.model.js";
import zoneModel from "#models/zone.model.js";

import { etablissementByUserAdmin } from "#service/etablissement.service.js";

export const zoneUser = async (id, user) => {
  if (user.role === "admin") return await zoneUserAdmin(id, user);
  return await zoneUserEmployer(id, user);
};
const zoneUserAdmin = async (id, user) => {
  const etablissement = await etablissementByUserAdmin(user);
  const branches = await brancheModel
    .find({ etablissement: etablissement._id })
    .select("_id");
  var newtab = [];
  branches.map((item) => newtab.push(item._id));
  const zone = await zoneModel.findOne({ _id: id, branche: { $in: newtab } });
  if (!zone) return false;
  return true;
};
const zoneUserEmployer = async (id, user) => {
  const { branche } = await employerModel.findOne({ _id: user._id });
  const zone = await zoneModel.findOne({ _id: id, branche: branche });
  if (!zone) return false;
  return true;
};

export const deleteZoneNotExite = async (zones, id) => {
  try {
    const zonesExiste = zones.filter((item) => item._id);
    await zoneModel.deleteMany({
      _id: { $nin: zonesExiste },
      branche: id,
    });
  } catch (error) {}
};

export const createNewZone = async (zones, id) => {
  try {
    const zonesNew = zones.filter((item) => !item._id);
    console.log(zonesNew);
    for await (let zone of zonesNew) {
      await zoneModel.create({ label: zone.label, branche: id });
    }
  } catch (error) {}
};

export const updateNewZone = async (zones) => {
  try {
    const zonesNew = zones.filter((item) => item._id);
    console.log(zonesNew);
    for await (let zone of zonesNew) {
      await zoneModel.findByIdAndUpdate(
        { _id: zone._id },
        { label: zone.label }
      );
    }
  } catch (error) {}
};
