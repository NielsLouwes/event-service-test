// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { DataLayerEventType } from "./types/types.ts";
import { AcceptedEventTypes } from "./src/types/types.ts";
import { offerOpenSchema, pageViewSchema } from "./src/validators/zod-schema.ts";
import { failedEvents } from "./src/services/failed-events.ts";
import { validationMiddleWare } from "./src/middleware/validation.ts";

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
const events: DataLayerEventType[] = [];
app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the event backend service!");
});

app.post("/events", (_req, res) => {
  try {
    console.log('_req.body', _req.body)
    const totalEvents = _req.body.length 
    let successfulEventCount = 0;
    let failedCount = 0;
    validationMiddleWare(_req.body, res);
   
   _req.body.forEach((event: AcceptedEventTypes) => {
    // First we check specifically for event types that we accept - offer_open, page_view, returning an error if they don't pass validation, otherwise sending to event list.
   // Second - we also pick up unknown event types, those are sent to failedEvents, to be analyzed and fixed? 

      console.log('event***', event)
     
      if (event.eventType === 'offer_open') {
        const result = offerOpenSchema.safeParse(event);
        console.log('OFFER OPEN ^^^ result', result)
        if (result.success){
          events.push(result.data);
          successfulEventCount++
        } else {
          console.warn(`Offer open event failed validation:`, result.error);
          failedEvents.push(event);
          failedCount++
        }
      } 
      
      else if (event.eventType === 'page_view') {
        const result = pageViewSchema.safeParse(event);
        console.log('PAGE-VIEW OPEN *** result', result)
        if (result.success) {
          events.push(result.data);
          successfulEventCount++
        } else {
          console.warn(`Page view event failed validation:`, result.error);
          failedEvents.push(event);
          failedCount++
        }
      }

      else {
        console.warn(`Unknown event type: ${event.eventType}`);
        failedEvents.push(event);
        failedCount++
        console.log('failedEvents', failedEvents)
      }
    });
 
    // below we handle status codes based on partial success, failure, and success
    let statusCode = 200;
    let message = "OK";

    if (failedCount === totalEvents) {
      statusCode = 400
      message = "All events failed validation"
    } else if (failedCount > 0) {
      statusCode = 207
      message = "Partial success, some events failed"
    }
    
   res.status(statusCode).json({
    message: message,
    summary: {
      total: totalEvents,
      successful: successfulEventCount,
      failed: failedCount
    }
   })
    console.log("events", events);
  } catch (error) {
    console.error("Error processing event:", error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



