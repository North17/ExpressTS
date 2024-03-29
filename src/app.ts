import express, { Request, Response } from "express";
import "express-async-errors";
import connectDB from "./db/connect";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
const xss = require("xss-clean");
import rateLimit from "express-rate-limit";

import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import timetableRouter from "./routes/timetables";

import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import authenticationMiddleware from "./middleware/authentication";
import adminOnlyMiddleware from "./middleware/admin-only";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routers
app.use("/auth", authRouter);

app.use(authenticationMiddleware);

app.use("/timetables", timetableRouter);

app.use(adminOnlyMiddleware);

app.use("/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "");
    console.log("Connected to database");
    app.listen(port || 3000, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log("Something went wrong");
  }
};

start();
