1. Create deno BE that will store events.
2. BONUS - create 'popular products' - slider
   - if rating above something, mark that product as "popular"
   - the slider should show just popular items first, but then the rest of the products

left off: added popular tag, now can use that to first render those, then render the rest. Use that to create a slideshow.

3. Put API URL in secret (.env)
4. Create AI models for clothes (https://lalaland.ai/)
5. show product name in url - so that pageviews get a better idea of what we are landing on.

## Event Buffer Service

1. Create deno BE that accepts events
2. Make sure BE responds with success or failure messsage so that service can update the eventQueue accordingly
3. If call to BE and storing of data fails, then store the events in a backup arr and retry every so often (think about stale requests that are X minutes/hours old, just throw them away.
   )
4. We are implementing first verison of more then > 4 events to send that batch to BE
5. Think about a time interval where the service should recheck if 4 was reached.
6. Write tests

## LEFT OFF

1. 404 error when sending events to BE - send 5 events and look into ths issue - DONE
2. need timestamp from FE on each event, but also on the event itself? - check that timestamp worked
3. Do we create a new type for BE? date.now for the batch?
   {events: [eventsQueue.slice(0m5), timestamp: date.now()]}
4. Created batching and failed event logic, need to remove batched events from eventQueue - DONE
