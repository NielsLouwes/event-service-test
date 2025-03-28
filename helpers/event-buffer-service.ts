import { DataLayerEventType } from "./events";

export const eventBufferService = (queue: DataLayerEventType[]) => {
  // it will accept events from eventQueue
  // think about failed batches of events
  // what happens to new events after 5 are reached?

  // when 5 events are reached , we send event batch to BE
  const queueLength = 5;

  if (queue.length === queueLength) {
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

  //   if (!res) {
  //     console.log("data FAILED to send to BE");
  //   }
};
