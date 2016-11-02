/**
 * Create manifest helper used to control this boilerplate internals
 *
 * @flow
 */

import internalModules from './modules';

import type { Manifest } from './types';

/* Available options */
type ManifestOpts = {
  /* Should internal modules be enabled */
  useInternalModules?: boolean,
};

export default function createManifest(manifest: Manifest, opts?: ManifestOpts = {}): Manifest {
  if (opts.useInternalModules !== false) {
    // eslint-disable-next-line no-param-reassign
    manifest.registrations = (manifest.registrations || []).concat(internalModules);
  }

  return manifest;
}
