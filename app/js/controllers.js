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
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    $scope.saveParty = function() {
      // adding data to firebase
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    };

    // Send text message to party
    $scope.sendSMS = function(party) {
      var textMessageRef = new Firebase('https://waitandeat-angular.firebaseio.com/textMessages');
      var textMessages = $firebase(textMessageRef);
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };
      textMessages.$add(newTextMessage);
      party.notified = 'Yes';
      scope.parties.$save(party.$id);
    };
  }]);