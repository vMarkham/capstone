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
    });
  }
})
