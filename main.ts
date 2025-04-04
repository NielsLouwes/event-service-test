// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 8000;

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the event backend service!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
