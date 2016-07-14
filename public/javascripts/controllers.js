
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

app.controller("DashController", ['$scope', function($scope) {
  $scope.view = {};
  $scope.view.HIToday = 47;

  $scope.data = [{
    key: "Cumulative Return",
    values: [
        { "label" : "A" , "value" : -29.765957771107 },
        { "label" : "B" , "value" : 0 },
        { "label" : "C" , "value" : 32.807804682612 },
        { "label" : "D" , "value" : 196.45946739256 },
        { "label" : "E" , "value" : 0.19434030906893 },
        { "label" : "F" , "value" : -98.079782601442 },
        { "label" : "G" , "value" : -13.925743130903 },
        { "label" : "H" , "value" : -5.1387322875705 }
        ]
    }]
  $scope.options = {
    chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
            return d3.format(',.4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'X Axis'
        },
        yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: 30
        }
    }
  }
}]);
