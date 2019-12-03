exports.up = function(knex) {
  return knex.schema.createTable('cars', function(table) {
    table.increments('car_id').notNullable().primary();
    table.text('make').notNullable();
    table.text('model').notNullable();
    table.text('plate').notNullable();
    table.decimal('list_price_amount', 15, 2).notNullable();
    table.text('list_price_currency').notNullable();
    table.boolean('rented').notNullable();
    table.integer('rental_id');
    table.text('policy');
  }).createTable('rentals', function(table) {
    table.increments('rental_id').notNullable().primary();
    table.integer('car_id').notNullable();
    table.timestamp('start').notNullable();
    table.timestamp('end').notNullable();
    table.boolean('active').notNullable();
    table.decimal('price_amount', 15, 2).notNullable();
    table.text('price_currency').notNullable();
  }).raw(
    'CREATE VIEW cars_with_status AS ??',
    knex('cars')
      .select('cars.car_id', 'make', 'model', 'plate', 'rented', 'cars.rental_id', 'rentals.start AS rental_start', 'rentals.end AS rental_end', 'active AS rental_active')
      .leftJoin('rentals', 'cars.rental_id', 'rentals.rental_id')
  );
};

exports.down = function(knex) {
  return knex.schema
    .raw('DROP VIEW cars_with_status')
    .dropTable('rentals')
    .dropTable('cars');
};
