import mongoose from 'mongoose';

if (global.Promise) {
  mongoose.Promise = global.Promise;
}

export function register(server, options, next) {
  const config = {
    host: '127.0.0.1',
    port: 27017,
    database: 'demo',
    ...options,
  };

  mongoose.connect(config.uri);

  server.expose('Types', mongoose.Types);

  const models = require('./models'); // eslint-disable-line global-require

  Object.keys(models).forEach((model) => {
    server.expose(model, models[model]);
  });

  mongoose.connection
    .on('error', next)
    .on('open', next);
}

register.attributes = {
  name: 'db',
};
