'use strict';

const listPrice = require('../strategies/listPrice');
const DateRange = require('../types/DateRange');
const Money = require('../types/Money');
const Cars = require('../modules/Cars');
const Rentals = require('../modules/Rentals');

module.exports = function(app, { doWork }) {
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
    const { car, price, days } = await doWork(async function({ commands }) {
      return await commands.rent({
        carID: car_id,
        duration: dateRange,
        customerData: { age: request.body.customer_age }
      });
    });
    reply.view('rental-started', {
      car,
      price,
      rental: { start: dateRange.start, end: dateRange.end, days },
      timestamp: new Date()
    });
  });
};
