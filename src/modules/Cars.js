'use strict';

const Money = require('../types/Money');
const listPrice = require('../strategies/listPrice');
const CarMapper = require('../mappers/CarMapper');

class Cars {
  constructor({ db }) {
    this._db = db;
  }

  async getOffer(carID, dateRange) {
    const mapper = new CarMapper({ db: this._db });
    const car = await mapper.find({ ID: carID });
    const basePrice = car.getListPrice()
    const { price, days } = listPrice(basePrice, dateRange);
    return { car, price, days };
  }
}

module.exports = Cars;
