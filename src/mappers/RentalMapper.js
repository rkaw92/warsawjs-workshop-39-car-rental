'use strict';

const Rental = require('../entities/Rental');

class RentalMapper {
  constructor({ db }) {
    this._db = db;
  }

  fromRow(row) {
    return new Rental({
      rentalID: row.rental_id,
      carID: row.car_id,
      duration: {
        start: row.start,
        end: row.end
      },
      active: row.active,
      price: {
        amount: row.price_amount,
        currency: row.price_currency
      }
    });
  }

  toRow(rental) {
    return {
      rental_id: rental.getID(),
      car_id: rental.getCarID(),
      start: rental.getDuration().start,
      end: rental.getDuration().end,
      active: rental.isActive(),
      price_amount: rental.getPrice().amount,
      price_currency: rental.getPrice().currency
    };
  }

  async find({ ID }) {
    const db = this._db;
    const row = await db('rentals')
      .first()
      .where({ rental_id: ID });
    if (!row) {
      return Promise.reject(new Error('No entry found for rentalID: ' + ID));
    }
    return this.fromRow(row);
  }

  async insert(rental) {
    const row = this.toRow(rental);
    delete row.rental_id;
    const [ rental_id ] = await this._db('rentals').insert(row, [ 'rental_id' ]);
    rental.assignID(rental_id);
    return rental;
  }

  async update(rental) {
    if (!rental.getID()) {
      throw new Error('Rentals without IDs cannot be saved');
    }
    const row = this.toRow(rental);
    return await this._db('rentals').update(row).where({ rental_id: rental.getID() });
  }
}

module.exports = RentalMapper;
