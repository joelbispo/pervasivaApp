angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.inicial', {
    url: '/inicial',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inicial.html',
        controller: 'inicialCtrl'
      }
    }
  })

  .state('menu.perfil', {
    url: '/perfil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu.informativos', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/informativos.html',
        controller: 'informativosCtrl'
      }
    }
  })

  .state('menu.grupos', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/grupos.html',
        controller: 'gruposCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.verificarUsuRioPrXimo', {
    url: '/verificausuario',
    views: {
      'side-menu21': {
        templateUrl: 'templates/verificarUsuRioPrXimo.html',
        controller: 'verificarUsuRioPrXimoCtrl'
      }
    }
  })

  .state('menu.workspace', {
    url: '/workspace',
    views: {
      'side-menu21': {
        templateUrl: 'templates/workspace.html',
        controller: 'workspaceCtrl'
      }
    }
  })

  .state('login', {
    url: '/page7',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/page7')

  

});