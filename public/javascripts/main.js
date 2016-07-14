var app = angular.module('mealTracker', ['ngRoute', 'ui.bootstrap.datetimepicker', 'nvd3']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/search", {
    templateUrl: "../partials/search.html",
    controller: "IndexController"
  })
  .when("/item", {
    templateUrl: "../partials/item.html",
    controller: "ItemController"
  })
  .when("/dashboard", {
    templateUrl: "../partials/dash.html",
    controller: "DashController"
  })
})
