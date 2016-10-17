/**
 * Create manifest helper used to control this boilerplate internals
 *
 * @flow
 */

import internalModules from './modules';

// Available options
type ManifestOpts = {

  // Should internal modules be enabled
  useInternalModules?: boolean,
};

type Manifest = {
  registrations?: Array,
};

export default function createManifest(manifest: Manifest, opts?: ManifestOpts) {
  if (!opts) {
    opts = {};
  }
  
  if (opts.useInternalModules !== false) {
    manifest.registrations = (manifest.registrations || []).concat(internalModules);
  }
  
  return manifest;
};
