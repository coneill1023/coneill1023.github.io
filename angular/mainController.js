angular.module('app')
  .controller('mainController', function($scope, mainService, $timeout) {

    $scope.endpoints = [
        {name:'San Jose', value:'api.omniture.com'},
        {name:'Dallas', value:'api2.omniture.com'},
        {name:'London', value:'api3.omniture.com'},
        {name:'Singapore', value:'api4.omniture.com'}
      ];
    $scope.method = 'Company.GetReportSuites';
    $scope.params = {};
    $scope.sendEndpoint = function() {
      $scope.username = $scope.inputUsername;
      $scope.secret = $scope.inputSecret;
      $scope.endpoint = $scope.city.value;
      console.log($scope.city.value);
    }

    $scope.getReports= function() {
        mainService.GetReportSuites($scope.username,$scope.secret,$scope.method,$scope.params,$scope.endpoint)
        .then(function (response) {
          console.log(response);
          $scope.urls = JSON.parse(response);
        })
    };
    $scope.getMetrics= function() {
      $scope.params2 = '{"reportSuiteID":' + '"' + $scope.reportSuites + '"}';
      $scope.method2 = 'Report.GetMetrics';
        mainService.GetReportSuites($scope.username,$scope.secret,$scope.method2,$scope.params2,$scope.endpoint)
        .then(function (response) {
          console.log(response);
          $scope.metrics = JSON.parse(response);
        })
    };
    $scope.getElements= function() {
      $scope.params3 = '{"existingMetrics":["' + $scope.selectMetrics + '"],"reportSuiteID":' + '"' + $scope.reportSuites + '"}';
      $scope.method3 = 'Report.GetElements';
      console.log($scope.params3);
        mainService.GetReportSuites($scope.username,$scope.secret,$scope.method3,$scope.params3,$scope.endpoint)
        .then(function (response) {
          console.log(response);
          $scope.elements = JSON.parse(response);
        })
    };
    $scope.getReportID = function() {
      $scope.params4 = '{"reportDescription":{"reportSuiteID":' + '"' + $scope.reportSuites + '","metrics":[{"id":"' + $scope.selectMetrics + '"}],"elements":[{"id":"' + $scope.selectElements + '","top":"' + $scope.selectNumber + '"}]}}'
      $scope.method4 = 'Report.Queue';
      console.log($scope.params4);
        mainService.GetReportSuites($scope.username,$scope.secret,$scope.method4,$scope.params4,$scope.endpoint)
        .then(function (response) {
          console.log(response);
          $scope.reportObject = JSON.parse(response);
        })
    };
    $scope.getUrlReport = function() {
      $scope.method5 = 'Report.Get';
      console.log($scope.reportObject);
        mainService.GetReportSuites($scope.username,$scope.secret,$scope.method5,$scope.reportObject,$scope.endpoint)
        .then(function (response) {
          console.log(response);
          $scope.urlReport = JSON.parse(response);
        })
    };
});
