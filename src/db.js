'use strict';

const knex = require('knex');
const path = require('path');
const knexfile = require('../knexfile');
const env = process.env.NODE_ENV || 'development';
const db = knex(knexfile[env]);
console.log('CONSTRUCTING KNEX');

module.exports = db;
