/**
 * @flow
 */

import type { User } from '../../../internals/types';

const resolvers = (db: Object) => ({
  Query: {
    getUserById(root: Object, { id }: { id: string }, context): User {
      return context.loaders.userById.load(id);
    },

    getUserByEmail(root: Object, { email }: { email: string }, context): User {
      return context.loaders.userByEmail.load(email);
    },
  },
  Mutation: {
    async createUser(root: Object, args: User): Promise<User> {
      const user = new db.User(args);
      await user.save();

      return user;
    },
  },
});

export default resolvers;
