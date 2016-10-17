export default {
  plugin: {
    register: 'good',
    options: {
      ops: {
        interval: 60000,
      },
      reporters: {
        console: [
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
        ],
      },
    },
  },
};
