'use strict';

const fields = [ 'car_id', 'make', 'model', 'plate', 'list_price_amount', 'list_price_currency', 'rented', 'rental_id', 'policy' ];

class CarRowGateway {
  constructor(db, rowData) {
    this._db = db;
    for (let key of fields) {
      this[key] = typeof rowData[key] === 'undefined' ? null : rowData[key];
    }
  }

  async update() {
    const rowData = Object.create(null);
    for (let key of fields) {
      rowData[key] = this[key];
    }
    return await this._db('cars').update(rowData).where({
      car_id: this.car_id
    });
  }
}

module.exports = CarRowGateway;
