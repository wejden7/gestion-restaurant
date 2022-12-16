import mongoose from "mongoose";

const presenceShema = mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Employer",
  },
  presence: [
    {
      date: {
        type: Date,
        required: true,
      },
      hourWorked: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: [],
        required: true,
      },
    },
  ],
});
const presenceModel = mongoose.model("Presence", presenceShema);

export default presenceModel;
