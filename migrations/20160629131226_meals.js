
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals', function(table) {
    table.increments();
    table.string('item_id')
    table.string('item_name');
    table.string('brand_name');
    table.string('item_description');
    table.float('nf_calories');
    
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals');
};
