import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";
import User from "../models/user";
import { UnauthenticatedError } from "../errors";

const adminOnlyMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { isAdmin } = req.user!;
  if (!isAdmin) {
    throw new UnauthenticatedError("Route not authorized");
  }
  next();
};

export default adminOnlyMiddleware;
