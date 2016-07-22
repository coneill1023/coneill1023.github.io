angular.module('app')
  .controller('mainController', function($scope, mainService, $timeout) {

    $scope.reset = function() {
      $scope.inputUsername = undefined;
      $scope.inputSecret= undefined;
      $scope.city= undefined;
      $scope.reportSuites= undefined;
      $scope.urls.report_suites = false;
      $scope.selectMetrics= undefined;
      $scope.metrics = false;
      $scope.selectElements= undefined;
      $scope.elements = false;
      $scope.reportObject = false;
      $scope.urlReport = false;
    };

    $scope.endpoints = [
        {name:'San Jose', value:'api.omniture.com'},
        {name:'Dallas', value:'api2.omniture.com'},
        {name:'London', value:'api3.omniture.com'},
        {name:'Singapore', value:'api4.omniture.com'}
      ];
    $scope.method = 'Company.GetReportSuites';
    $scope.params = {};
    $scope.spinner = false;
    $scope.sendEndpoint = function() {
      $scope.spinner = true;
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
          $scope.spinner = false;
        })
    };
    $scope.getMetrics = function() {
      $scope.spinner = true;
      $scope.params2 = '{"reportSuiteID":' + '"' + $scope.reportSuites + '"}';
      $scope.method2 = 'Report.GetMetrics';
        mainService.GetReportSuites($scope.username,$scope.secret,$scope.method2,$scope.params2,$scope.endpoint)
        .then(function (response) {
          console.log(response);
          $scope.metrics = JSON.parse(response);
          $scope.spinner = false;
        })
    };
    $scope.getElements = function() {
      $scope.spinner = true;
      $scope.params3 = '{"existingMetrics":["' + $scope.selectMetrics + '"],"reportSuiteID":' + '"' + $scope.reportSuites + '"}';
      $scope.method3 = 'Report.GetElements';
      console.log($scope.params3);
        mainService.GetReportSuites($scope.username,$scope.secret,$scope.method3,$scope.params3,$scope.endpoint)
        .then(function (response) {
          console.log(response);
          $scope.elements = JSON.parse(response);
          $scope.spinner = false;
        })
    };
    $scope.getReportID = function() {
      $scope.spinner = true;
      $scope.params4 = '{"reportDescription":{"reportSuiteID":' + '"' + $scope.reportSuites + '","metrics":[{"id":"' + $scope.selectMetrics + '"}],"elements":[{"id":"' + $scope.selectElements + '","top":"' + $scope.selectNumber + '"}]}}'
      $scope.method4 = 'Report.Queue';
      console.log($scope.params4);
        mainService.GetReportSuites($scope.username,$scope.secret,$scope.method4,$scope.params4,$scope.endpoint)
        .then(function (response) {
          console.log(response);
          $timeout(function(){$scope.reportObject = JSON.parse(response)}, 3000);
          $scope.spinner = false;
        })
    };
    $scope.getUrlReport = function() {
      $scope.spinner = true;
      $scope.method5 = 'Report.Get';
      console.log($scope.reportObject);
        mainService.GetReportSuites($scope.username,$scope.secret,$scope.method5,$scope.reportObject,$scope.endpoint)
        .then(function (response) {
          console.log(response);
          $scope.urlReport = JSON.parse(response);
          $scope.spinner = false;
        })
    };

    $scope.sendToOp = function() {
    var urls = $scope.urlReport.report.data.map(function(item){
      return item.name;
    })
      console.log(urls);
      var data = {
        "name": "IBM 50K URL Audit",
        "recipients": ["chris.oneill@observepoint.com"],
        "property_id": "13841",
        "limit": "50,000",
        "next_run": "2016-07-29T00:00:00",

        // "name": $scope.auditName,
        // "recipients": [$scope.recipients],
        // "property_id": $scope.propId,
        // "limit": $scope.limit,
        // "next_run": $scope.nextRun,
        "starting_urls": urls,
      }
      mainService.SendReportUrls(data)
      .then(function (response) {
        console.log(response);
        alert("Success");
        $scope.finalResponse = response.data
      })
    }
});
