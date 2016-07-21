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
