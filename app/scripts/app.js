'use strict';

/**
 * @ngdoc overview
 * @name bookmycabFrontendApp
 * @description
 * # bookmycabFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('bookmycabFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'toastr',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
