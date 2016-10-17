export default [
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
