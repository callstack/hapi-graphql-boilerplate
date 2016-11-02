/**
 * @flow
 */

export type Route = {
  method: string,
  path: string,
  handler: (request: Object, reply: Function) => void,
}

export type Plugin = {
  plugin: string | {
    register: string,
    options: Object,
  },
}

export type Manifest = {
  server: Object,
  connections: Array<Object>,
  registrations?: Array<Plugin>,
};

type ServerInfo = {
  id: string,
  created: number,
  started: number,
  port: number,
  host: string,
  address: string,
  protocol: string,
  uri: string,
};

export type Server = {
  app: Object,
  auth: Object,
  connections: Array<Object>,
  expose: Function,
  info: ServerInfo | Array<ServerInfo>,
  load: Object,
  listener: Object | Array<Object>,
  methods: Object,
  mime: Object,
  plugins: Object,
  start: Function,
  register: Function,
  realm: Object,
  registrations: Object | Array<Object>,
  root: Object,
  settings: Object,
  version: string,
}

export type User = {
  id: string,
  email: string,
}
