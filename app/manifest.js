import createServer from '../internals/createServer';

import type { Manifest } from '../internals/types';

const manifest: Manifest = {
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
          superAdminUsername: process.env.super_admin_username || 'admin',
          superAdminPassword: process.env.super_admin_password || 'admin',
        },
      },
      options: {
        routes: {
          prefix: '/v1/api',
        },
      },
    },
    {
      plugin: {
        register: './app/db',
        options: {
          uri: process.env.plugins_db_uri || 'mongodb://localhost:27017/testdatabase',
        },
      },
    },
    {
      plugin: 'hapi-auth-basic',
    },
  ],
};

export default createServer(manifest);
