import presenceModel from "#models/presence.model.js";
import moment from "moment-timezone";
import { Socket } from "socket.io";
// * Import service
import {} from "#helpers/service.js";
import { employersByUser } from "#service/employer.service.js";
import {
  checkDayPresence,
  createPresence,
  updatePresence,
} from "#service/presence.service.js";

// * Import Express Validation
import { validationResult } from "express-validator";

export const errorHandler = async (error, req, res, next) => {
  return res.status(500).json({
    message: "La connexion a échouée, merci de réessayer",
    errors: error,
  });
};

export const addPresenceController = async (req, res, next) => {
  const { _id, role } = req.user;
  try {
    if (role === "admin") return next("Admin dont be accesse");
    const date = moment.tz(new Date(), "Africa/Tunis").startOf("day").format();
    const start_Work = moment.tz(new Date(), "Africa/Tunis").format();
    const end_Work = moment
      .tz(new Date(), "Africa/Tunis")
      .add(8, "hours")
      .format();

    const existe = await await presenceModel.findOne({
      employer: _id,
      presence: { $elemMatch: { date: date } },
    });

    if (existe) return next("We are checked go to Gerent");
    const newPresence = {
      date: date,
      timeStart: start_Work,
      timeEnd: end_Work,
      status: "Work",
      commit: "je presant",
    };
    const presence = await createPresence(_id, newPresence);

    return res.status(200).json({
      message: "Cheked successfully",
      data: true,
    });
  } catch (error) {
    return next(error.message);
  }
};
export const checkMePresanceController = async (req, res, next) => {
  const { _id, role } = req.user;
  try {
    if (role === "admin") return next("Admin dont be accesse");
    const date = moment.tz(new Date(), "Africa/Tunis").startOf("day").format();

    const existe = await await presenceModel.findOne({
      employer: _id,
      presence: { $elemMatch: { date: date } },
    });

   if (existe) {
    var presance = existe.presence.find((item) =>
      moment(item.date).isSame(date)
    );
}
    return res.status(200).json({
      message: "Cheked successfully",
      data: presance?.status || null,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const quitePresenceController = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const date = moment.tz(new Date(), "Africa/Tunis").startOf("day").format();
    const end_Work = moment.tz(new Date(), "Africa/Tunis").format();

    const presence = await presenceModel.findOne({
      employer: _id,
      presence: { $elemMatch: { date: date } },
    });

    if (!presence) return next("date not existe ");

    let presence_of_day = await presence.presence.find((item) =>
      moment(date).isSame(item.date)
    );
    if (presence_of_day.status != "Work")
      return next("you are not peresent for quite");

    presence_of_day = updatePresence(presence_of_day,{
      timeEnd: end_Work,
      status: "Quite",
      commit: "JE Quite",
    });

    await presence.save();

    return res.status(200).json({
      message: " quite successfully",
      data: presence,
    });
  } catch (error) {
    return next(error.message);
  }
};

export const updatePresenceController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);

  const { id } = req.params;

  try {
    const presence = await presenceModel.findOne({
      presence: { $elemMatch: { _id: id } },
    });

    let presence_of_day = await presence.presence.find((p) => p._id.equals(id));
    presence_of_day = updatePresence(presence_of_day, req.body);

    await presence.save();

    return res.status(200).json({
      message: "updater sucssed",
      data: presence_of_day,
    });
  } catch (error) {
    return next(error?.message);
  }
};

export const createPresenceController = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(err.errors);
  const { id } = req.params;
  const { date, timeStart, timeEnd, status, commit } = req.body;
  console.log(req.body);
  console.log(id);
  try {
    const presence = await createPresence(id, req.body);
    return res.status(200).json({
      message: "updater sucssed",
      data: presence,
    });
  } catch (error) {
    return next(error?.message);
  }
};

export const checkPresenceController = async (req, res, next) => {
  try {
    const employers = await employersByUser(req.user);
    await checkDayPresence(employers);
    const presence = await presenceModel.find({
      employer: { $in: employers },
    });
    return res.status(200).json({
      message: "create presence successfully",
      data: presence,
    });
  } catch (error) {
    return next(error.message);
  }
};
