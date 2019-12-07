'use strict';

const Car = require('../entities/Car');
const Money = require('../types/Money');

class CarMapper {
  constructor({ db }) {
    this._db = db;
  }
  fromRowData(data) {
    const instance = new Car({
      carID: data.car_id,
      created: true,
      make: data.make,
      model: data.model,
      plate: data.plate,
      listPrice: new Money({ amount: data.list_price_amount, currency: data.list_price_currency }),
      rented: data.rented,
      rentalID: data.rentalID
    });
    return instance;
  }
  toRowData(car) {
    return {
      car_id: car.getID(),
      make: car.getMake(),
      model: car.getModel(),
      plate: car.getPlate(),
      list_price_amount: car.getListPrice().amount,
      list_price_currency: car.getListPrice().currency,
      rented: car.isRented(),
      rentalID: car.getRentalID()
    };
  }
  async find({ ID: carID }) {
    const db = this._db;
    const carRow = await db('cars')
      .first()
      .where({ car_id: carID });
    if (!carRow) {
      return Promise.reject(new Error('No entry found for car: ' + carID));
    }
    return this.fromRowData(carRow);
  }
}

module.exports = CarMapper;
