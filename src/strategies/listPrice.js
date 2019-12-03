'use strict';

const DAY_MS = 60 * 60 * 24 * 1000;

/**
 * Get total price of rental based on number of days and car's list price.
 * @param {number} listPriceAmount
 * @param {string} listPriceCurrency
 * @param {DateRange} dateRange
 * @returns {Object}
 */
function calculateRentalPriceByListPrice(listPriceAmount, listPriceCurrency, dateRange) {
  const days = Math.ceil(dateRange.duration() / DAY_MS);
  if (days <= 0) {
    throw new Error(`Invalid rental duration: ${days} days`);
  }
  return {
    price: {
      amount: days * listPriceAmount,
      currency: listPriceCurrency
    },
    days: days
  };
}

module.exports = calculateRentalPriceByListPrice;
