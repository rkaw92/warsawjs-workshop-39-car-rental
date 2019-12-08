'use strict';
const listPrice = require ('../strategies/listPrice');
const Money = require ('../types/Money');
class Cars {
    constructor ({db}) {
        this._db=db;
    }


    /**
     *
     * @param {string} CardID
     * @param dateRange
     */
   async getOffer(carID, dateRange){
        const db = this._db
        const car = await db('cars')
            .first()
            .where({car_id: carID});
        if (!car) {
            return Promise.reject(new Error('No entry found for car: ' + carID));
        }
        const {price, days} = listPrice(
            new Money({amount: car.list_price_amount, currency: car.list_price_currency}),
            dateRange
        );
        return {price, days, car};
    }
}

module.exports = Cars;