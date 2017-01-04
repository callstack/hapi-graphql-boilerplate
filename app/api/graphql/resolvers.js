/**
 * @flow
 */

import type { User, GraphQLContext } from '../../../internals/types';

const resolvers = {
  Query: {
    getUserById(root: Object, { id }: { id: string }, context: GraphQLContext): User {
      return context.loaders.userById.load(id);
    },

    getUserByEmail(root: Object, { email }: { email: string }, context: GraphQLContext): User {
      return context.loaders.userByEmail.load(email);
    },
  },
  Mutation: {
    async createUser(root: Object, args: User, context: GraphQLContext): Promise<User> {
      const user = new context.db.User(args);
      await user.save();

      return user;
    },
  },
};

export default resolvers;
