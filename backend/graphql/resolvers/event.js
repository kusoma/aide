const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            start: args.eventInput.start,
            end: args.eventInput.end,
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
    deleteEvent: async ({userID, eventID}) => {
        try {
            await User.findByIdAndUpdate(
                { _id: userID},
                { $pull: { 'createdEvents': eventID } }
            );

            let response = await Event.findByIdAndUpdate(
                { _id: eventID },
                { $pull: { 'users': userID } }
            );

            // TODO: This is trash
            if (response.users.length === 1) {
                let response = await Event.findOneAndDelete(eventID);
            }

            return {...response._doc};
        } catch (err) {
            throw err;
        }
    }
}