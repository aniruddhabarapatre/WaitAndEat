'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', 'partyService', 'textMessageService', 'authService', function($scope, partyService, textMessageService, authService) {
    // Bind users parties to $scope.parties
    authService.getCurrentUser().then(function(user) {
      if (user) {
        $scope.parties = partyService.getPartiesByUserId(user.id);
      }
    })
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    
    $scope.saveParty = function() {
      partyService.saveParty($scope.newParty, $scope.currentUser.id);
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    };

    // Send text message to party
    $scope.sendSMS = function(party) {
      textMessageService.sendTextMessage(party, $scope.currentUser.id);
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