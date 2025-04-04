import { DataLayerEventType } from "./events";

const eventQueue: DataLayerEventType[] = [];
const queueLength = 5;

// we are sending all events over, not slicing it and storing the remainder in buffer to keep collection events.

export const eventBufferService = async (event: DataLayerEventType) => {
  eventQueue.push(event);
  console.log("new event pushed!");
  console.log("eventQueue", eventQueue);

  if (eventQueue.length == queueLength) {
    // send eventBatch to BE
    // const eventBatch = queue.slice(0, queueLength);
    console.log(`Queuelength of ${queueLength} reached, sending to BE`);

    try {
      const response = await fetch("/events", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(eventQueue),
      });

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
