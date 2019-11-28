'use strict';

const path = require('path');

const development = {
  client: 'sqlite3',
  connection: path.resolve(__dirname, 'rental.db'),
  useNullAsDefault: true
};
const production = development;

module.exports = {
  development,
  production
};
