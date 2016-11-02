/**
 * @flow
 */
import type { Server } from '../../internals/types';

export const setupAuthorization = (server: Server, options: Object) => {
  const isSuperAdmin = (username, password) =>
    username === options.superAdminUsername && password === options.superAdminPassword;

  server.auth.strategy('admin', 'basic', {
    validateFunc: (request, username, password, callback) => {
      if (isSuperAdmin(username, password)) {
        return callback(null, true, {});
      }
      return callback(null, false);
    },
  });
};
