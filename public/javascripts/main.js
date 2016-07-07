var app = angular.module('mealTracker', ['ngRoute', 'ui.bootstrap.datetimepicker']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "../partials/search.html",
    controller: "IndexController"
  })
  .when("/item", {
    templateUrl: "../partials/item.html",
    controller: "ItemController"
  })
})
