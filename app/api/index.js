import assert from 'assert';

import { setupGraphQL } from './graphql';
import status from './status';


const setupClient = (server, options, next) => {
  // const { db } = server.plugins;

  server.bind({
    ...server.plugins,
    options,
  });

  server.auth.strategy('jwt', 'jwt', {
    key: options.secret,
    verifyOptions: {
      algorithms: ['HS256'],
    },

    validateFunc: (decoded, request, callback) => {
      const users = [
        {
          id: 1,
          name: 'Jon Snow',
        },
      ];

      if (users.find(u => u.id === decoded.id)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
  });

  setupGraphQL(server);
  server.route(status);

  next();
};

export function register(server, options, next) {
  assert(options.secret, 'JWT secret must be provided');

  server.handler('async', (route, handler) => (request, reply) => {
    handler.bind(this)(request, reply).catch(reply);
  });

  server.dependency(['hapi-auth-jwt2'], (serverIn, nextIn) => {
    setupClient(serverIn, options, nextIn);
  });

  next();
}

register.attributes = {
  name: 'api',
};
