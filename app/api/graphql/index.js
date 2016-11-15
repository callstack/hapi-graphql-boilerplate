/**
 * @flow
 */
import { apolloHapi, graphiqlHapi } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

/* $FlowFixMe */
import GraphQLSchema from './schema.graphql';
import createResolvers from './resolvers';
import getUserLoaders from './userLoaders';

import type { Server } from '../../../internals/types';

export const setupGraphQL =
  (
    server: Server,
    options: Object,
    graphqlPath: string = '/graphql',
    graphiqlPath: string = '/graphiql'
  ) => {
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
          context: {
            loaders: getUserLoaders(db),
          },
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
