"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEvent = exports.createEvent = exports.getAllEvents = void 0;
const event_1 = __importDefault(require("../models/event"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, isAdmin } = req.user;
    const { timetableID } = req.params;
    const events = yield event_1.default.find({ userID: userID, timetableID: timetableID });
    res.status(http_status_codes_1.StatusCodes.OK).json(events);
});
exports.getAllEvents = getAllEvents;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: username, userID, isAdmin } = req.user;
    const { timetableID } = req.params;
    const { name: eventname, startTime, endTime } = req.body;
    const event = yield event_1.default.create({
        name: eventname,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        username,
        userID,
        timetableID,
    });
    res.json(event);
});
exports.createEvent = createEvent;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, isAdmin } = req.user;
    const { eventID } = req.params;
    const event = yield event_1.default.findOne({ _id: eventID, userID });
    if (!event) {
        throw new errors_1.NotFoundError(`Event with ID ${eventID} not found`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(event);
});
exports.getEvent = getEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, isAdmin } = req.user;
    const { eventID } = req.params;
    const { name: eventname, startTime, endTime } = req.body;
    const event = yield event_1.default.findByIdAndUpdate({ _id: eventID, userID }, { name: eventname, startTime, endTime }, { new: true, runValidators: true });
    if (!event) {
        throw new errors_1.NotFoundError(`Event with ID ${eventID} not found`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(event);
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, isAdmin } = req.user;
    const { eventID } = req.params;
    const { name: eventname, startTime, endTime } = req.body;
    const event = yield event_1.default.findOneAndDelete({ _id: eventID, userID });
    if (!event) {
        throw new errors_1.NotFoundError(`Event with ID ${eventID} not found`);
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(`Event with ID ${eventID} successfully deleted!`);
});
exports.deleteEvent = deleteEvent;
