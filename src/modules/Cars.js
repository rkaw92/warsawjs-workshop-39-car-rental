'use strict';

const Money = require('../types/Money');
const listPrice = require('../strategies/listPrice');

class Cars {
  constructor({ finder }) {
    this.finder = finder;
  }

  async getOffer(carID, dateRange) {
    const car = await this.finder.findByID(carID);
    const basePrice = new Money({ amount: car.list_price_amount, currency: car.list_price_currency });
    const { price, days } = listPrice(basePrice, dateRange);
    return { car, price, days };
  }
}

module.exports = Cars;
