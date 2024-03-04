import { Request, Response } from "express";
import User from "../models/user";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json(users);
};

const getUser = async (req: Request, res: Response) => {
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user) {
    throw new NotFoundError(`No user found with ID: ${userID}`);
  }
  res.status(StatusCodes.OK).json(user);
};

const updateUser = async (req: Request, res: Response) => {
  const { id: userID } = req.params;
  const user = await User.findByIdAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFoundError(`No user found with ID: ${userID}`);
  }
  res.status(StatusCodes.OK).json(user);
};

const deleteUser = async (req: Request, res: Response) => {
  const { id: userID } = req.params;
  const user = await User.findByIdAndDelete({ _id: userID });
  if (!user) {
    throw new NotFoundError(`No user found with ID: ${userID}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: `Successfully deleted user with ID: ${userID}` });
};

export { getAllUsers, getUser, updateUser, deleteUser };
