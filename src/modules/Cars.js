'use strict';

const Money = require('../types/Money');
const listPrice = require('../strategies/listPrice');

class Cars {
  constructor({ db }) {
    this.db = db;
  }

  async getOffer(carID, dateRange) {
    const db = this.db;
    const car = await db('cars')
      .first()
      .where({ car_id: carID });
    if (!car) {
      return Promise.reject(new Error('No entry found for car: ' + carID));
    }
    const basePrice = new Money({ amount: car.list_price_amount, currency: car.list_price_currency });
    const { price, days } = listPrice(basePrice, dateRange);
    return { car, price, days };
  }
}

module.exports = Cars;
