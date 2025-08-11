import { DataLayerEventType } from "../../types/types.ts";
import { failedEvents } from "../services/failedEventService.ts";
import { AcceptedEventTypes } from "../types/eventTypes.ts";

import { offerOpenSchema, pageViewSchema } from "../validators/EventSchemas.ts";

// TO DO: return totalEvents, success, failed back to main.ts, then let the route handle hsttp responses
export const eventController = (requestBody) => {
    const events: DataLayerEventType[] = [];
    let successfulEventCount = 0;
    let failedEventCount = 0;
    let totalEvents: number = requestBody.length

        try {
            requestBody.forEach((event: AcceptedEventTypes) => {
            console.log('event***', event)
            
            if (event.eventType === 'offer_open') {
            const result = offerOpenSchema.safeParse(event);

            if (result.success){
                events.push(result.data);
                successfulEventCount++
            } else {
                console.warn(`Offer open event failed validation:`, result.error);
                failedEvents.push(event);
                failedEventCount++
            }
        } 
        
        else if (event.eventType === 'page_view') {
        const result = pageViewSchema.safeParse(event);
    
        if (result.success) {
            events.push(result.data);
            successfulEventCount++
        } else {
            console.warn(`Page view event failed validation:`, result.error);
            failedEvents.push(event);
            failedEventCount++
        }
        }

        else {
            console.warn(`Unknown event type: ${event.eventType}`);
            failedEvents.push(event);
            failedEventCount++
            }
        });

        return { successfulEventCount, failedEventCount, totalEvents }

       
    } catch (error) {
        console.error("Error processing event:", error);
    }
}
