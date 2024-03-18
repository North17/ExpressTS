import { Response } from "express";
import Event from "../models/event";
import { AuthRequest } from "../types";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

const processEvent = (isAdmin: boolean, event: any) => {
  return isAdmin
    ? event
    : {
        name: event.name,
        startTime: event.startTime,
        endTime: event.endTime,
        timetableID: event.timetableID,
        _id: event._id,
      };
};

const getAllEvents = async (req: AuthRequest, res: Response) => {
  const { userID, isAdmin } = req.user!;
  const { timetableID } = req.params;
  const events = await Event.find({ userID: userID, timetableID: timetableID });
  const processedEvents = events.map((event) => processEvent(isAdmin, event));
  res.status(StatusCodes.OK).json(processedEvents);
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
  const processedEvent = processEvent(isAdmin, event);
  res.status(StatusCodes.OK).json(processedEvent);
};

const getEvent = async (req: AuthRequest, res: Response) => {
  const { userID, isAdmin } = req.user!;
  const { eventID } = req.params;
  const event = await Event.findOne({ _id: eventID, userID });
  if (!event) {
    throw new NotFoundError(`Event with ID ${eventID} not found`);
  }
  const processedEvent = processEvent(isAdmin, event);
  res.status(StatusCodes.OK).json(processedEvent);
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
  const processedEvent = processEvent(isAdmin, event);
  res.status(StatusCodes.OK).json(processedEvent);
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
