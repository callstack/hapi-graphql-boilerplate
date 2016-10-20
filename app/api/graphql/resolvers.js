const resolvers = (db) => ({
  Query: {
    async user(root, args){
      console.log(args);
      const a = await db.User.findOne({ email: args.email });
      return a;
    },
  },
});

export default resolvers;
