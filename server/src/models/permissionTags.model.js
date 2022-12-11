import mongoose from "mongoose";

const permissionTagsShema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  method: {
    type: String,
    require: true,
    enum: ["POST", "PUT", "DELETE", "GET"],
  },
  url: {
    type: String,
    require: true,
  },
});

const permissionTagsModel = mongoose.model(
  "PermissionTags",
  permissionTagsShema
);

export default permissionTagsModel;
