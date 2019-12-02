'use strict';

const db = require('../db');
const DAY_MS = 60 * 60 * 24 * 1000;
const listPrice = require('../strategies/listPrice');

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
    const start = new Date(request.query.date_start);
    const end = new Date(request.query.date_end);
    const car = await db('cars')
      .first()
      .where({ car_id: car_id });
    if (!car) {
      return Promise.reject(new Error('No entry found for car: ' + car_id));
    }
    const { price, days } = listPrice(car.list_price_amount, car.list_price_currency, start, end);
    reply.view('price', {
      car,
      price,
      rental: { start, end, days },
      timestamp: new Date()
    });
  });
};
