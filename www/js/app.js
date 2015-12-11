(function() {

var app = angular.module('starter', ['ionic', 'ngCordova']);

app.controller('GeoCtrl', function($scope, $cordovaGeolocation, $ionicPlatform) {

  var map;
  function initMap(coords) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: coords.latitude, lng: coords.longitude},
      zoom: 8
    });
  }

  $ionicPlatform.ready(function() {
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function(position) {
        $scope.coords = position.coords;
        initMap($scope.coords);
      }, function(err) {
        console.log('getCurrentPosition error: '+ angular.toJson(err));
      });
  });

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


}());
