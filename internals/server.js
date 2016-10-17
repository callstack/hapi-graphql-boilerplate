import Glue from 'glue';
import path from 'path';
import manifest from '../app/manifest';
import internalModules from '../internals/modules';

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    plugin: {
      register: 'blipp',
      options: {},
    },
  });
}

// Add internal modules
manifest.registrations = manifest.registrations.concat(internalModules);

/* eslint-disable no-console */
Glue.compose(manifest, { relativeTo: path.join(__dirname, '../') }, (err, server) => {
  if (err) {
    console.error('☹️ Registration error:', err);
  }
  server.start(() => {
    console.log(`Server running on ${server.info.uri.toLowerCase()} 🙂 🚀`);
  });
});
/* eslint-enable */
