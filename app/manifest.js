const manifest = {
  server: {
    connections: {
      router: {
        stripTrailingSlash: true,
      },
    },
  },
  connections: [{
    address: '0.0.0.0',
    labels: ['client'],
    port: +process.env.PORT || 1337,
    routes: {
      cors: true,
      validate: {
        options: {
          stripUnknown: true,
        },
      },
      payload: {
        allow: ['application/json'],
      },
    },
  }],
  registrations: [
    {
      plugin: {
        register: './app/api',
        options: {
          secret: process.env.plugins_client_secret || 'secret1!',
          passwordSecret: process.env.plugins_client_password_secret || 'secret2!',
        },
      },
      options: {
        routes: {
          prefix: '/v1/api',
        },
      },
    },
    {
      plugin: 'hapi-auth-jwt2',
    },
  ],
};

module.exports = manifest;
