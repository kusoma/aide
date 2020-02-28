module.exports = {
    createSchedule: () => {
        let [r, c] = [8, 24]; 
        let schedule = Array(r).fill().map(()=>Array(c).fill(0));

        return schedule;
    },

    fillSchedule: (schedule, events) => {
        for (event of events) {
            const startDateISO = new Date(event.start.dateTime)
            const endDateISO = new Date(event.end.dateTime)
            const day = module.exports.dayDifference(startDateISO)

            if (startDateISO.getHours() < 8 || startDateISO.getHours() > 20) continue;

            let startTimeHours = startDateISO.getHours() + (startDateISO.getHours() - 16)
            let endTimeHours = startDateISO.getHours() + (endDateISO.getHours() - 16)

            if (startDateISO.getMinutes() > 30) startTimeHours += 1;

            if (endDateISO.getMinutes() > 30) endTimeHours += 1;

            for (let index = startTimeHours; index <= endTimeHours; index++ ) {
                schedule[day][index] = 1;
            }
            
        }
        console.log(schedule);
    },

    dayDifference: eventDate => {
        const today = new Date()
        eventDate = new Date(eventDate)

        return Math.abs(Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())) / (1000 * 60 * 60 * 24)));
    },

    scheduleEvents: (schedule, events) => {

    }
}