'use strict';

const Car = require('../entities/Car');
const FastCar = require('../entities/FastCar');
const Money = require('../types/Money');

class CarMapper {
  constructor({ db }) {
    this._db = db;
  }
  fromRowData(data) {
    const classToConstruct = this.getCarClass(data);
    console.log('*** class of car to construct: %s', classToConstruct.name);
    const instance = new classToConstruct({
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
  getCarClass(data) {
    switch (String(data.policy)) {
      case 'fast':
        return FastCar;
      case 'null':
      default:
        return Car;
    }
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
      rental_id: car.getRentalID()
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
  async update(car) {
    const data = this.toRowData(car);
    if (!car.getID()) {
      throw new Error('No ID - cannot update car');
    }
    return await this._db('cars').update(data).where({ car_id: car.getID() });
  }
}

module.exports = CarMapper;
