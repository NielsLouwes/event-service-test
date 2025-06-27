// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "express";
import cors from "npm:cors";
import { DataLayerEventType } from "./types/types.ts";
import * as z from "zod/v4";

// GOAL: Store events, send back failure or success so FE event buffer service can process
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// ZOD schema validation
const offerOpenSchema = z.object({
  ['eventType']: z.string(),
  ['timeStamp']: z.number(),
  ['id']: z.string(),
  ['title']: z.string(),
  ['category']: z.string(),
  ['price']: z.number(),
})

const pageViewSchema = z.object({
  ['eventType']: z.string(),
  ['timeStamp']: z.number(),
  ['location']: z.string(),
  ['id']: z.string(),
})

type OfferOpenEvent = z.infer<typeof offerOpenSchema>;
type PageViewEvent = z.infer<typeof pageViewSchema>;

// Next: implement POSTGRES for database
const events: DataLayerEventType[] = [];

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the event backend service!");
});

// LEFT OFF: need to fix ZOD to work correctly with failed and successfull events - type issue on success for some reason
app.post("/events", (_req, res) => {
  try {
    console.log('_req.body', _req.body)
    const failedEvents: DataLayerEventType[] = []
  
   _req.body.map((event) => {
      console.log('event***', event)
      if (event.eventType === 'offer-open'){
        const result = offerOpenSchema.parse(event);
        if (result.success){
          events.push(result.data);
        }
      } 
      
      if (event.eventType === 'page-view'){
        const result = pageViewSchema.parse(event);
        if (result.success){
          failedEvents.push(result.data);
        }
      }
    })
    
    
    events.push(..._req.body);
    // add validation with ZOD, schema validation, check exact error number (4xx)

    res.status(200).json({
      message: "OK",
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
