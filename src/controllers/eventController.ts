import { DataLayerEventType } from "../../types/types.ts";
import { failedEvents } from "../services/failedEventService.ts";
import { AcceptedEventTypes } from "../types/eventTypes.ts";

import { offerOpenSchema, pageViewSchema } from "../validators/EventSchemas.ts";

export const eventController = (requestBody, response) => {
    const events: DataLayerEventType[] = [];
    let successfulEventCount = 0;
    let failedCount = 0;
    let totalEvents = requestBody.length

        try {
            requestBody.map((event: AcceptedEventTypes) => {
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
        
    response.status(statusCode).json({
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

        response.status(500).json({
        error: "Server error",
        });
    }
}
