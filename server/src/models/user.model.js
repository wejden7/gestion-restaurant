import mongoose from "mongoose";

const userShema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  etablissement: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Etablissement",
  },
  password: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: null,
  },
  createdDate: { type: Date, default: new Date() },
  updatedDate: { type: Date, default: new Date() },
});

const userModel = mongoose.model("User", userShema);

export default userModel;
