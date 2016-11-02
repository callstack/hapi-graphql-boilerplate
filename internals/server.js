/**
 * @flow
 */
import Glue from 'glue';
import path from 'path';
import manifest from '../app/manifest';

import type { Server } from './types';

/* eslint-disable no-console */
Glue.compose(manifest, { relativeTo: path.join(__dirname, '../') }, (err: Object, server: Server) => {
  if (err) {
    console.error('☹️ Registration error:', err);
  }
  server.start(() => {
    const { info } = server;

    if (Array.isArray(info)) {
      info.forEach(({ uri }, i) => console.log(`Server #${i} running on ${uri.toLowerCase()} 🙂 🚀`));
    } else {
      console.log(`Server running on on ${info.uri.toLowerCase()} 🙂 🚀`);
    }
  });
});
/* eslint-enable */
