import express from "express";
import {
  createTimetable,
  deleteTimetable,
  getAllTimetables,
  getTimetable,
  updateTimetable,
} from "../controllers/timetables";

import eventRouter from "./events";

const router = express.Router();

router.use("/:timetableID/events", eventRouter);

router.route("/").get(getAllTimetables).post(createTimetable);
router
  .route("/:timetableID")
  .get(getTimetable)
  .patch(updateTimetable)
  .delete(deleteTimetable);

export default router;
