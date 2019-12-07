'use strict';

const Money = require('../types/Money');
const DateRange = require('../types/DateRange');

class Rental {
  constructor({
    rentalID = null,
    carID = null,
    duration = null,
    active = false,
    price = null
  }) {
    this._rentalID = rentalID;
    this._carID = carID;
    this._duration = duration ? new DateRange(duration) : null;
    this._active = active;
    this._price = price ? new Money(price) : null;
  }

  /**
   * Assign a database ID - this is called by the mapping layer only.
   */
  assignID(ID) {
    this._rentalID = ID;
  }
  getID() {
    return this._rentalID;
  }
  getCarID() {
    return this._carID;
  }
  getDuration() {
    return this._duration;
  }
  isActive() {
    return this._active;
  }
  getPrice() {
    return this._price;
  }

  start(carID, duration, price) {
    if (this._active) {
      throw new Error('Rental already started');
    }
    this._active = true;
    this._carID = carID;
    this._duration = new DateRange(duration);
    this._price = new Money(price);
  }

  end() {
    if (!this._active) {
      throw new Error('Rental is already ended');
    }
    this._active = false;
  }
}

module.exports = Rental;
