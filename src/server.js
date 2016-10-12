import Glue from 'glue';
import manifest from './manifest';

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    plugin: {
      register: 'blipp',
      options: {},
    },
  });
}

/* eslint-disable no-console */
Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.error('☹️ Registration error:', err);
  }
  server.start(() => {
    console.log(`Server running on ${server.info.uri.toLowerCase()} 🙂 🚀`);
  });
});
/* eslint-enable */
