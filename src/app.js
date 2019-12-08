'use strict';

const fastify = require('fastify');
const helmet = require('fastify-helmet');
const formbody = require('fastify-formbody');
const pov = require('point-of-view');
const ejs = require('ejs');
const staticPlugin = require('fastify-static');
const path = require('path');
const routes = require('./routes');
const db = require('./db');

const app = fastify({
  logger: true
});
// Add a security middleware:
app.register(helmet);
// Enable parsing of application/x-www-form-urlencoded:
app.register(formbody);
// Add templating support for response.view support:
app.register(pov, {
  engine: {
    ejs: ejs
  },
  templates: path.resolve(__dirname, 'templates'),
  options: {
    filename: path.resolve(__dirname, 'templates')
  },
  includeViewExtension: true
});
// Serve assets to the browser:
app.register(staticPlugin, {
  root: path.resolve(__dirname, '..', 'public'),
  prefix: '/public/'
})

// The routes are actually route-registering functions. Call each of them:
for (let installRoute of routes) {
  installRoute(app, { db });
}

module.exports = app;
