import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default CustomAPIError;
