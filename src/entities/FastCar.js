'use strict';

const Car = require('./Car');

class FastCar extends Car {
  rent(rentalID, customerData) {
    if (!customerData) {
      throw new Error('Cannot check customer age');
    }
    if (customerData.age < 24) {
      throw new Error('Customer is too young - try again later');
    }
    super.rent(rentalID, customerData);
  }
}

module.exports = FastCar;
