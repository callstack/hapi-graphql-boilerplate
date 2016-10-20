import { setupGraphQL } from './graphql';
import { setupAuthorization } from './authorization';
import status from './status';


const setupClient = (server, options, next) => {
  // const { db } = server.plugins;

  server.bind({
    ...server.plugins,
    options,
  });

  setupAuthorization(server, options);

  setupGraphQL(server, options);
  server.route(status);

  next();
};

export function register(server, options, next) {
  server.handler('async', (route, handler) => (request, reply) => {
    handler.bind(this)(request, reply).catch(reply);
  });

  server.dependency(['hapi-auth-basic'], (serverIn, nextIn) => {
    setupClient(serverIn, options, nextIn);
  });

  next();
}

register.attributes = {
  name: 'api',
};
