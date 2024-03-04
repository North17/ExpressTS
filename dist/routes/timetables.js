"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const timetables_1 = require("../controllers/timetables");
const events_1 = __importDefault(require("./events"));
const router = express_1.default.Router();
router.use("/:timetableID/events", events_1.default);
router.route("/").get(timetables_1.getAllTimetables).post(timetables_1.createTimetable);
router
    .route("/:timetableID")
    .get(timetables_1.getTimetable)
    .patch(timetables_1.updateTimetable)
    .delete(timetables_1.deleteTimetable);
exports.default = router;
