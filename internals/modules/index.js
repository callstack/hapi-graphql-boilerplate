/**
 * An array of all internal modules used by this Hapi.js instance.
 *
 * This is default configuration of the boilerplate. If you intend to use
 * a different set of plugins, import and add to your manifest each of these
 * separately.
 *
 * @flow
 */
import reporter from './reporter';

const internalModules = [
  reporter,
];

const devModules = [
  {
    plugin: {
      register: 'blipp',
      options: {},
    },
  },
];

export default process.env.PRODUCTION
  ? internalModules
  : [...internalModules, ...devModules];
