'use strict';

module.exports = function(app, { db }) {
  app.get('/cars', async function(request, reply) {
    const cars = await db('cars_with_status').select();
    reply.view('cars', { cars });
  });
};
