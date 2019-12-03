'use strict';

const db = require('../db');
const DAY_MS = 60 * 60 * 24 * 1000;
const listPrice = require('../strategies/listPrice');
const DateRange = require('../types/DateRange');
const Money = require('../types/Money');

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
    const dateRange = new DateRange(request.query.date_start, request.query.date_end);
    const car = await db('cars')
      .first()
      .where({ car_id: car_id });
    if (!car) {
      return Promise.reject(new Error('No entry found for car: ' + car_id));
    }
    const basePrice = new Money({ amount: car.list_price_amount, currency: car.list_price_currency });
    const { price, days } = listPrice(basePrice, dateRange);
    reply.view('price', {
      car,
      price,
      rental: { start: dateRange.start, end: dateRange.end, days },
      timestamp: new Date()
    });
  });
};
