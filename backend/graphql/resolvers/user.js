const bcrypt = require("bcrypt");
const User = require("../../models/user");

module.exports = {
  setCanvasToken: async ({ userID, canvasToken }) => {
    try {
      const user = await User.findById({ _id: userID });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const hashedToken = await bcrypt.hash(canvasToken, 12);
      const result = await User.findByIdAndUpdate(
        { _id: userID },
        { canvasToken: hashedToken },
        { new: true }
      ).catch(err => {
        throw err;
      });

      return { ...result._doc, canvasToken: null, password: null };
    } catch (err) {
      throw err;
    }
  },
  
  setStudyPreference: async args => {
    try {
      const user = await User.findById({ _id: args.userID });
      if (!user) {
        throw new Error("User does not exist!");
      }

      // TODO: There is probably a better way
      const result = await User.findByIdAndUpdate(
        { _id: args.userID },
        {
          defaultStudyLength: args.defaultStudyLength,
          defaultBreakLength: args.defaultBreakLength,
          defaultTechnique: args.defaultTechnique
        },
        { new: true }
      ).catch(err => {
        throw err;
      });

      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  }
};
