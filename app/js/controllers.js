'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', 'partyService', function($scope, partyService) {
    $scope.parties = partyService.parties;
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    $scope.saveParty = function() {
      partyService.saveParty($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    };

    // Send text message to party
    $scope.sendSMS = function(party) {
      var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
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
  }])
  .controller('AuthController', ['$scope', 'authService', function($scope, authService) {
    // Object bound to inputs on register and login pages
    $scope.user = {email: '', password: ''};

    // register a new user
    $scope.register = function() {
      authService.register($scope.user);
    };

    $scope.login = function() {
      authService.login($scope.user);
    };

    $scope.logout = function() {
      authService.logout();
    };
  }]);