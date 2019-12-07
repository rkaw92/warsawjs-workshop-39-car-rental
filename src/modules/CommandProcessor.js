'use strict';

const Money = require('../types/Money');
const listPrice = require('../strategies/listPrice');
const CarMapper = require('../mappers/CarMapper');
const RentalMapper = require('../mappers/RentalMapper');
const Rental = require('../entities/Rental');

class CommandProcessor {
  constructor({ db }) {
    this._db = db;
  }

  async getOffer(carID, dateRange) {
    const mapper = new CarMapper({ db: this._db });
    const car = await mapper.find({ ID: carID });
    // TODO: Make the pricing strategy switchable
    // TODO: Unify this logic with that of rent()
    const basePrice = car.getListPrice()
    const { price, days } = listPrice(basePrice, dateRange);
    return { car, price, days };
  }

  async rent({
    carID,
    duration,
    customerData
  }) {
    const cars = new CarMapper({ db: this._db });
    const rentals = new RentalMapper({ db: this._db });
    const car = await cars.find({ ID: carID });
    const rental = new Rental({});
    const basePrice = car.getListPrice();
    const { price, days } = listPrice(basePrice, duration);
    rental.start(car.getID(), duration, price);
    await rentals.insert(rental);
    car.rent(rental.getID(), customerData);
    await cars.update(car);
    return { car, price, days };
  }

  async endRental({
    rentalID
  }) {
    const cars = new CarMapper({ db: this._db });
    const rentals = new RentalMapper({ db: this._db });
    const rental = await rentals.find({ ID: rentalID });
    rental.end();
    const carID = rental.getCarID();
    const car = await cars.find({ ID: carID });
    car.endRental();
    await cars.update(car);
    await rentals.update(rental);

    return { car };
  }
}

module.exports = CommandProcessor;
