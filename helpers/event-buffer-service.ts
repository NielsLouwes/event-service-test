import { DataLayerEventType } from "./events";

let eventQueue: DataLayerEventType[] = [];
const queueLength = 5;
const MAX_RETRIES: number = 3;

const sendEventBatch = async () => {
  const response = await fetch("http://localhost:3002/events", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(eventQueue),
  });

  return response;
}

// we are sending all events over, not slicing it and storing the remainder in buffer to keep collection events.

// TO DO
// better to add a UUID to events, then filter out the events that were sucessfully send to BE

export const eventBufferService = async (event: DataLayerEventType) => {
  eventQueue.push(event);
  console.log("new event pushed!");
  console.log("eventQueue", eventQueue);

  if (eventQueue.length == queueLength) {
    console.log(`Queuelength of ${queueLength} reached, sending to BE`);

    try {
      const response = await sendEventBatch()
      console.log('response', response)
      
      // if failed to send events, push to new arr and empty batch arr
      if (!response.ok) {
        console.warn("Issue sending events, trying again")

        const retryEvents = (attempts: number) => {
          if (attempts === 0){
                return
          }

          setTimeout(sendEventBatch, 200)
          console.log(`try number ${attempts}`)
          retryEvents(attempts - 1)
        }
        retryEvents(MAX_RETRIES)
      }
     

      // exponential backoff ) 2,4,8,16ms increasing in time
      // if success, that means events were sent, we can empty batch and wait for new queue to reach 5 length
     
        console.log("events sent successfully - clearing eventBatch");
        eventQueue.splice(0, queueLength);
        eventQueue = [];
        console.log("new event batch", eventQueue);
     

      const result = await response.json();
      console.log("Event sent sucesfully", result);
    } catch (error) {
      console.error(error);
      console.warn("Issue sending events, trying again")
      setTimeout(sendEventBatch, 200)
    }
  }
};

// good to check what pat of the batch is causing the failure in sending the eventBatch
// FE shoudl always receive response,ok, then habdle issue with events in the BE based, the BE should figure out where its going wrong.
