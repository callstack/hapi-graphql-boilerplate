import assert from 'assert';
import { apolloHapi, graphiqlHapi } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import status from './status';
import GraphQLSchema from '../graphql/schema.graphql';
import Mocks from '../graphql/mocks';
import Resolvers from '../graphql/resolvers';

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

  const executableSchema = makeExecutableSchema({
    typeDefs: [GraphQLSchema],
    resolvers: Resolvers,
  });

  addMockFunctionsToSchema({
    schema: executableSchema,
    mocks: Mocks,
    preserveResolvers: true,
  });

  server.register({
    register: apolloHapi,
    options: {
      path: '/graphql',
      apolloOptions: {
        // graphiql: true,
        pretty: true,
        schema: executableSchema,
      },
    },
  });

  server.register({
    register: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/v1/api/graphql',
      },
    },
  });

  next();
}

register.attributes = {
  name: 'api',
};
