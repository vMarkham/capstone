app.controller("DashController", ['$scope', '$http', function($scope, $http) {
  $scope.view = {};
  $scope.view.HIToday = 0;
  $scope.view.todayMeals = [];
  $scope.view.weekMeals = [];
  $scope.data = [];
  $scope.view.getWeeksMeals = function() {
    $http({
      method: "GET",
      url: '/api/history/week'
    }).then(function success(res) {
      $scope.view.weekMeals = res.data.thisWeekMeals;
      $scope.view.todayMeals = res.data.todayMeals;
      $scope.view.HIToday = $scope.view.getAvgHI($scope.view.todayMeals);
      console.log(res.data);
      $scope.data = formatWeek();
      $scope.options = setOptions();
      console.log("data:", $scope.data);

    }, function error(res) {
      alert("fail");
    })
  }
  $scope.view.getAvgHI = function(meals) {
    var total = 0;
    if (meals.length == 0) {
      return 0;
    }
    for (var i = 0; i < meals.length; i++) {

      total += meals[i].health_index;
    }
    return total / meals.length;
  }
  $scope.view.getWeeksMeals();

  //angular nvd3 chart options

  function setOptions() {
    return {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){return d[0];},
        y: function(d){return d[1];},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.1f')(d);
        },
        xAxis: {
          axisLabel: 'Weekday',
          tickFormat: function(d){
            return d3.time.format("%A")(new Date(d));

          },
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Healh index',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        },
        callback: function(chart){
        }
      },
      title: {
        enable: true,
        text: 'Average Health Index'
      },
      subtitle: {
        enable: true,
        text: 'Average health index for the past week.',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      }
    };
  }

  //angular-nvd3 Data Formatting
  function formatWeek() {
    var meals = [];
    var dateCount = new Date();
    dateCount.setDate(dateCount.getDate() - 7);
    dateCount.setHours(0,0,0,0);
    for (var i = 0; i <= 7; i++) {
      var lunchbox = [];
      for (var j = 0; j < $scope.view.weekMeals.length; j++) {
        var thisMealDate = new Date($scope.view.weekMeals[j].date_time);
        thisMealDate.setHours(0,0,0,0);
        if (thisMealDate.getTime() == dateCount.getTime()) {
          lunchbox.push($scope.view.weekMeals[j]);
          console.log(thisMealDate.getTime() == dateCount.getTime());
        }
      }
      meals.push([dateCount, $scope.view.getAvgHI(lunchbox)])
      dateCount = new Date(dateCount);
      dateCount.setDate(dateCount.getDate() + 1);
    }
    //return bar chart data
    return [
      {
        values: meals,
        bar: true,
        key: 'This weeks health index'
      }
    ];
  };

}]);
