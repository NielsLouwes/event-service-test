// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "express";
import cors from "npm:cors";
import { DataLayerEventType } from "./types/types.ts";

// GOAL: Store events, send back failure or success so FE event buffer service can process
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const events: DataLayerEventType[] = [];

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the event backend service!");
});

app.post("/events", (_req, res) => {
  try {
    // Log the incoming event for debugging

    events.push(..._req.body);

    res.status(200).json({
      message: "Events received successfully",
      eventCount: events.length,
    });
    console.log("events", events);
  } catch (error) {
    console.error("Error processing event:", error);

    res.status(500).json({
      error: "Failed to process event",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
