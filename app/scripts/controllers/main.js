'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  .controller('MainCtrl', function ($scope,$location,$route,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if(localStorage.getItem("quiz-token")){
      console.log("karam");
      $rootScope.login=true;
      }
      else{
        $rootScope.login=false;
      }
    $scope.redirect = function(){
      if(localStorage.getItem("quiz-token")){
        $location.path('/questions');}
        else{
          $location.path('/login');
        }
    };
    $scope.loginRedirect=function(){
      $location.path('/login');
    }
    $scope.logout=function(){
      localStorage.setItem("quiz-token","");
      $location.path("/");
      $route.reload();
    }
  });
