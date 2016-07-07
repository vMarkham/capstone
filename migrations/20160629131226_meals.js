
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals', function(table) {
    table.increments();
    table.string('item_id')
    table.string('item_name');
    table.string('brand_name');
    table.string('item_description');
    table.string("nf_ingredient_statement");
    table.float('nf_calories');
    table.float("nf_calories_from_fat");
    table.float("nf_total_fat");
    table.float("nf_saturated_fat");
    table.float("nf_monounsaturated_fat");
    table.float("nf_polyunsaturated_fat");
    table.float("nf_trans_fatty_acid");
    table.float("nf_cholesterol");
    table.float("nf_sodium");
    table.float("nf_total_carbohydrate");
    table.float("nf_dietary_fiber");
    table.float("nf_sugars");
    table.float("nf_protein");
    table.integer("nf_vitamin_a_dv");
    table.integer("nf_vitamin_c_dv");
    table.integer("nf_calcium_dv");
    table.integer("nf_iron_dv");
    table.float("nf_potassium")
    table.float("nf_servings_per_container");
    table.float("nf_serving_size_qty");
    table.string("nf_serving_size_unit");
    table.float("nf_serving_weight_grams");
  });

  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('email');
    table.string('password');
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals');
  return knex.schema.dropTable('users');
};
