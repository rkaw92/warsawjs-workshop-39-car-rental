'use strict';

const ValueObject = require ('./ValueObject');

class DateRange extends ValueObject {
    /**
     *
     * @param {Object} params
     * @param {(Date|string)} params.start
     * @param {(Date | string)} params.end
     */


    constructor ({start, end}) {
        start = new Date(start);
        end = new Date (end);

        if (isNan(start.getTime()) || isNan (end.getTime())) {

            throw new TypeError('start or end is invalid');

        }
        super ({start, end});
    }
}

module.exports = DateRange;