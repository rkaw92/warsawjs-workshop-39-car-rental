'use strict';

const Car = require('./Car');
const want = require('want-type');

class FastCar extends Car {
  rent(rentalID, customerData) {
    want('customerData', customerData, want.Object());
    want('customerData.age', customerData.age, want.Number(0, Infinity));
    if (customerData.age < 24) {
      throw new Error('Not so fast! This type of car is restricted to users of age 24 or above.');
    }
    return super.rent(rentalID, customerData);
  }
}

module.exports = FastCar;
