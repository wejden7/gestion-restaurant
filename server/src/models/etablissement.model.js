import mongoose from "mongoose";

const etablissementShema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
});

const etablissementModel = mongoose.model("Etablissement", etablissementShema);

export default etablissementModel;
