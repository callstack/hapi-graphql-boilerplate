const resolvers = (db) => ({
  Query: {
    async user(root, args){
      return await db.User.findOne({ email: args.email });
    },
  },
});

export default resolvers;
