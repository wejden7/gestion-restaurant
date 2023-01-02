import mongoose from "mongoose";

const etablissementShema = mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const etablissementModel = mongoose.model("Etablissement", etablissementShema);

export default etablissementModel;
