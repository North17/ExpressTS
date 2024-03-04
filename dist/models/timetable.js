"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TimetableSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
const Timetable = mongoose_1.default.model("Timetable", TimetableSchema);
exports.default = Timetable;
