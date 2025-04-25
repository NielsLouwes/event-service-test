import { DataLayerEventType } from "./events";

const eventQueue: DataLayerEventType[] = [];
const failedEventQueue = [];
const queueLength = 5;

// we are sending all events over, not slicing it and storing the remainder in buffer to keep collection events.

export const eventBufferService = async (event: DataLayerEventType) => {
  eventQueue.push(event);
  console.log("new event pushed!");
  console.log("eventQueue", eventQueue);

  if (eventQueue.length == queueLength) {
    // send eventBatch to BE

    let eventBatch = eventQueue.slice(0, queueLength); // making a copy of the queue of size 5\

    // TODO: Update BE with eventBatch structure

    // const eventBatch = {
    //   events: eventQueue.slice(0, queueLength),
    //   batchTimestamp: Date.now(),
    // };
    console.log("eventBatch", eventBatch, eventBatch.length);
    console.log(`Queuelength of ${queueLength} reached, sending to BE`);

    try {
      const response = await fetch("http://localhost:3001/events", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(eventBatch),
      });
      console.log("response", response);

      // if failed to send events, push to new arr and empty batch arr
      if (!response.ok) {
        failedEventQueue.push(...eventBatch);
        eventQueue.splice(0, queueLength);
        eventBatch = [];
      }

      // if success, that means events were sent, we can empty batch and wait for new queue to reach 5 length

      if (response.ok) {
        console.log("events sent successfully - clearing eventBatch");
        eventQueue.splice(0, queueLength);
        eventBatch = [];
        console.log("new event batch", eventBatch);
        console.log("updated EventQueue - 5", eventQueue);
      }

      const result = await response.json();
      console.log("Event sent sucesfully", result);
    } catch (error) {
      console.error(error);
    }
  }

  // wait for 200 successfull response from BE
  // if res.ok
  //   if (res.ok) {
  //     console.log("data successfully sent to BE");
  //     // remove items from queue
  //   }
  console.log("");
  //   if (!res) {
  //     console.log("data FAILED to send to BE");
  //   }
};
