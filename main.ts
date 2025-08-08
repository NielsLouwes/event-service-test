// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { DataLayerEventType } from "./types/types.ts";
import { AcceptedEventTypes } from "./src/types/eventTypes.ts";
import { offerOpenSchema, pageViewSchema } from "./src/validators/EventSchemas.ts";
import { failedEvents } from "./src/services/failedEventService.ts";
import { validationMiddleWare } from "./src/middleware/validation.ts";
import { eventController } from "./src/controllers/eventController.ts";

// GOAL: Store events, send back failure or success so FE event buffer service can process
const app = express();
const port = 3002;

const allowedOrigins = ["http://localhost:3000"]; 

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser tools
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["POST", "OPTIONS", "GET"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
// Handle preflight requests
app.options("*", cors(corsOptions));
app.use(express.json());


// Next: implement POSTGRES for database


app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the event backend service!");
});

app.post("/events", (_req, res) => {
  validationMiddleWare(_req.body, res);
  eventController(_req.body, res)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



