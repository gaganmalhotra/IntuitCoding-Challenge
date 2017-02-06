app.service('dataService', function($http,$q) {
  this.getData = function() {
     deferred = $q.defer();
     $http({
         method: 'GET',
         url: 'http://localhost:1338/name'
     }).success(function(data){
         deferred.resolve(data);
     }).error(function(){
          deferred.reject(error);
     });
     return deferred.promise;
  }
});
