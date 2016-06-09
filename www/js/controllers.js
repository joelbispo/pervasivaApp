angular.module('app.controllers', ['ngCordova'])
  
.controller('inicialCtrl', function($scope, $http) {
	
	$http.get("https://trabalhopervasiva.herokuapp.com/mensagem/api/get")
	  	.success(function(result){
	    $scope.resultado = result[result.length - 1];
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
   
.controller('informativosCtrl', function($scope, $http) {

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
   
.controller('gruposCtrl', function($scope) {

})
      
.controller('verificarUsuRioPrXimoCtrl', function($scope) {

})
   
.controller('workspaceCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope, $state, $http, $cordovaSQLite) {


	$scope.login = function(){
		if($scope.cpf!=null){
			var info = {cpf: $scope.cpf};
		    $scope.cpf = '';

		   	var link = 'https://trabalhopervasiva.herokuapp.com/api/login.php';

	        $http.post(link, info).then(function (res){
	            if(res.data=="null"){
	            	alert("Seu CPF não foi encontrado! Por favor, contate o Administrador");
	            }else{
	            	$scope.resultado = res;
	           		console.log(res.data.nome);
	            	$state.go('menu.inicial');
	            }
	        });
		}else{
			alert("Insira seu CPF!");
		}
		
	};

})
 