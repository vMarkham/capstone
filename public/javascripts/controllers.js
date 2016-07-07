
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

app.controller("ItemController", function($scope, $http, $routeParams) {
  $scope.view = {};
  $scope.view.itemDetail = {};
  $scope.view.submitData = {};
  $scope.view.submitData.mealDateTime = new Date();
  $scope.view.itemNx = function(itemId) {
    $http({
      method: "GET",
      url: '/api/id/' + itemId
    }).then(function success(res) {
      $scope.view.itemDetail = res.data;
      console.log($scope.view.itemDetail);
    }, function error(res) {
      alert("fail");
    })
  }
  $scope.view.itemNx($routeParams.itemId);
})
