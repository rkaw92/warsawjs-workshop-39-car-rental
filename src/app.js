'use strict';

const fastify = require('fastify');
const helmet = require('fastify-helmet');
const pov = require('point-of-view');
const ejs = require('ejs');
const staticPlugin = require('fastify-static');
const path = require('path');
const routes = require('./routes');

const app = fastify();
app.register(helmet);
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
app.register(staticPlugin, {
  root: path.resolve(__dirname, '..', 'public'),
  prefix: '/public/'
})

for (let installRoute of routes) {
  installRoute(app);
}

module.exports = app;
