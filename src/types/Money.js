'use strict';

const ValueObject = require('./ValueObject');
const want = require('want-type');

class Money extends ValueObject {
  constructor({ amount, currency }) {
    want('amount', amount, want.Number());
    want('currency', currency, want.String(3, 3));
    super({ amount, currency });
  }
}

module.exports = Money;
