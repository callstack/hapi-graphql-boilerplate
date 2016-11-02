/**
 * @flow
 */
import Dataloader from 'dataloader';

import type { User } from '../../../internals/types';

const getDataLoader =
  (fieldName: string, schema: Object): Function =>
    new Dataloader(async (ids: Array<string>): any => {
      const results = await schema.find({ [fieldName]: { $in: ids } });
      const resultMap = results.reduce((acc, r) => ({ ...acc, [r[fieldName]]: r }), {});

      return ids.map((id) => resultMap[id]);
    });

const resolvers = (db: Object) => {
  const userLoaderById: any = getDataLoader('_id', db.User);
  const userLoaderByEmail: any = getDataLoader('email', db.User);

  return {
    Query: {
      getUserById(root: Object, { id }: { id: string }): User {
        return userLoaderById.load(id);
      },

      getUserByEmail(root: Object, { email }: { email: string }): User {
        return userLoaderByEmail.load(email);
      },
    },
    Mutation: {
      async createUser(root: Object, args: User): Promise<User> {
        const user = new db.User(args);
        await user.save();

        return user;
      },
    },
  };
};

export default resolvers;
