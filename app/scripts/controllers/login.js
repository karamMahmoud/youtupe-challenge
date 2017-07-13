'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  .controller('loginCtrl', function($scope, $http,$location,$rootScope,$mdDialog) {
    if(localStorage.getItem("quiz-token")){
      $rootScope.login=true;
      }
      else{
        $rootScope.login=false;
      }
    $scope.credential = {
      email: '',
      password: ''
    };
    $scope.signIn = function() {
      $http.get('dummy-data/users.json').then(function(response) {
        $scope.data = response.data.users;
        var usernames = [];
        var passwords = [];
        for (var user in $scope.data) {
          usernames.push($scope.data[user].email);
          passwords.push($scope.data[user].password);
        }
        var flag=0;
      for(var username=0;username<usernames.length;username++){
        if($scope.credential.email== usernames[username]){
          flag=1;
          for(var password=0;password<passwords.length;password++){
            if($scope.credential.password==passwords[password]){
              flag=2;
              var index=password+1;
               localStorage.setItem("quiz-token",$scope.data['user'+index].token);
               $location.path('/');
              //  console.log($scope.data['user'+password].token);
            }
          }
        }
      }
        });
    };
    $scope.logout=function(){
      localStorage.setItem("quiz-token","");
      $location.path("/");
    }
  });
