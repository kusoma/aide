const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
    addGoogleToken: async({userID, googleToken}) => {
        try {
            const user = await User.findOne({_id: userID})
            if (!user) {
                throw new Error('User does not exist.');
            }
            const hashedToken = await bcrypt.hash(googleToken, 12);
            const result = await User.findOneAndUpdate(
                {_id: userID},
                {googleToken: hashedToken},
                {new: true}
            );
            
            return {...result._doc, googleToken: null, canvasToken: null, password: null}
        } catch (err) {
            throw err;
        }
    },
    addCanvasToken: async({userID, canvasToken}) => {
        try {
            const user = await User.findOne({_id: userID})
            if (!user) {
                throw new Error('User does not exist.');
            }
            const hashedToken = await bcrypt.hash(canvasToken, 12);
            const result = await User.findOneAndUpdate(
                {_id: userID},
                {canvasToken: hashedToken},
                {new: true}
            );

            return {...result._doc, googleToken: null,  canvasToken: null, password: null}
        } catch (err) {
            throw err;
        }
    }
}