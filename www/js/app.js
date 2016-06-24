var db;

var app = angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $state, $http, $timeout, $cordovaFileTransfer) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //banco sqlite é criado
    try {
      db = $cordovaSQLite.openDB({name:"nextflow.db",location:'default'});
    } catch (error) {
      alert(error);
    }
    
    //tabelas de paciente e de mensagens sao criados, caso elas nao existam
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS paciente (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf TEXT, doenca TEXT, tratamento TEXT, nascimento TEXT, latitude TEXT, longitude TEXT)');
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS mensagens (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, conteudo TEXT, imagem TEXT)');

    var controle_login;

    //controle de login de usuario
    $cordovaSQLite.execute(db, 'SELECT * FROM paciente')
          .then(
              function(res) {

                  if (res.rows.length > 0) {
                    //alert("segundo uso");
                     $state.go('menu.inicial');
                  }if (res.rows.length == 0) {
                    //alert("primeiro uso");
                    $state.go('login');
                  }
              },
              function(error) {
                  alert("Error on loading: " + error.message);
              }
          );
  
  });
})