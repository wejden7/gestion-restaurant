import employerModel from "#models/employer.model.js";
import permissionTagsModel from "#models/permissionTags.model.js";

export const handleError = async (error, req, res, next) => {
  return res.status(500).json({
    message: "not Autorize",
    data: false,
    errors: error,
  });
};

export const autorizationController = async (req, res, next) => {
  console.log("Authorization middleware");
  let { user } = req;
  let permission;
  if (user.role === "admin") {
    permission = await permissionTagsModel.find();
  } else {
    const employer = await employerModel
      .findById(user._id)
      .populate([
        { path: "post", populate: { path: "permission" } },
        { path: "branche" },
      ]);

    permission = employer.post.permission;
  }

  return res.status(200).json({
    message: "Autorize",
    data: permission,
  });
};
