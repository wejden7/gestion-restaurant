import employerModel from "#models/employer.model.js";

export const AuthorizationMiddleware = async (req, res, next) => {
  console.log("Authorization middleware");
  let { method, url, originalUrl, user } = req;

  if (user.role === "admin") return next();
  const employer = await employerModel
    .findById(user._id)
    .populate([
      { path: "post", populate: { path: "permission" } },
      { path: "branche" },
    ]);

  const { permission } = employer.post;
  var newUrl = url.split("/");
  if (newUrl.length === 3) {
    newUrl[2] = ":id";
    url = newUrl.join("/");
  }

  const permissionExiste = permission.filter(
    (item, index) => item.method === method && item.url === url
  );

  if (permissionExiste.length === 0) {
    return next("not authorized");
  } else {
    return next();
  }
};

export const AuthorizationAdminMiddleware = async (req, res, next) => {
  console.log("Authorization middleware");
  const { method, url, originalUrl, user } = req;

  if (user.role === "admin") return next();

  return next("not authorized");
};
