
app.controller('IndexController', function($scope, $http) {
  $scope.view = {};
  $scope.view.query = "";
  $scope.view.results = [];

  $scope.view.searchNx = function(query) {
    $http({
      method: 'GET',
      url: '/api/' + query
    }).then(function success(res) {
      $scope.view.results = res.data.hits;
      console.log(res.data);
    }, function error(res) {
      alert("fail");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
  }

})

app.controller("ItemController", function($scope, $http, $routeParams, $location) {
  $scope.view = {};
  $scope.view.itemDetail = {};
  $scope.view.submitData = {};
  $scope.view.submitData.mealDateTime = new Date();
  $scope.view.submitData.servingsEaten = 1;
  $scope.view.submitData.userId = 0;


  $scope.view.itemNx = function(itemId) {
    $http({
      method: "GET",
      url: '/api/id/' + itemId
    }).then(function success(res) {
      $scope.view.itemDetail = res.data;
      $scope.view.submitData.itemId = res.data.item_id;
      console.log($scope.view.itemDetail);
    }, function error(res) {
      alert("fail");
    })
  }
  $scope.view.submitForm = function() {

    console.log('click');
    $http({
      method: "POST",
      url: 'api/meal',
      data: $scope.view.submitData
    }).then(function success(res) {
      $location.path('/dashboard');
      console.log($scope.view.submitData)
    }, function error(res) {
      alert('failure');
    })
  }
  $scope.view.itemNx($routeParams.itemId);
})

app.controller("DashController", ['$scope', '$http', function($scope, $http) {
  $scope.view = {};
  $scope.view.HIToday = 47;
  $scope.view.todaysMeals = [];
  $scope.view.weeksMeals = [];
  $scope.view.getWeeksMeals = function() {
    $http({
      method: "GET",
      url: '/api/history/week'
    }).then(function success(res) {
      $scope.view.weeksMeals = res.data;
      console.log(res.data);
    }, function error(res) {
      alert("fail");
    })
  }
  $scope.view.getWeeksMeals();
}]);
