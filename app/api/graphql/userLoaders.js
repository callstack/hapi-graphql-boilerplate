/**
 * @flow
 */

import Dataloader from 'dataloader';

const getDataLoader =
  (fieldName: string, schema: Object): Function =>
    new Dataloader(async (ids: Array<string>): any => {
      const results = await schema.find({ [fieldName]: { $in: ids } });
      const resultMap = results.reduce((acc, r) => ({ ...acc, [r[fieldName]]: r }), {});

      return ids.map((id) => resultMap[id]);
    });

export default (db: Object) => ({
  userById: getDataLoader('_id', db.User),
  userByEmail: getDataLoader('email', db.User),
});
