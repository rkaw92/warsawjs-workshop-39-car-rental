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
}

module.exports = Car;
