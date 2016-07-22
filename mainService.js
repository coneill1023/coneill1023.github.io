angular.module('app')
.service('mainService', function($q, $http) {
    var wsse = new Wsse()

  this.GetReportSuites = function(username,secret,method,params,endpoint) {
        var url = 'https://'+endpoint+'/admin/1.4/rest/?method='+method
        var defer = $q.defer();
        console.log(arguments);

        var headers = wsse.generateAuth(username, secret);

        console.log(headers);
        $.ajax(url, {
            type:'POST',
            data: params,
            complete: function(obj,status){
              console.log(arguments);
              if(status!=="success"){
                console.log(obj);
                defer.reject(obj);
                alert("error");
              }else{
                defer.resolve(obj.responseText);
                console.log(obj);
              }
            },
            dataType: "text",
            headers: {
                'X-WSSE': headers['X-WSSE']
            }
        });

        return defer.promise;

  }

  this.SendReportUrls = function(data) {
      var config = {
      'X-ObservePoint-Key': '63b3625bf43bfd9126ce095c1d4686699a59f54b', 'Authorization': 'Basic'}

      var newObject = {
          requestUrl: "https://my.observepoint.com/api/audits",
          requestType: "POST",
          requestJson: JSON.stringify(data),
          requestKey: "63b3625bf43bfd9126ce095c1d4686699a59f54b"
      }
      return $http.post('http://localhost:8080', newObject)
      .then(function(response){
        return response;
      });
  }

})
