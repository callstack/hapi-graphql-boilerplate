hapi-graphql-boilerplate
========================

## Requirements

You need to have [MongoDB](https://docs.mongodb.com/manual/installation/?jmp=footer) installed and running on your machine in order to run this boilerplate.

```bash
mongod
```

Or you can use external MongoDB DaaS (check out [Heroku](https://elements.heroku.com/addons/mongolab))
and specify `process.env.plugins_db_uri` variable, or edit `app/manifest.js` file and provide your mongo URL.

## Installation

Simply clone this repository with:

```bash
git clone git@github.com:callstack-io/hapi-graphql-boilerplate.git
```

Install with [Yarn](https://github.com/yarnpkg/yarn).

```bash
yarn install
```

or with npm

```bash
npm install
```

## Scripts

Start the app:
```bash
npm start
```

Start in dev mode:
```bash
npm run start-dev
```

Start in dev mode without checks:
```bash
npm run watch
```

Check for flow and lint errors:
```bash
npm run check
```

Run tests:
```bash
npm test
```

## Routes

  `GET /v1/api/graphiql` - GraphiQL documentation, basic credentials: login: `admin`, password: `admin`.

  `POST /v1/api/graphql` - GraphQL endpoint.

  `GET /v1/api/status` - Check if server is up.

## Directories

#### app

App directory is the place where all application-related stuff is located. That includes API endpoints and
database handlers.

#### internals

Internals is a folder used by this boilerplate to run itself (e.g. with babel or without it), scaffold new modules (Yeoman generator)
and others. It's also a place where all un-published modules this boilerplate uses like db one are located.
