import Glue from 'glue';
import path from 'path';
import manifest from '../app/manifest';

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    plugin: {
      register: 'blipp',
      options: {},
    },
  });
}

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
