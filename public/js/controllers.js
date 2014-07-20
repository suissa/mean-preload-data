'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).
  controller('PreloadController', ['$scope', 
    function($scope){
      console.log('PreloadController beers', $scope.beers);
      $scope.atualizarBeers = function(beers){
        $scope.beers = beers;
        console.log('atualizarBeers beers', $scope.beers);
      }
  }]);














