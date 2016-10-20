import { apolloHapi, graphiqlHapi } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import GraphQLSchema from './schema.graphql';
import Mocks from './mocks';
import Resolvers from './resolvers';

export const setupGraphQL =
  (server, options, graphqlPath = '/graphql', graphiqlPath = '/graphiql') => {

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
        route: {
          auth: 'basic',
        },
        path: graphqlPath,
        apolloOptions: () => ({
          pretty: true,
          schema: executableSchema,
        }),
      },
    });

    const superAdminCredentials =
      new Buffer(`${options.superAdminUsername}:${options.superAdminPassword}`).toString('base64');

    server.register({
      register: graphiqlHapi,
      options: {
        route: {
          auth: 'admin',
        },
        path: graphiqlPath,
        graphiqlOptions: {
          endpointURL: `/v1/api${graphqlPath}`,
          passHeader: `'Authorization': 'Basic ${superAdminCredentials}',`,
        },
      },
    });
  };
