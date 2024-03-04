"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_1 = require("../controllers/events");
const router = express_1.default.Router({ mergeParams: true });
router.route("/").get(events_1.getAllEvents).post(events_1.createEvent);
router.route("/:eventID").get(events_1.getEvent).patch(events_1.updateEvent).delete(events_1.deleteEvent);
exports.default = router;
