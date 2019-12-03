'use strict';

const ValueObject = require('./ValueObject');
const want = require('want-type');

class DateRange extends ValueObject {
  constructor({ start, end }) {
    start = new Date(start);
    end = new Date(end);
    want('start', start, want.Date());
    want('end', end, want.Date(start));
    super({ start, end });
  }

  duration() {
    return this.end.getTime() - this.start.getTime();
  }
}

module.exports = DateRange;
