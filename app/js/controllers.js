'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', '$firebase', 'FIREBASE_URL', function($scope, $firebase, FIREBASE_URL) {
    // create firebase data
    var partiesRef = new Firebase(FIREBASE_URL + 'parties');
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
  .controller('AuthController', ['$scope', '$firebaseSimpleLogin', '$location', 'FIREBASE_URL', 'authService', function($scope, $firebaseSimpleLogin, $location, FIREBASE_URL, authService) {
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);
    $scope.user = {email: '', password: ''};
    $scope.register = function() {
      auth.$createUser($scope.user.email, $scope.user.password).then(function(data) {
        console.log(data);
        $scope.login();
      });
    };

    $scope.login = function() {
      authService.login($scope.user);
    };

    $scope.logout = function() {
      auth.$logout();
      $location.path('/');
    };
  }]);