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
exports.deleteTimetable = exports.updateTimetable = exports.getTimetable = exports.createTimetable = exports.getAllTimetables = void 0;
const timetable_1 = __importDefault(require("../models/timetable"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const processTimetable = (isAdmin, timetable) => {
    return isAdmin ? timetable : { name: timetable.name, _id: timetable._id };
};
const getAllTimetables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, isAdmin } = req.user;
    const queryObject = isAdmin ? {} : { userID: userID };
    const timetables = yield timetable_1.default.find(queryObject);
    const processedTimetables = timetables.map((timetable) => processTimetable(isAdmin, timetable));
    res.status(http_status_codes_1.StatusCodes.OK).json(processedTimetables);
});
exports.getAllTimetables = getAllTimetables;
const createTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, name: userName, isAdmin } = req.user;
    const timetable = yield timetable_1.default.create(Object.assign(Object.assign({}, req.body), { username: userName, userID: userID }));
    const processedTimetable = processTimetable(isAdmin, timetable);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(processedTimetable);
});
exports.createTimetable = createTimetable;
const getTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isAdmin, userID } = req.user;
    const { timetableID } = req.params;
    let queryObject = isAdmin ? {} : { userID: userID };
    const timetable = yield timetable_1.default.findOne(Object.assign(Object.assign({}, queryObject), { _id: timetableID }));
    if (!timetable) {
        throw new errors_1.NotFoundError(`Timetable with ID ${timetableID} not found`);
    }
    const processedTimetable = processTimetable(isAdmin, timetable);
    res.status(http_status_codes_1.StatusCodes.OK).json(processedTimetable);
});
exports.getTimetable = getTimetable;
const updateTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { timetableID } = req.params;
    const { userID, isAdmin } = req.user;
    let queryObject = isAdmin ? {} : { userID: userID };
    const timetable = yield timetable_1.default.findByIdAndUpdate(Object.assign(Object.assign({}, queryObject), { _id: timetableID }), Object.assign({}, req.body), { new: true, runValidators: true });
    if (!timetable) {
        throw new errors_1.NotFoundError(`Timetable with ID ${timetableID} not found`);
    }
    const processedTimetable = processTimetable(isAdmin, timetable);
    res.status(http_status_codes_1.StatusCodes.OK).json(processedTimetable);
});
exports.updateTimetable = updateTimetable;
const deleteTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { timetableID } = req.params;
    const { userID, isAdmin } = req.user;
    let queryObject = isAdmin ? {} : { userID: userID };
    const timetable = yield timetable_1.default.findOneAndDelete(Object.assign(Object.assign({}, queryObject), { _id: timetableID }));
    if (!timetable) {
        throw new errors_1.NotFoundError(`Timetable with ID ${timetableID} not found`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: `Timetable with ID ${timetableID} successfully deleted!`,
    });
});
exports.deleteTimetable = deleteTimetable;
