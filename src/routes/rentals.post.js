'use strict';

const listPrice = require('../strategies/listPrice');
const DateRange = require('../types/DateRange');
const Money = require('../types/Money');
const Cars = require('../modules/Cars');
const Rentals = require('../modules/Rentals');

module.exports = function(app, { db }) {
  app.post('/rentals', {
    schema: {
      body: {
        type: 'object',
        properties: {
          car_id: { type: 'number' },
          date_start: { type: 'string', format: 'date-time' },
          date_end: { type: 'string', format: 'date-time' },
          customer_name: { type: 'string' },
          customer_age: { type: 'number' },
          customer_email: { type: 'string', pattern: '.+@.+' }
        },
        required: [ 'car_id', 'date_start', 'date_end', 'customer_name', 'customer_age', 'customer_email' ]
      }
    }
  }, async function(request, reply) {
    // Get all necessary data:
    const car_id = request.body.car_id;
    // For sake of exercise's simplicity, we start the rental at this moment.
    // Otherwise, we'd have to deal with a separate pick-up operation.
    const dateRange = new DateRange({ start: request.body.date_start, end: request.body.date_end });
    const { car, price, days } = await db.transaction(async function(transaction) {
      const cars = new Cars({ db: transaction });
      const rentals = new Rentals({ db: transaction });
      const offer = await cars.getOffer(car_id, dateRange);
      // Actually save the rental contract and mark the car as taken:
      const rental = await rentals.start(car_id, dateRange, offer.price);
      const rental_id = rental.getID();
      const car = await cars.rent(car_id, rental_id, { age: request.body.customer_age });
      return { car, price: offer.price, days: offer.days };
    });
    reply.view('rental-started', {
      car,
      price,
      rental: { start: dateRange.start, end: dateRange.end, days },
      timestamp: new Date()
    });
  });
};
