/**
 * @flow
 */
import type { Route } from '../../../internals/types';

const routes: Array<Route> = [
  {
    method: 'GET',
    path: '/status',
    handler: function getStatus(request, reply) {
      reply({
        status: 'ok',
      });
    },
  },
];

export default routes;
