'use strict';

const DAY_MS = 60 * 60 * 24 * 1000;

module.exports.seed = async function(knex) {
  await knex('cars').del();
  await knex('rentals').del();
  await knex('cars').insert([
    {
      car_id: 1,
      make: 'Ford',
      model: 'Taurus',
      plate: 'JS123OK',
      rented: false
    },
    {
      car_id: 2,
      make: 'Ford',
      model: 'Taurus',
      plate: 'JS555UU',
      rented: false,
    },
    {
      car_id: 3,
      make: 'Honda',
      model: 'Civic Type R',
      plate: 'JS15FAST',
      rented: true,
      rental_id: 1
    }
  ]);
  await knex('rentals').insert([
    {
      rental_id: 1,
      car_id: 3,
      start: new Date(),
      end: new Date(Date.now() + DAY_MS),
      active: true
    }
  ]);
};
