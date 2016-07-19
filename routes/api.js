'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var knex = require('../db/knex');
var fetch = require('node-fetch');


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

router.get('/history/week', function(req, res, next) {
  var today = new Date();
  var lastWeek = new Date();
  var thisWeekMeals = [];
  var todayMeals = [];
  console.log(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  console.log(lastWeek);
  UsersMeals().select().where("user_id", 0)
  .then(function(data) {
    var promises = data.map(function(userMeal) {
      return Meals()
      .first()
      .where('item_id', userMeal.meal_id)
      .then(function (meal) {
        meal.servings_eaten = userMeal.servings_eaten;
        meal.date_time = userMeal.date_time;
        meal.health_index = userMeal.health_index;
        if (meal.date_time >= lastWeek) {
          thisWeekMeals.push(meal);
        }
        if (meal.date_time.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
          todayMeals.push(meal);
        }
      })
    })
    return Promise.all(promises);
  }).then(function () {
    res.json({thisWeekMeals: thisWeekMeals, todayMeals: todayMeals});

  }).catch(function(err) {
    console.log(err);
  })
})


router.post('/meal', function(req, res ,next) {
  console.log(req.body);
  var nutritionixItemAPI = 'https://api.nutritionix.com/v1_1/item?id='
  var reqUrl = `${nutritionixItemAPI}${req.body.itemId}&appId=${appId}&appKey=${appKey}`;
  fetch(reqUrl)
    .then(function(res) {
      return res.json();
    }).then(function(json){
      console.log(json);
      Meals().insert({
        item_id: req.body.itemId,
        item_name: json.item_name,
        brand_name: json.brand_name,
        item_description: json.item_description,
        nf_ingredient_statement: json.nf_ingredient_statement,
        nf_calories: json.nf_calories,
        nf_calories_from_fat: json.nf_calories_from_fat,
        nf_total_fat: json.nf_total_fat,
        nf_saturated_fat: json.nf_saturated_fat,
        nf_monounsaturated_fat: json.nf_monounsaturated_fat,
        nf_polyunsaturated_fat: json.nf_polyunsaturated_fat,
        nf_trans_fatty_acid: json.nf_trans_fatty_acid,
        nf_cholesterol: json.nf_cholesterol,
        nf_sodium: json.nf_sodium,
        nf_total_carbohydrate: json.nf_total_carbohydrate,
        nf_dietary_fiber: json.nf_dietary_fiber,
        nf_sugars: json.nf_sugars,
        nf_protein: json.nf_protein,
        nf_vitamin_a_dv: json.nf_vitamin_a_dv,
        nf_vitamin_c_dv: json.nf_vitamin_c_dv,
        nf_calcium_dv: json.nf_calcium_dv,
        nf_iron_dv: json.nf_iron_dv,
        nf_potassium: json.nf_potassium,
        nf_servings_per_container: json.nf_servings_per_container,
        nf_serving_size_qty: json.nf_serving_size_qty,
        nf_serving_size_unit: json.nf_serving_size_unit,
        nf_serving_weight_grams: json.nf_serving_weight_grams
      }).then(function() {
        if (1 - (json.nf_sugars/30 + json.nf_calories/800) / 2 < 0) {
          var healthIndex = 0;
        } else {
          var healthIndex = Math.floor((1 - (json.nf_sugars/30 + json.nf_calories/800) / 2) * 100); //total bs calculation
        }
        return UsersMeals().insert({
          user_id: 0,
          meal_id: req.body.itemId,
          servings_eaten: req.body.servingsEaten,
          date_time: req.body.mealDateTime,
          health_index: healthIndex
        })
      }).then(function() {
        res.json({message: "success"})
      }).catch(function(err) {
        console.log(err);
      })
    })
})

module.exports = router;
