angular.module('app.controllers', [])
  
.controller('inicialCtrl', function($scope, $http) {
	
	$http.get("https://trabalhopervasiva.herokuapp.com/mensagem/api/get")
	  	.success(function(result){
	    $scope.resultado = result;
	})
	.error(function(result){
	    alert('Erro na requisição ' +result);
	});

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
 