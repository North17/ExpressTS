import { NextFunction, Request, Response } from "express";
import { CustomAPIError } from "../errors";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(StatusCodes.NOT_FOUND).json({ message: `Invalid ID` });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

export default errorHandlerMiddleware;
