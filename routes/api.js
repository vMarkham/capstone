'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var knex = require('../db/knex');

function Meals() {
  return knex('meals');
}

function Users() {
  return knex('users');
}

function UsersMeals() {
  return knex('users_meals');
}

var appId = "2e490b77";
var appKey = "3cc14373f6fdb75a31981548dbdcdfec";

router.get('/:query', function(req, res, next) {
var fields = "item_name,item_description,brand_name,nf_calories,nf_total_fat,images_front_full_url,nf_ingredient_statement"
var reqUrl = `https://api.nutritionix.com/v1_1/search/${req.params.query}?results=0:20&fields=${fields}&appId=${appId}&appKey=${appKey}`;
console.log(reqUrl);
  request({
  uri: reqUrl,
    method: "GET",
    timeout: 10000
  }, function(error, response, body) {
    res.send(body)
  });
})

router.get('/id/:itemId', function(req, res, next) {
  var nutritionixItemAPI = 'https://api.nutritionix.com/v1_1/item?id='
  var reqUrl = `${nutritionixItemAPI}${req.params.itemId}&appId=${appId}&appKey=${appKey}`;
  request({
    uri: reqUrl,
    method: "GET",
    timeout: 10000
  }, function(error, response, body) {
    res.send(body)
  });
})

router.post('/meal', function(req, res ,next) {
  console.log(req.body);
  var nutritionixItemAPI = 'https://api.nutritionix.com/v1_1/item?id='
  var reqUrl = `${nutritionixItemAPI}${req.body.itemId}&appId=${appId}&appKey=${appKey}`;
  request({
    uri: reqUrl,
    method: "GET",
    timeout: 10000
  }, function(error, response, body) {
    Meals().insert({
      item_id: req.body.itemId,
      item_name: body.item_name,
      brand_name: body.brand_name,
      item_description: body.item_description,
      nf_ingredient_statement: body.nf_ingredient_statement,
      nf_calories: body.nf_calories,
      nf_calories_from_fat: body.nf_calories_from_fat,
      nf_total_fat: body.nf_total_fat,
      nf_saturated_fat: body.nf_saturated_fat,
      nf_monounsaturated_fat: body.nf_monounsaturated_fat,
      nf_polyunsaturated_fat: body.nf_polyunsaturated_fat,
      nf_trans_fatty_acid: body.nf_trans_fatty_acid,
      nf_cholesterol: body.nf_cholesterol,
      nf_sodium: body.nf_sodium,
      nf_total_carbohydrate: body.nf_total_carbohydrate,
      nf_dietary_fiber: body.nf_dietary_fiber,
      nf_sugars: body.nf_sugars,
      nf_protein: body.nf_protein,
      nf_vitamin_a_dv: body.nf_vitamin_a_dv,
      nf_vitamin_c_dv: body.nf_vitamin_c_dv,
      nf_calcium_dv: body.nf_calcium_dv,
      nf_iron_dv: body.nf_iron_dv,
      nf_potassium: body.nf_potassium,
      nf_servings_per_container: body.nf_servings_per_container,
      nf_serving_size_qty: body.nf_serving_size_qty,
      nf_serving_size_unit: body.nf_serving_size_unit,
      nf_serving_weight_grams: body.nf_serving_weight_grams
    })
    res.json({message: "success"})
  });
})

module.exports = router;
