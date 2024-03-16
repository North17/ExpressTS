import { NextFunction, Request, Response } from "express";
import { AuthRequest, JWTPayload } from "../types";
import { UnauthenticatedError } from "../errors";
import jwt from "jsonwebtoken";

const authenticationMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    // @ts-ignore
    const payload: JWTPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    if (err instanceof Error && err.name === "TokenExpiredError") {
      throw new UnauthenticatedError("Token expired");
    }
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default authenticationMiddleware;
