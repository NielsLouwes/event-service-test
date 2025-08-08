import * as z from "zod/v4";

export const offerOpenSchema = z.object({
    eventType: z.literal('offer_open'),
    timeStamp: z.number(),
    productId: z.number(),
    title: z.string(),
    category: z.string(),
    price: z.number(),
  })
  
  export const pageViewSchema = z.object({
    eventId: z.string(),
    eventType: z.literal('page_view'),
    timeStamp: z.number(),
    location: z.string(),
   
  })
