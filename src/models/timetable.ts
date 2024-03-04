import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a timetable name"],
      minLength: 3,
      maxLength: 15,
    },
    username: {
      type: String,
      required: [true, "Please provide name"],
      minLength: 3,
      maxLength: 20,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Timetable = mongoose.model("Timetable", TimetableSchema);

export default Timetable;
