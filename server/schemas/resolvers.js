const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getSingleUser: async (parent, args, context) => {
      if (context.user) {
        const foundUser = await User.findOne({ _id: context.user._id });
        if (!foundUser) {
          throw new AuthenticationError("No user found");
        }
        return foundUser;
      }
      throw new AuthenticationError("No user found");
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { _id, bookInput }) => {
      const user = await User.findOneAndUpdate(
        { _id },
        { $push: { savedBooks: bookInput } },
        { new: true }
      );
      if (!user) {
        throw new AuthenticationError("Could not save the book");
      }
      return user;
    },
    deleteBook: async (parent, { _id, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new AuthenticationError("Could not delete the book");
      }
      return res.json(updatedUser);
    },
  },
};

module.exports = resolvers;
