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

            if (startDateISO.getHours() > 20) continue;

            let startTimeHours = startDateISO.getHours() + (startDateISO.getHours() - 16)
            let endTimeHours = endDateISO.getHours() + (endDateISO.getHours() - 16)

            if (startDateISO.getMinutes() > 30) startTimeHours += 1;

            if (endDateISO.getMinutes() > 30 && endDateISO.getMinutes <= 59) endTimeHours += 1;

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
                    if (isScheduled) continue;
                    if (schedule[day][interval] == 0) {
                        schedule[day][interval] = 2;
                        
                        let hours = Math.floor(Number(interval)/2 + 8)
                        let minutes = interval % 2 == 1 ? '30' : '00'
                        let startDateTime = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getDate()}T${String(hours).padStart(2, '0')}:${minutes}:00`
                        let endMinutes = (parseInt(minutes) + 30 ) % 60;
                        let endHours = (((parseInt(minutes) + 30) / 60) == 1) ? (hours + 1) : hours  
                        let endDateTime = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getDate()}T${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}:00`

                        let scheduledEvent = {
                            summary: event.title,
                            description: event.description,
                            start: {
                                dateTime: startDateTime,
                                timeZone: "America/Los_Angeles"
                            },
                            end: {
                                dateTime: endDateTime,
                                timeZone: "America/Los_Angeles"
                            }
                        };

                        scheduledEvents.push(scheduledEvent)
                        isScheduled = true;
                    }
                }
            }
        }

        return scheduledEvents;
    }
}