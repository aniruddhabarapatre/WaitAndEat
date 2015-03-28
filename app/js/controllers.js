'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', 'partyService', 'textMessageService', function($scope, partyService, textMessageService) {
    $scope.parties = partyService.parties;
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    $scope.saveParty = function() {
      partyService.saveParty($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    };

    // Send text message to party
    $scope.sendSMS = function(party) {
      textMessageService.sendTextMessage(party);
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