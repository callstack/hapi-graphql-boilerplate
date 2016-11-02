import Dataloader from 'dataloader';

const getDataLoader = (fieldName, schema) => new Dataloader(async (ids) => {
  const results = await schema.find({ [fieldName]: { $in: ids } });
  const resultMap = results.reduce((acc, r) => ({ ...acc, [r[fieldName]]: r }), {});

  return ids.map((id) => resultMap[id]);
});

const resolvers = (db) => {
  const userLoaderById = getDataLoader('_id', db.User);
  const userLoaderByEmail = getDataLoader('email', db.User);

  return {
    Query: {
      getUserById(root, { id }) {
        return userLoaderById.load(id);
      },

      getUserByEmail(root, { email }) {
        return userLoaderByEmail.load(email);
      },
    },
    Mutation: {
      async createUser(root, args) {
        const user = new db.User(args);
        await user.save();

        return user;
      },
    },
  };
};

export default resolvers;
