const Event = require("../../models/event");

module.exports = {
    createEvent: async eventInput => {
        try{ 
            const event = new Event({
                title: eventInput.title,
                startTime: eventInput.startTime,
                endTime: eventInput.endTime,
                isQuiz: eventInput.isQuiz,
                users: eventInput.users
            })

            const result = await event.save();

            return {...result._doc};
        } catch (err) {
            throw err;
        }
    },
    deleteEvent: async ({eventID}) => {
        try {
            const response = await Event.findOneAndDelete(eventID)
            
            return {...response._doc};
        } catch (err) {
            throw err;
        }
    }
}