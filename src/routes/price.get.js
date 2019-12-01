'use strict';

const db = require('../db');
const DAY_MS = 60 * 60 * 24 * 1000;

module.exports = function(app) {
  app.get('/price', {
    schema: {
      query: {
        type: 'object',
        properties: {
          car_id: { type: 'number' },
          date_start: { type: 'string', format: 'date-time' },
          date_end: { type: 'string', format: 'date-time' }
        },
        required: [ 'car_id', 'date_start', 'date_end' ]
      }
    }
  }, async function(request, reply) {
    const car_id = request.query.car_id;
    const date_start = new Date(request.query.date_start);
    const date_end = new Date(request.query.date_end);
    const car = await db('cars')
      .first()
      .where({ car_id: car_id });
    if (!car) {
      return Promise.reject(new Error('No entry found for car: ' + car_id));
    }
    const days = Math.ceil((date_end.getTime() - date_start.getTime()) / DAY_MS);
    const price = {
      amount: days * car.list_price_amount,
      currency: car.list_price_currency
    };
    reply.view('price', {
      car,
      price,
      rental: { date_start, date_end, days },
      timestamp: new Date()
    });
  });
};
