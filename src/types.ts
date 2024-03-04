import { Request } from "express";

export interface JWTPayload {
  userID: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export interface UserType {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
