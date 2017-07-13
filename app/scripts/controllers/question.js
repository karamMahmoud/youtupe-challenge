'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  .controller('QuestionCtrl', function ($interval, $http, $scope, $rootScope, $filter,$window) {
if(localStorage.getItem("quiz-token")){
  $rootScope.login=true;
  }
  else{
    $rootScope.login=false;
  }


      $scope.answered=false;
      $rootScope.grade = 0 ;
      var shuffleArray = function(array) {
        var m = array.length, t, i;
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        return array;
      }
      $scope.newTest=function(){
        $window.location.reload();
      }

      $http.get('/dummy-data/questions.json')
       .then(function(res){
          $scope.questions = shuffleArray(res.data);
        });

      $scope.data=[];
      $scope.submit = function(){
      $rootScope.grade = 0 ;
      $scope.answered=true;
      $scope.initQues = $filter('orderBy')($scope.questions, 'id');
        for (var i = 0; i < $scope.questions.length; i++) {
             if($scope.data[i] == $scope.initQues[i]['answer']){
                $rootScope.grade =$rootScope.grade+10;
            }
        }
      };
  });
