'use strict';

const Money = require('../types/Money');

class Car {
  constructor({
    carID = null,
    created = false,
    make = null,
    model = null,
    plate = null,
    listPrice = null,
    rented = false,
    rentalID = null
  }) {
    this._carID = carID;
    this._created = created;
    this._make = make;
    this._model = model;
    this._plate = plate;
    this._listPrice = listPrice;
    this._rented = rented
    this._rentalID = rentalID;
  }

  getID() {
    return this._carID;
  }
  isCreated() {
    return this._created;
  }
  getMake() {
    return this._make;
  }
  getModel() {
    return this._model;
  }
  getPlate() {
    return this._plate;
  }
  getListPrice() {
    return this._listPrice;
  }
  isRented() {
    return this._rented;
  }
  getRentalID() {
    return this._rentalID;
  }

  rent(rentalID, customerAge) {
    if (this.isRented()) {
      throw new Error('This car is already rented');
    }
    this._rented = true;
    this._rentalID = rentalID;
  }

  endRental() {
    if (!this.isRented()) {
      throw new Error('This car is not currently rented');
    }
    this._rented = false;
    this._rentalID = null;
  }
}

module.exports = Car;
