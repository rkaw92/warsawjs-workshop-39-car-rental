'use strict';

const DAY_MS = 60 * 60 * 24 * 1000;
const listPrice = require('../strategies/listPrice');
const Money = require('../types/Money');
const DateRange = require('../types/DateRange');
const CommandHandler = require('../modules/CommandHandler');

module.exports = function(app, { db }) {
  app.get('/price', {
    schema: {
      query: {
        type: 'object',
        properties: {
          car_id: { type: 'number' },
          date_start: { type: 'string' },
          date_end: { type: 'string' }
        },
        required: [ 'car_id', 'date_start', 'date_end' ]
      }
    }
  }, async function(request, reply) {
    const car_id = request.query.car_id;
    const start = new Date(request.query.date_start);
    const end = new Date(request.query.date_end);
    const commands = new CommandHandler({ db });
    const { price, days, car } = await commands.getOffer(
      car_id,
      new DateRange({ start, end })
    );
    reply.view('price', {
      car,
      price,
      rental: { start, end, days },
      timestamp: new Date()
    });
  });
};
