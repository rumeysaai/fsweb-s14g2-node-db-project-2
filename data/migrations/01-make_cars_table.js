exports.up = function (knex) {
  return knex.schema.createTable('Cars', table => {
    table.increments();
    table.string('vin', 128)
      .notNullable()
      .unique();
    table.string('make',32)
      .notNullable();
    table.string('model', 128)
      .notNullable();
    table.integer('mileage')
      .notNullable();
    table.string('title',32);
    table.string('transmission',128);
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Cars');
};
