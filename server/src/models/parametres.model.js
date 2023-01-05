import mongoose from "mongoose";

const parametresShema = mongoose.Schema({
  etablissement: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Etablissement",
  },

  tauxMajourationHeuresSupp: {
    1: {
      type: mongoose.Types.Decimal128,
      default: 75,
    },
    2: {
      type: mongoose.Types.Decimal128,
      default: 100,
    },
  },
  salaryMin: {
    type: mongoose.Types.Decimal128,
    default: 416.6,
  },
  bonus: [
    {
      label: { type: String, required: true },
      amount: {
        type: mongoose.Types.Decimal128,
        required: true,
      },
    },
  ],
  retenue: [
    {
      label: { type: String, required: true },
      taux: { type: mongoose.Types.Decimal128, default: null },
      amount: {
        type: mongoose.Types.Decimal128,
        default: null,
      },
      formule: {
        type: String,
        default: "m-10%|m-chf|m-sm",
      },
      for: { type: String, enum: ["employer", "Salarie"] },
      categaure: {
        type: Number,
        required: true,
        enum: [1, 2],
      },
    },
  ],
});

const parametresModel = mongoose.model("Parametres", parametresShema);

export default parametresModel;
