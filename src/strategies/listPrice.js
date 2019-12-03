'use strict';

const DAY_MS = 60 * 60 * 24 * 1000;
const Money = require('../types/Money');

/**
 * Get total price of rental based on number of days and car's list price.
 * @param {Money} basePrice
 * @param {DateRange} dateRange
 * @returns {Object}
 */
function calculateRentalPriceByListPrice(basePrice, dateRange) {
  const days = Math.ceil(dateRange.duration() / DAY_MS);
  if (days <= 0) {
    throw new Error(`Invalid rental duration: ${days} days`);
  }
  return {
    price: new Money({
      amount: days * basePrice.amount,
      currency: basePrice.currency
    }),
    days: days
  };
}

module.exports = calculateRentalPriceByListPrice;
