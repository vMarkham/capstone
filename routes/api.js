'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');

var appId = "2e490b77";
var appKey = "3cc14373f6fdb75a31981548dbdcdfec";

router.get('/:query', function(req, res, next) {
var reqUrl = "https://api.nutritionix.com/v1_1/search/" + req.params.query + "?results=0:20&fields=item_name,item_description,brand_name,nf_calories,nf_total_fat,images_front_full_url,nf_ingredient_statement&appId=2e490b77&appKey=3cc14373f6fdb75a31981548dbdcdfec";
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

module.exports = router;
