import express, { Request, Response, NextFunction } from "express";
import httpError from "http-errors";
import path from "path";

import cookieParser from "cookie-parser";

import logger from "morgan";
import { router } from "./src/routes";

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(httpError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500);
  res.json(err);
});

export default app;
