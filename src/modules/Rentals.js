'use strict';

const RentalMapper = require('../mappers/RentalMapper');
const Rental = require('../entities/Rental');

class Rentals {
  constructor({ db }) {
    this._db = db;
  }

  async start(carID, duration, price) {
    const mapper = new RentalMapper({ db: this._db });
    const rental = new Rental({});
    rental.start(carID, duration, price);
    return await mapper.insert(rental);
  }

  async end(rentalID) {
    const mapper = new RentalMapper({ db: this._db });
    const rental = await mapper.find({ ID: rentalID });
    rental.end();
    await mapper.update(rental);
    return rental;
  }
}

module.exports = Rentals;
