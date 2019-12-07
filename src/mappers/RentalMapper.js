'use strict';

const Rental = require('../entities/Rental');
const Money = require('../types/Money');
const DateRange = require('../types/DateRange');

class RentalMapper {
  constructor({ db }) {
    this._db = db;
  }
  fromRowData(data) {
    const instance = new Rental({
      rentalID: data.rental_id,
      carID: data.car_id,
      duration: new DateRange({ start: data.start, end: data.end }),
      active: Boolean(data.active),
      price: new Money({ amount: data.price_amount, currency: data.price_currency })
    });
    return instance;
  }
  toRowData(rental) {
    return {
      rental_id: rental.getID(),
      car_id: rental.getCarID(),
      start: rental.getDuration().start.toISOString(),
      end: rental.getDuration().end.toISOString(),
      active: rental.isActive(),
      price_amount: rental.getPrice().amount,
      price_currency: rental.getPrice().currency
    };
  }
  async find({ ID: rentalID }) {
    const db = this._db;
    const rentalRow = await db('rentals').first('*').where({
      rental_id: rentalID
    });
    if (!rentalRow) {
      throw new Error('Rental not found: ' + rentalID);
    }
    return this.fromRowData(rentalRow);
  }
  async insert(rental) {
    // The rental will not usually have an ID - we need to leave it empty,
    //  so that the database can generate one for us.
    // Also, we'll modify the rental after saving to let its users know under
    //  which ID the rental has been saved.
    const db = this._db;
    const data = this.toRowData(rental);
    delete data.rental_id;
    const [ rental_id ] = await db('rentals').insert(data, [ 'rental_id' ]);
    rental.assignID(rental_id);
    return rental;
  }
  async update(rental) {
    const data = this.toRowData(rental);
    if (!rental.getID()) {
      throw new Error('No ID - cannot update rental');
    }
    return await this._db('rentals').update(data).where({ rental_id: rental.getID() });
  }
}

module.exports = RentalMapper;
