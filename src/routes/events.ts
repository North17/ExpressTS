import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "../controllers/events";

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllEvents).post(createEvent);
router.route("/:eventID").get(getEvent).patch(updateEvent).delete(deleteEvent);

export default router;
