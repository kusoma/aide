module.exports = {
    createSchedule: () => {
        let [r, c] = [8, 24];
        let schedule = Array(r).fill().map(() => Array(c).fill(0));

        return schedule;
    },

    fillSchedule: (schedule, events) => {
        for (event of events) {
            const startDateISO = new Date(event.start.dateTime)
            const endDateISO = new Date(event.end.dateTime)
            const day = module.exports.dayDifference(startDateISO)

            if (startDateISO.getHours() < 8 || startDateISO.getHours() > 20) continue;

            let startTimeHours = startDateISO.getHours() + (startDateISO.getHours() - 16)
            let endTimeHours = endDateISO.getHours() + (endDateISO.getHours() - 16)

            if (startDateISO.getMinutes() > 30) startTimeHours += 1;

            if (endDateISO.getMinutes() > 30) endTimeHours += 1;

            for (let index = startTimeHours; index <= endTimeHours; index++) {
                schedule[day][index] = 1;
            }
        }
    },

    dayDifference: eventDate => {
        const today = new Date()
        eventDate = new Date(eventDate)

        return Math.abs(Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())) / (1000 * 60 * 60 * 24)));
    },

    scheduleEvents: (schedule, events) => {
        let scheduledEvents = [];
        let today = new Date()
        for (event of events) {
            let isScheduled = false
            for (day in schedule) {
                if (isScheduled) continue;
                for (interval in schedule[day]) {
                    // Do something with default study length
                    // let next = interval + 1
                    if (isScheduled) continue;
                    if (schedule[day][interval] == 0) {
                        schedule[day][interval] = 2;
                        
                        let hours = Math.floor(Number(interval)/2 + 8)

                        let minutes = '00'
                        if (interval % 2 == 1) {
                            minutes = '30'
                        }

                        let startDateTime = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getDate()}T${String(hours).padStart(2, '0')}:${minutes}:00`
                        console.log(startDateTime)
                        let scheduledEvent = {
                            summary: "Aide",
                            description: "Aide development",
                            start: {
                                dateTime: startDateTime,
                                timeZone: "America/Los_Angeles"
                            },
                            end: {
                                dateTime: startDateTime,
                                timeZone: "America/Los_Angeles"
                            }
                        };

                        scheduledEvents.push(scheduledEvent)
                        isScheduled = true;
                    }
                }
            }
        }

        // console.log(scheduledEvents);
        return scheduledEvents;
    }
}