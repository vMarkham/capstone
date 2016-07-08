
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users_meals', function(table) {
      table.integer('user_id');
      table.integer('meal_id');
      table.float('servings_eaten');
      table.dateTime('date_time');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_meals');
};
