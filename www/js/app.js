// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// Database instance.
var db;

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova'])

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

    // Important!!
    // 
    // Instantiate database file/connection after ionic platform is ready.
    //
    try {
      db = $cordovaSQLite.openDB({name:"nextflow.db",location:'default'});
    } catch (error) {
      alert(error);
    }
    
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS paciente (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf TEXT, doenca TEXT, tratamento TEXT, nascimento TEXT)');
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS mensagens (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, conteudo TEXT, imagem TEXT)');

    var controle_login;

    $cordovaSQLite.execute(db, 'SELECT * FROM paciente')
          .then(
              function(res) {

                  if (res.rows.length > 0) {
                    //alert("segundo uso");
                     $state.go('menu.inicial');
                  }if (res.rows.length == 0) {
                    alert("primeiro uso");
                    $state.go('login');
                  }
              },
              function(error) {
                  alert("Error on loading: " + error.message);
              }
          );
  
  });
})
