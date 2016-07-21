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
      type: 'historicalBarChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 40,
        left: 55
      },
      focusEnable: false,
      x: function(d){return d[0];},
      y: function(d){return d[1];},
      showValues: true,
      valueFormat: function(d){
        return d3.format(',.1f')(d);
      },
      xAxis: {
        axisLabel: 'Weekdays',
        tickFormat: function(d){
          return d3.time.format("%a")(new Date(d));

        }
      },
      yAxis: {
        axisLabel: 'Healh index',
        tickFormat: function(d){
          return d3.format('.02f')(d);
        },
        axisLabelDistance: -10
      },
      callback: function(chart){
        console.log("!!! lineChart callback !!!");
      }
    },
    title: {
      enable: true,
      text: 'Average daily health index'
    },
    subtitle: {
      enable: true,
      text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
      css: {
        'text-align': 'center',
        'margin': '10px 13px 0px 7px'
      }
    },
    caption: {
      enable: true,
      html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
      css: {
        'text-align': 'justify',
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
    console.log(dateCount);
    for (var i = 0; i <= 7; i++) {
      var lunchbox = [];
      for (var j = 0; j < $scope.view.weekMeals.length; j++) {
        var thisMealDate = new Date($scope.view.weekMeals[j].date_time);
        thisMealDate.setHours(0,0,0,0);
        console.log("thismeal", thisMealDate);
        console.log("dateCount", dateCount);
        if (thisMealDate.getTime() == dateCount.getTime()) {
          lunchbox.push($scope.view.weekMeals[j]);
          console.log(thisMealDate.getTime() == dateCount.getTime());
        }
      }

      meals.push([dateCount, $scope.view.getAvgHI(lunchbox)])

      dateCount = new Date(dateCount);
      dateCount.setDate(dateCount.getDate() + 1);
    }
    //Data is represented as an array of {x,y} pairs.
    // for (var i = 0; i < $scope.view.weekMeals.length; i++) {
    //   console.log($scope.view.weekMeals[i].date_time);
    //   meals.push([new Date($scope.view.weekMeals[i].date_time).setHours(0,0,0,0),
    //               $scope.view.weekMeals[i].health_index]);
    // }

    //Line chart data should be sent as an array of series objects.
    return [
      {
        values: meals,      //values - represents the array of {x,y} data points
        bar: true,
        key: 'This weeks health index' //key  - the name of the series.
        // color: '#ff7f0e'  //color - optional: choose your own line color.
      }
    ];
  };

}]);
