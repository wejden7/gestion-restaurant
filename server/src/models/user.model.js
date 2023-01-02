import mongoose from "mongoose";

const userShema = mongoose.Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const userModel = mongoose.model("User", userShema);

export default userModel;
