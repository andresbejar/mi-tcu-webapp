'use strict';

angular.module('miTcuApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngFileUpload'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/about', {
        templateUrl: 'partials/about'
      })
      .when('/faq', {
        templateUrl: 'partials/faq'
      })
      .when('/profile', {
        templateUrl: 'partials/profile',
        controller: 'ProfileCtrl',
        authenticate: true
      })
      .when('/proyectos',{
        templateUrl: 'partials/proyectos',
        controller: 'ProyectosCtrl'
      })
      .when('/upload', {
        templateUrl: 'partials/upload',
        controller: 'UploadCtrl',
        authenticate: true
      })
      .when('/proyecto/:id', {
        templateUrl: 'partials/proyecto',
        controller: 'ProyectoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);


    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });
