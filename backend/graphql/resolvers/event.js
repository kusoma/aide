const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            startTime: args.eventInput.startTime,
            endTime: args.eventInput.endTime,
            isQuiz: args.eventInput.isQuiz,
            users: args.eventInput.users
        })

        try {
            const result = await event.save();
            for (const id of args.eventInput.users) {
                const user = await User.findById(id);

                if (!user) {
                    throw new Error("User not found.");
                }

                user.createdEvents.push(result._id)
                await user.save();
            }

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