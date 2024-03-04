import { Response } from "express";
import Event from "../models/event";
import { AuthRequest } from "../types";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

const getAllEvents = async (req: AuthRequest, res: Response) => {
  const { userID, isAdmin } = req.user!;
  const { timetableID } = req.params;
  const events = await Event.find({ userID: userID, timetableID: timetableID });
  res.status(StatusCodes.OK).json(events);
};

const createEvent = async (req: AuthRequest, res: Response) => {
  const { name: username, userID, isAdmin } = req.user!;
  const { timetableID } = req.params;
  const { name: eventname, startTime, endTime } = req.body;
  const event = await Event.create({
    name: eventname,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    username,
    userID,
    timetableID,
  });
  res.json(event);
};

const getEvent = async (req: AuthRequest, res: Response) => {
  const { userID, isAdmin } = req.user!;
  const { eventID } = req.params;
  const event = await Event.findOne({ _id: eventID, userID });
  if (!event) {
    throw new NotFoundError(`Event with ID ${eventID} not found`);
  }
  res.status(StatusCodes.OK).json(event);
};

const updateEvent = async (req: AuthRequest, res: Response) => {
  const { userID, isAdmin } = req.user!;
  const { eventID } = req.params;
  const { name: eventname, startTime, endTime } = req.body;
  const event = await Event.findByIdAndUpdate(
    { _id: eventID, userID },
    { name: eventname, startTime, endTime },
    { new: true, runValidators: true }
  );
  if (!event) {
    throw new NotFoundError(`Event with ID ${eventID} not found`);
  }
  res.status(StatusCodes.OK).json(event);
};

const deleteEvent = async (req: AuthRequest, res: Response) => {
  const { userID, isAdmin } = req.user!;
  const { eventID } = req.params;
  const { name: eventname, startTime, endTime } = req.body;
  const event = await Event.findOneAndDelete({ _id: eventID, userID });
  if (!event) {
    throw new NotFoundError(`Event with ID ${eventID} not found`);
  }
  res
    .status(StatusCodes.OK)
    .json(`Event with ID ${eventID} successfully deleted!`);
};

export { getAllEvents, createEvent, getEvent, updateEvent, deleteEvent };
