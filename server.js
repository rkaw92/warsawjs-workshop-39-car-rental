'use strict';

const server = require('./src/app');
const config = require('./src/config');
const logger = require('./src/logger');

server.listen(config.HTTP_PORT).then(function() {
  logger.info({ event: 'server.listening', port: config.HTTP_PORT }, 'Application listening on port %d', config.HTTP_PORT);
}, function(error) {
  logger.error({ event: 'server.error', err: error }, 'Failed to start server listening: %s', error.message);
  // Exit code 80 for HTTP server errors should be intuitive:
  process.exit(error.code || 80);
});
