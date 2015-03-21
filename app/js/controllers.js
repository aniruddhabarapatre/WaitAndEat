'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {
    // create firebase data
    var partiesRef = new Firebase('https://waitandeat-angular.firebaseio.com/parties');
    // new object that represents data
    $scope.parties = $firebase(partiesRef);
    $scope.newParty = {name: '', phone: '', size: ''};
    $scope.saveParty = function() {
      // adding data to firebase
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: ''};
    };

    // Send text message to party
    $scope.sendSMS = function(phoneNumber) {
      var textMessageRef = new Firebase('https://waitandeat-angular.firebaseio.com/textMessages');
      var textMessages = $firebase(textMessageRef);
      textMessages.$add({phoneNumber: phoneNumber});
    };
  }]);