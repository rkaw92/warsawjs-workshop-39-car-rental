'use strict';

const EOL = require('os').EOL;
const db = require('../db');
(async function dumpDatabase() {
  console.log('All data:');
  const tables = [ 'cars', 'rentals' ];
  for (let tableName of tables) {
    console.log(EOL);
    console.log('--- %s ---', tableName);
    console.log(JSON.stringify(
      await db(tableName).select('*'),
      null,
      '  '
    ));
  }
  process.exit();
})();
