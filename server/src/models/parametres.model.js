import mongoose from "mongoose";

const parametresShema = mongoose.Schema(
  {
    etablissement: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Etablissement",
    },

    tauxMajourationHeuresSupp: {
      one: {
        type: mongoose.Types.Decimal128,
        default: 75,
        get: getCosts,
      },
      tow: {
        type: mongoose.Types.Decimal128,
        default: 100,
        get: getCosts,
      },
    },
    salaryMin: {
      type: mongoose.Types.Decimal128,
      default: 416.6,
      get: getCosts,
    },
    bonus: [
      mongoose.Schema(
        {
          label: { type: String, required: true },
          amount: {
            type: mongoose.Types.Decimal128,
            required: true,
            get: getCosts,
          },
        },
        {
          toObject: { getters: true, virtuals: true },
          toJSON: { getters: true, virtuals: true },
        }
      ),
    ],
    retenue: [
      mongoose.Schema(
        {
          label: { type: String, required: true },
          taux: {
            type: mongoose.Types.Decimal128,
            default: null,
            get: getCosts,
          },
          amount: {
            type: mongoose.Types.Decimal128,
            default: null,
            get: getCosts,
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
        {
          toObject: { getters: true, virtuals: true },
          toJSON: { getters: true, virtuals: true },
        }
      ),
    ],
  },
  {
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
  }
);

function getCosts(value) {
  console.log(value);
  if (typeof value !== "undefined" && value) {
    return parseFloat(value.toString());
  }
  return value;
}
const parametresModel = mongoose.model("Parametres", parametresShema);

export default parametresModel;
