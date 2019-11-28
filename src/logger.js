'use strict';

const pino = require('pino');
module.exports = pino({ name: process.argv[1] });
