import Glue from 'glue';
import path from 'path';
import Labbable from 'labbable';
import manifest from '../app/manifest';


/* eslint-disable no-console */
const labbable = module.exports = new Labbable();
Glue.compose(manifest, { relativeTo: path.join(__dirname, '../') }, (err, server) => {
  if (err) {
    console.error('☹️ Registration error:', err);
  }
  labbable.using(server);
  server.initialize((error) => {
    if (error) {
      throw error;
    }
    if (module.parent.id === 'mockParent') {
      return;
    }
    server.start(() => {
      console.log(`Server running on ${server.info.uri.toLowerCase()} 🙂 🚀`);
    });
  });
});
/* eslint-enable */
