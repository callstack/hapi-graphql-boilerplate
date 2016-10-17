/**
 * @flow
 */

/**
 * Reporter is essentialy an array of transforms. Each item in the array of streams will
 * be piped together in the array order.
 *
 * The console reporter will:
 * 1) Pick `error` events
 * 2) Return server event into string with `good-console`
 * 3) Pipe it directly to `stdout`
 */
const consoleReporter = [
  {
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [
      {
        error: '*',
      },
    ],
  },
  {
    module: 'good-console',
  },
  'stdout',
];

export default {
  plugin: {
    register: 'good',
    options: {
      ops: {
        interval: 60000,
      },
      reporters: {
        console: consoleReporter,
      },
    },
  },
};
