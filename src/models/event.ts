import mongoose from "mongoose";
import { BadRequestError } from "../errors";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide an event name"],
    minLength: 3,
    maxLength: 20,
  },
  startTime: {
    type: Date,
    required: [true, "Please provide a start time"],
  },
  endTime: {
    type: Date,
    required: [true, "Please provide a start time"],
  },
  username: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide userID"],
    ref: "User",
  },
  timetableID: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide timetableID"],
    ref: "Timetable",
  },
});

// Checks if start time is before end time
EventSchema.pre("save", function (next) {
  const startTime = this.startTime as Date;
  const endTime = this.endTime as Date;
  const isValid = endTime.getTime() - startTime.getTime() >= 0;
  if (!isValid) {
    throw new BadRequestError("End time cannot be before start time");
  }
  next();
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
