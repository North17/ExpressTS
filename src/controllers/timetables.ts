import { Request, Response } from "express";
import Timetable from "../models/timetable";
import { AuthRequest } from "../types";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

const processTimetable = (isAdmin: boolean, timetable: any) => {
  return isAdmin ? timetable : { name: timetable.name, _id: timetable._id };
};

const getAllTimetables = async (req: AuthRequest, res: Response) => {
  const { userID, isAdmin } = req.user!;
  const queryObject = isAdmin ? {} : { userID: userID };
  const timetables = await Timetable.find(queryObject);
  const processedTimetables = timetables.map((timetable) =>
    processTimetable(isAdmin, timetable)
  );

  res.status(StatusCodes.OK).json(processedTimetables);
};

const createTimetable = async (req: AuthRequest, res: Response) => {
  const { userID, name: userName, isAdmin } = req.user!;
  const timetable = await Timetable.create({
    ...req.body,
    username: userName,
    userID: userID,
  });
  const processedTimetable = processTimetable(isAdmin, timetable);
  res.status(StatusCodes.CREATED).json(processedTimetable);
};

const getTimetable = async (req: AuthRequest, res: Response) => {
  const { isAdmin, userID } = req.user!;
  const { timetableID } = req.params;
  let queryObject = isAdmin ? {} : { userID: userID };
  const timetable = await Timetable.findOne({
    ...queryObject,
    _id: timetableID,
  });
  if (!timetable) {
    throw new NotFoundError(`Timetable with ID ${timetableID} not found`);
  }
  const processedTimetable = processTimetable(isAdmin, timetable);
  res.status(StatusCodes.OK).json(processedTimetable);
};

const updateTimetable = async (req: AuthRequest, res: Response) => {
  const { timetableID } = req.params;
  const { userID, isAdmin } = req.user!;
  let queryObject = isAdmin ? {} : { userID: userID };
  const timetable = await Timetable.findByIdAndUpdate(
    {
      ...queryObject,
      _id: timetableID,
    },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!timetable) {
    throw new NotFoundError(`Timetable with ID ${timetableID} not found`);
  }
  const processedTimetable = processTimetable(isAdmin, timetable);
  res.status(StatusCodes.OK).json(processedTimetable);
};

const deleteTimetable = async (req: AuthRequest, res: Response) => {
  const { timetableID } = req.params;
  const { userID, isAdmin } = req.user!;
  let queryObject = isAdmin ? {} : { userID: userID };
  const timetable = await Timetable.findOneAndDelete({
    ...queryObject,
    _id: timetableID,
  });
  if (!timetable) {
    throw new NotFoundError(`Timetable with ID ${timetableID} not found`);
  }
  res.status(StatusCodes.OK).json({
    message: `Timetable with ID ${timetableID} successfully deleted!`,
  });
};

export {
  getAllTimetables,
  createTimetable,
  getTimetable,
  updateTimetable,
  deleteTimetable,
};
