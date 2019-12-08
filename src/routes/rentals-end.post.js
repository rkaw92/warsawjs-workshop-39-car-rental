'use strict';

const CommandHandler = require('../modules/CommandHandler');

module.exports = function(app, { db }) {
  app.post('/rentals/:rental_id/end', async function(request, reply) {
    // Retrieve the rental contract and figure out which car to put back:
    const rental_id = request.params.rental_id;
    await db.transaction(async function(transaction) {
      const commands = new CommandHandler({ db: transaction });
      await commands.endRental(rental_id);
    });
    reply.view('rental-ended', {
      // TODO: Add display of car data (requires loading an instance from DB).
      timestamp: new Date()
    });
  });
};
