exports.up = function(knex, Promise) {
    return knex.schema.table('users_meals', function(table) {
      table.integer('health_index');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users_meals', function(table) {
    table.dropColumn('health_index');
  });
};
