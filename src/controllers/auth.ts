import { StatusCodes } from "http-status-codes";

import User from "../models/user";
import { Request, Response } from "express";
import { BadRequestError } from "../errors";

interface AuthBody {
  name?: string;
  password: string;
  email: string;
}

const register = async (req: Request, res: Response) => {
  const { email, name, password }: AuthBody = req.body;
  if (!email || !name || !password) {
    throw new BadRequestError("Please provide email, name and password");
  }
  //   ? email
  const user = await User.create({ ...req.body, isAdmin: false });
  //   @ts-ignore
  const token = user.createJWT() as string;

  res.status(StatusCodes.CREATED).json({
    //   @ts-ignore
    // ? Maybe refactor isAdmin?
    user: { name: user.name, email: user.email, isAdmin: user.isAdmin },
    token,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password }: AuthBody = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  //   ? email check

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Please enter valid credentials");
  }
  //   @ts-ignore
  const isPasswordCorrect: boolean = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Please enter valid credentials");
  }

  //   @ts-ignore
  const token = user.createJWT() as string;

  res.status(StatusCodes.OK).json({
    //   @ts-ignore
    user: { name: user.name, email: user.email, isAdmin: user.isAdmin },
    token,
  });
};

export { login, register };
