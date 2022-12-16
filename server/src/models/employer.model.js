import mongoose from "mongoose";

const min = [
  0,
  "The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
];
const max = [
  24,
  "The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).",
];

const employerShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  codeLogin: {
    type: String,
    required: true,
  },
  timeWork: {
    start: {
      type: Number,
      required: true,
      min: min,
      max: max,
    },
    end: {
      type: Number,
      required: true,
      min: min,
      max: max,
    },
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  branche: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Branche",
  },
});

const employeeModel = mongoose.model("Employer", employerShema);

export default employeeModel;
