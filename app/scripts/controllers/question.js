'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  .controller('QuestionCtrl', function ($interval, $http, $scope, $rootScope, $filter,$window,$timeout) {
if(localStorage.getItem("quiz-token")){
  $rootScope.login=true;
  }
  else{
    $rootScope.login=false;
  }
  active();
  $scope.counter = 0;
  var stopped;

   $scope.timerRunning = false;

  //timeout function
  //1000 milliseconds = 1 second
  //Every second counts
  //Cancels a task associated with the promise. As a result of this, the //promise will be resolved with a rejection.
  function active() {
      $scope.timerRunning = true;
      stopped = $timeout(function() {
         //console.log($scope.counter);
       $scope.counter++;
       active();
      }, 1000);
    };


  // $scope.stop = function(){
  //
  // };

  $scope.teste = function(){
          console.log($scope.counter);
      };

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
        $scope.timerRunning = false;
        $timeout.cancel(stopped);
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
