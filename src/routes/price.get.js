'use strict';

const DateRange = require('../types/DateRange');
const CarMapper = require('../mappers/CarMapper');

module.exports = function(app, { cars }) {
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
    const carID = request.query.car_id;
    const dateRange = new DateRange({ start: request.query.date_start, end: request.query.date_end });
    const { car, price, days } = await cars.getOffer(carID, dateRange);
    reply.view('price', {
      car,
      price,
      rental: { start: dateRange.start, end: dateRange.end, days },
      timestamp: new Date()
    });
  });
};
