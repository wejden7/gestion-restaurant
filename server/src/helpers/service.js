import Jwt from "jsonwebtoken";
import moment from "moment-timezone";

import employerModel from "#models/employer.model.js";
import brancheModel from "#models/branche.model.js";
import zoneModel from "#models/zone.model.js";
import userModel from "#models/user.model.js";
import postModel from "#models/post.model.js";

export const createToken = (user) => {
  const payload = {
    username: user.name,
    email: user.email,
    role: "admin",
    id: user._id,
  };
  return Jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "1d" });
};
export const createTokenEmplyer = (employer) => {
  const payload = {
    username: employer.name,
    email: employer.userName,
    role: "employer",
    id: employer._id,
  };
  return Jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "2h" });
};

export const randomString = (len, charSet) => {
  charSet =
    charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var randomString = "";
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

export const durationHourUpdate = (date) => {
  const now = moment(date); //todays date
  const end = moment(new Date()); // another date
  const duration = moment.duration(end.diff(now));
  return duration.asHours();
};

export const etablissementByUser = async (user) => {
  if (user.role === "admin") return await etablissementByUserAdmin(user);
  return await etablissementByUserEmployer(user);
};
const etablissementByUserAdmin = async ({ _id }) => {
  const user = await userModel.findById(_id).populate("etablissement");

  const { etablissement } = user;
  return etablissement;
};
const etablissementByUserEmployer = async ({ _id }) => {
  const employer = await employerModel.findById(_id);
  const { branche } = employer;
  const branche_ = await brancheModel
    .findById(branche)
    .populate("etablissement");
  const { etablissement } = branche_;

  return etablissement;
};

//* function port ont parameter id branche test si asosoie a sette user
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

//*
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

//*

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
