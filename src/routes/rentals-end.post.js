'use strict';

const listPrice = require('../strategies/listPrice');
const Cars = require('../modules/Cars');
const Rentals = require('../modules/Rentals');

module.exports = function(app, { db }) {
  app.post('/rentals/:rental_id/end', async function(request, reply) {
    // Retrieve the rental contract and figure out which car to put back:
    const rental_id = request.params.rental_id;
    await db.transaction(async function(transaction) {
      const cars = new Cars({ db: transaction });
      const rentals = new Rentals({ db: transaction });
      const rental = await rentals.end(rental_id);
      await cars.endRental(rental.getCarID());
    });
    reply.view('rental-ended', {
      // TODO: Add display of car data (requires loading an instance from DB).
      timestamp: new Date()
    });
  });
};
