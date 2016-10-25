import { apolloHapi, graphiqlHapi } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import GraphQLSchema from './schema.graphql';
import createResolvers from './resolvers';

export const setupGraphQL =
  (server, options, graphqlPath = '/graphql', graphiqlPath = '/graphiql') => {
    const { db } = server.plugins;

    const executableSchema = makeExecutableSchema({
      typeDefs: [GraphQLSchema],
      resolvers: createResolvers(db),
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
        route: {
          auth: 'admin',
        },
        path: graphiqlPath,
        graphiqlOptions: {
          endpointURL: `/v1/api${graphqlPath}`,
        },
      },
    });
  };
