import createServer from '../internals/createServer';

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
          superAdminUsername: process.env.super_admin_username || 'superadmin',
          superAdminPassword: process.env.super_admin_password || 'superpassword',
        },
      },
      options: {
        routes: {
          prefix: '/v1/api',
        },
      },
    },
    {
      plugin: 'hapi-auth-basic',
    },
  ],
};

export default createServer(manifest);
