'use strict';

class ValueObject {
  constructor(data) {
    Object.assign(this, data);
    Object.freeze(this);
  }

  equals(other) {
    return (
      other &&
      Object.keys(this).length === Object.keys(other).length &&
      Object.keys(this).every(function(key) {
        return (
          this[key] === other[key] ||
          (typeof this[key].equals === 'function' && typeof other[key].equals === 'function' && this[key].equals(other[key])) ||
          (typeof this[key].getTime === 'function' && typeof other[key].getTime === 'function' && this[key].getTime() === other[key].getTime()) ||
          (isNaN(this[key]) && isNaN(other[key]))
        );
      })
    );
  }
}

module.exports = ValueObject;
