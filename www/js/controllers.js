angular.module('app.controllers', ['ngCordova'])

.controller('inicialCtrl', function($scope, $http, $cordovaSQLite, $cordovaGeolocation) {
	//requisicao de mensagens
	$http.get("https://trabalhopervasiva.herokuapp.com/mensagem/api/get")
	  	.success(function(result){
	    $scope.resultado = result[result.length - 1];
	})
	.error(function(result){
	    //alert('Erro na requisição ' +result);
	});

	//busca na tabela de pacientes
    $cordovaSQLite.execute(db, 'SELECT * FROM paciente')
        .then(
            function(res) {

                if (res.rows.length > 0) {

                	//busca das coordenadas atuais do paciente
                	var posOptions = {timeout: 10000, enableHighAccuracy: false};
					$cordovaGeolocation
					    .getCurrentPosition(posOptions)
					    .then(function (position) {
					      var lat  = position.coords.latitude
					      var lon = position.coords.longitude
					      $scope.latitude = lat;
					      $scope.longitude = lon;
					      //alert(lat+" "+lon+" "+res.rows.item(0).cpf);
					   $cordovaSQLite.execute(db, 'UPDATE paciente SET latitude = ?, longitude = ? WHERE cpf = ?', [lat,lon,res.rows.item(0).cpf])
			            .then(function(result) {
			                //alert("coordenadas salvas"+ lat+" "+lon);
			            }, function(error) {
			                $scope.statusMessage = "Error on saving: " + error.message;
			                //alert("Error on saving: " + error.message);
			            })

					      var item = {cpf: res.rows.item(0).cpf, latitude: lat, longitude: lon};
					      var link = 'https://trabalhopervasiva.herokuapp.com/api/post.php';

					      //envio do post com as informacoes atuais do paciente
					      $http.post(link, item).then(function (res){
				              //alert(res.data);
				          });

					    }, function(err) {
					      // error
					    });

                    $scope.nome = res.rows.item(0).nome;
                    $scope.cpf = res.rows.item(0).cpf;
                    $scope.doenca = res.rows.item(0).doenca;
                    $scope.tratamento = res.rows.item(0).tratamento;
                    $scope.nascimento = res.rows.item(0).nascimento;
                    $scope.latitude = res.rows.item(0).latitude;
                    $scope.longitude = res.rows.item(0).longitude;





                }
            },
            function(error) {
                alert("Error on loading: " + error.message);
            }
        );

	//faz o refresh nas mensagens
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

	  var watchOptions = {
	    timeout : 3000,
	    enableHighAccuracy: false // may cause errors if true
	  };

	    var watch = $cordovaGeolocation.watchPosition(watchOptions);
		  watch.then(
		    null,
		    function(err) {
		      // error
		    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.latitude = lat;
	  $scope.longitude = long;
  });


  watch.clearWatch();

})
   
.controller('perfilCtrl', function($scope, $cordovaSQLite) {

    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, 'SELECT * FROM paciente')
        .then(
            function(res) {

                if (res.rows.length > 0) {

                    $scope.nome = res.rows.item(0).nome;
                    $scope.cpf = res.rows.item(0).cpf;
                    $scope.doenca = res.rows.item(0).doenca;
                    $scope.tratamento = res.rows.item(0).tratamento;
                    $scope.nascimento = res.rows.item(0).nascimento;

                    
                }
            },
            function(error) {
                alert("Error on loading: " + error.message);
            }
        );

})
   
.controller('informativosCtrl', function($scope, $http, $timeout, $cordovaFileTransfer, $cordovaSQLite, $ionicLoading) {
	
	$scope.listMensagem= [];

	function SalvarMensagem(item, index) {
    //console.log("index[" + index + "]: " + item.id);
    $cordovaSQLite.execute(db, 'SELECT * FROM mensagens WHERE id = (?)', item.id)
              .then(
                  function(res) {
                      if (res.rows.length > 0) {
                      //mensagem já existe
                      }else{
                          //novo
		                  $cordovaSQLite.execute(db, 'INSERT INTO mensagens (id, titulo, conteudo, imagem) VALUES (?,?,?,?)', [item.id, item.titulo, item.conteudo, item.imagem])
		                    .then(function(result) {
		                        //alert("Message saved successful, cheers! id: "+item.id);
		                    }, function(error) {
		                       // alert("Error on saving: " + error.message);
		                    })    
                      } 
                  },
                  function(error) {
                      //alert("Error on loading: " + error.message);
                  }
              );      

  	}  

  	$ionicLoading.show();
	$http.get("https://trabalhopervasiva.herokuapp.com/mensagem/api/get")
		.success(function(result){
			$scope.resultado = result;
			result.forEach(SalvarMensagem);
			$ionicLoading.hide();
			// Execute SELECT statement to load message from database.
				$cordovaSQLite.execute(db, 'SELECT * FROM mensagens')
					        .then(
					            function(res) {

					                if (res.rows.length > 0) {
					                  for (var i=0; i<res.rows.length; i++) {
					                     //console.log("Product ID: " + res.rows.item(i).productID + " Product Name : " + res.rows.item(i).productName);
					                     $scope.listMensagem.push(res.rows.item(i));
					                     $ionicLoading.hide();
					                  }
					               }
					            },
					            function(error) {
					                alert("Error on loading: " + error.message);
					            }
					        );     
			//$scope.listMensagem.push(result);
		})
		.error(function(result){
		    alert('Erro na requisição ' +result);
		    // Execute SELECT statement to load message from database.
				$cordovaSQLite.execute(db, 'SELECT * FROM mensagens')
					        .then(
					            function(res) {

					                if (res.rows.length > 0) {
					                  for (var i=0; i<res.rows.length; i++) {
					                     //console.log("Product ID: " + res.rows.item(i).productID + " Product Name : " + res.rows.item(i).productName);
					                     $scope.listMensagem.push(res.rows.item(i));
					                     $ionicLoading.hide();
					                  }
					               }
					            },
					            function(error) {
					                alert("Error on loading: " + error.message);
					            }
					        );   
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
   
.controller('gruposCtrl', function($scope, $state) {
	
	$scope.redirecionar = function(){
		$state.go('menu.verificarUsuRioPrXimo');
	}
	
})
      
.controller('verificarUsuRioPrXimoCtrl', function($scope, $http, $ionicLoading, $cordovaSQLite) {

    $scope.buscar_proximo = function(){
 
     	// Execute SELECT statement to load message from database.
	    $cordovaSQLite.execute(db, 'SELECT * FROM paciente')
	        .then(
	            function(res) {

	                if (res.rows.length > 0) {
	                	
	                   lat = res.rows.item(0).latitude;
	                   lon = res.rows.item(0).longitude;

	                   	var item = {latitude: res.rows.item(0).latitude, longitude: res.rows.item(0).longitude}; 	
					   	var link = "http://trabalhopervasiva.herokuapp.com/api/proximo.php";

					    $http.post(link, item).then(function (res){
				          	$scope.resultado = res.data;
				      	}); 
					           	        
	                }
	            },
	            function(error) {
	                alert("Error on loading: " + error.message);
	            }
	        );
  

    }    

    $scope.save = function() {
      var array = [];
      for(i in $scope.checkItems) {
          //console.log($scope.checkItems[i]);
          if($scope.checkItems[i] == true) {
              array.push(i);
          }
      }
      //console.log(array);
      array.push(identificador);

      var link = 'https://trabalhopervasiva.herokuapp.com/api/workspace.php';

      $http.post(link, array).then(function (res){
         // alert(res.data);
      });
  	}

})
   
.controller('workspaceCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope, $state, $http, $cordovaSQLite, $ionicLoading, $cordovaGeolocation) {

	$scope.login = function(){

		if($scope.cpf!=null){
			var info = {cpf: $scope.cpf};
		    $scope.cpf = '';

		   	var link = 'https://trabalhopervasiva.herokuapp.com/api/login.php';

		   	$ionicLoading.show();
	        $http.post(link, info).then(function (res){
	            if(res.data=="null"){
	            	$ionicLoading.hide();
	            	alert("Seu CPF não foi encontrado! Por favor, contate o Administrador");
	            }else{
	            	$scope.resultado = res;
	            	$scope.nome = res.data[1];
	           		console.log(res.data[0]+" "+res.data[1] + " "+res.data[2]+ " "+res.data[3]+ " "+res.data[4]+ " "+res.data[5] );
	            	
	           		// execute INSERT statement with parameter
			        $cordovaSQLite.execute(db, 'INSERT INTO paciente (id,nome,cpf,doenca,tratamento,nascimento) VALUES (?,?,?,?,?,?)', [res.data[0],res.data[1],res.data[2],res.data[3],res.data[4],res.data[5]])
			            .then(function(result) {
			                $scope.statusMessage = "Message saved successful, cheers!";
			            }, function(error) {
			                $scope.statusMessage = "Error on saving: " + error.message;
			                alert("Error on saving: " + error.message);
			            })
			        $ionicLoading.hide();    
	            	alert("Bem vindo, "+res.data[1]);
	       
	            	$state.go('menu.inicial');
	            }
	        });
		}else{
			alert("Insira seu CPF!");
		}
		
	};

})

