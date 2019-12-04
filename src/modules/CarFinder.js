'use strict';

const CarRowGateway = require('./CarRowGateway');

class CarFinder {
  constructor(db) {
    this._db = db;
  }

  async findByID(carID) {
    const db = this._db;
    const carRow = await db('cars')
      .first()
      .where({ car_id: carID });
    if (!carRow) {
      return Promise.reject(new Error('No entry found for car: ' + carID));
    }
    return new CarRowGateway(db, carRow);
  }
}

module.exports = CarFinder;
