angular.module('app')
.service('mainService', function($q) {
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
})
