import { DataLayerEventType } from "./events";

const eventQueue: DataLayerEventType[] = [];
const queueLength = 5;

export const eventBufferService = (event: DataLayerEventType) => {
  eventQueue.push(event);
  console.log("new event pushed!");
  console.log("eventQueue", eventQueue);

  if (eventQueue.length == queueLength) {
    // send eventBatch to BE
    // const eventBatch = queue.slice(0, queueLength);
    console.log(`Queuelength of ${queueLength} reached, sending to BE`);
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
