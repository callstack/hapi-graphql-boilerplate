import { apolloHapi, graphiqlHapi } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import GraphQLSchema from './schema.graphql';
import Mocks from './mocks';
import Resolvers from './resolvers';

export const setupGraphQL =
  (server, graphqlPath = '/graphql', graphiqlPath = '/graphiql') => {
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
        path: graphqlPath,
        apolloOptions: () => ({
          pretty: true,
          schema: executableSchema,
        }),
      },
    });

    server.register({
      register: graphiqlHapi,
      options: {
        path: graphiqlPath,
        graphiqlOptions: {
          endpointURL: `/v1/api${graphqlPath}`,
        },
      },
    });
  };
