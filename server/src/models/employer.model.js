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
    require: true,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  codeLogin: {
    type: String,
    require: true,
  },
  timeWork: {
    start: {
      type: Number,
      require: true,
      min: min,
      max: max,
    },
    end: {
      type: Number,
      require: true,
      min: min,
      max: max,
    },
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Post",
  },
  branche: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Branche",
  },
});

const employeeModel = mongoose.model("Employer", employerShema);

export default employeeModel;
