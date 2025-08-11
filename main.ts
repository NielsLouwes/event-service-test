// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { validationMiddleWare } from "./src/middleware/validation.ts";
import { eventController } from "./src/controllers/eventController.ts";

// GOAL: Store events, send back failure or success so FE event buffer service can process
const app = express();
const port = 3002;

const allowedOrigins = ["http://localhost:3000"]; 

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
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
app.options("*", cors(corsOptions));
app.use(express.json());

// DB ?

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the event backend service!");
});

app.post("/events", validationMiddleWare,  (req, res) => {
  const result = eventController(req.body)
  if (!result) return res.status(500).json({ error: 'Processing failed' });
  const { successfulEventCount,failedEventCount, totalEvents } = result;
  
   let statusCode = 200;
   let message = "OK";

  
   if (failedEventCount === totalEvents) {
    statusCode = 400
    message = "All events failed validation"
   } else if (failedEventCount > 0) {
    statusCode = 207
    message = "Partial success, some events failed"
   }
   
  res.status(statusCode).json({
    message: message,
    summary: {
    total: totalEvents,
    successful: successfulEventCount,
    failed: failedEventCount
    }
  })
   console.log("result", result);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



