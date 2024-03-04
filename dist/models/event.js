"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../errors");
const EventSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Types.ObjectId,
        required: [true, "Please provide userID"],
        ref: "User",
    },
    timetableID: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, "Please provide timetableID"],
        ref: "Timetable",
    },
});
// Checks if start time is before end time
EventSchema.pre("save", function (next) {
    const startTime = this.startTime;
    const endTime = this.endTime;
    const isValid = endTime.getTime() - startTime.getTime() >= 0;
    if (!isValid) {
        throw new errors_1.BadRequestError("End time cannot be before start time");
    }
    next();
});
const Event = mongoose_1.default.model("Event", EventSchema);
exports.default = Event;
