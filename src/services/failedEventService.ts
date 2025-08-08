export const failedEvents: any[] = []

const failedEventsService = () => {
    if (failedEvents.length > 0){ 
        failedEvents.forEach((failedEvent) => {
            return { 
                failedEvent
            }
        })
    }

    return null;
}

if (failedEvents.length > 0) console.log('failedEventAnalysis', failedEventsService())
