// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { DataLayerEventType } from "./types/types.ts";
import * as z from "zod/v4";

// GOAL: Store events, send back failure or success so FE event buffer service can process
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// ZOD schema validation
const offerOpenSchema = z.object({
  eventType: z.literal('offer_open'),
  timeStamp: z.number(),
  productId: z.number(),
  title: z.string(),
  category: z.string(),
  price: z.number(),
})

const pageViewSchema = z.object({
  eventId: z.string(),
  eventType: z.literal('page_view'),
  timeStamp: z.number(),
  location: z.string(),
 
})

type OfferOpenEvent = z.infer<typeof offerOpenSchema>;
type PageViewEvent = z.infer<typeof pageViewSchema>;
type AcceptedEventTypes = {
  eventType: 'offer_open' | 'page_view'
} 

// Next: implement POSTGRES for database
const events: DataLayerEventType[] = [];
const failedEvents: any[] = []
console.log('events', events)
console.log('failedEvents', failedEvents)

// const failedEventAnalysisService = () => {
//   failedEvents.map((event) => {
//     return {
//       event.
//     }
//   })
// }

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the event backend service!");
});

// LEFT OFF: need to fix ZOD to work correctly with failed and successfull events - type issue on success for some reason
app.post("/events", (_req, res) => {
  try {
    console.log('_req.body', _req.body)
   
  
   _req.body.forEach((event: AcceptedEventTypes ) => {
    // First we check specifically for event types that we accept - offer_open, page_view, returning an error if they don't pass validation, otherwise sending to event list.
   // Second - we also pick up unknown event types, those are sent to failedEvents, to be analyzed and fixed? 

      console.log('event***', event)
     
      if (event.eventType === 'offer_open') {
        const result = offerOpenSchema.safeParse(event);
        console.log('OFFER OPEN ^^^ result', result)
        if (result.success){
          events.push(result.data);
        } else {
          console.warn(`Offer open event failed validation:`, result.error);
          failedEvents.push(event);
        }
      } 
      
      else if (event.eventType === 'page_view') {
        const result = pageViewSchema.safeParse(event);
        console.log('PAGE-VIEW OPEN *** result', result)
        if (result.success) {
          events.push(result.data);
        } else {
          console.warn(`Page view event failed validation:`, result.error);
          failedEvents.push(event);
        }
      }

      else {
        console.warn(`Unknown event type: ${event.eventType}`);
        failedEvents.push(event);
        console.log('failedEvents', failedEvents)
      }
    });
    
    
    // events.push(..._req.body);
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
