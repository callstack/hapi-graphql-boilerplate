const resolvers = (db) => ({
  Query: {
    async getUserById(root, { id }) {
      return await db.User.findById(id);
    },

    async getUserByEmail(root, { email }) {
      return await db.User.findOne({ email });
    },
  },
  Mutation: {
    async createUser(root, args) {
      const user = new db.User(args);
      await user.save();

      return user;
    },
  },
});

export default resolvers;
