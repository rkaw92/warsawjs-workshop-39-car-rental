'use strict';

const listPrice = require('../strategies/listPrice');

module.exports = function(app, {db}) {
  app.post('/rentals/:rental_id/end', async function(request, reply) {
    // Retrieve the rental contract and figure out which car to put back:
    const rental_id = request.params.rental_id;
    await db.transaction(async function(transaction) {
      const rental = await transaction('rentals')
        .first()
        .where({ rental_id: rental_id }).forUpdate();
      if (!rental) {
        throw new Error('No entry found for rental: ' + rental_id);
      }
      if (!rental.active) {
        throw new Error('This rental contract is already ended');
      }
      await transaction('cars')
        .update({ rented: false, rental_id: null })
        .where({ car_id: rental.car_id });
    });
    reply.view('rental-ended', {
      // TODO: Add display of car data (requires loading an instance from DB).
      timestamp: new Date()
    });
  });
};
