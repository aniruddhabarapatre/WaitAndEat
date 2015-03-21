'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {
    // create firebase data
    var partiesRef = new Firebase('https://waitandeat-angular.firebaseio.com/');
    // new object that represents data
    $scope.parties = $firbase(partiesRef);
    $scope.party = {name: '', phone: '', size: ''};
    $scope.saveParty = function() {
      // adding data to firebase
      $scope.parties.$add($scope.party);
      $scope.party = {name: '', phone: '', size: ''};
    };
  }]);