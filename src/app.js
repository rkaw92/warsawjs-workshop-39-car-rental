'use strict';

// libraries:
const fastify = require('fastify');
const helmet = require('fastify-helmet');
const formbody = require('fastify-formbody');
const pov = require('point-of-view');
const ejs = require('ejs');
const staticPlugin = require('fastify-static');
const path = require('path');
// application dependencies:
const routes = require('./routes');
const db = require('./db');
const config = require('./config');
// logic:
const Cars = require('./modules/Cars');
const Rentals = require('./modules/Rentals');
const CommandProcessor = require('./modules/CommandProcessor');

// init:
const app = fastify({
  logger: true
});
const doWork = function(workFunction) {
  return db.transaction(async function(transaction) {
    const domain = {
      // New, unified API:
      commands: new CommandProcessor({ db: transaction, config: config })
    };
    return await workFunction(domain);
  });
};
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
  installRoute(app, { doWork, db });
}

module.exports = app;
