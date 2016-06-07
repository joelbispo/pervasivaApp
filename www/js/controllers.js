angular.module('app.controllers', [])
  
.controller('inicialCtrl', function($scope, $http) {
	
	$http.get("https://trabalhopervasiva.herokuapp.com/mensagem/api/get")
	  	.success(function(result){
	    $scope.resultado = result;
	})
	.error(function(result){
	    alert('Erro na requisição ' +result);
	});

	$scope.doRefresh = function() {
	    $http.get("https://trabalhopervasiva.herokuapp.com/mensagem/api/get")
	     .success(function(result) {
	       $scope.resultado = result;
	    })
	     .finally(function() {
	       // Stop the ion-refresher from spinning
	       $scope.$broadcast('scroll.refreshComplete');
	    });
	};

})
   
.controller('perfilCtrl', function($scope) {

})
   
.controller('informativosCtrl', function($scope) {

})
   
.controller('gruposCtrl', function($scope) {

})
      
.controller('verificarUsuRioPrXimoCtrl', function($scope) {

})
   
.controller('workspaceCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {

})
 