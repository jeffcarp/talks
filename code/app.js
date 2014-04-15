window.app = angular.module('app', ['ngRoute', 'firebase'])

.value('firebaseURI', 'https://catcafe.firebaseio.com/')

.config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/orders', {
      controller: 'ordersCtrl',
      templateUrl: 'orders.html'
    })
    .when('/', {
      controller: 'homeCtrl',
      templateUrl: 'home.html'
    })

})

.controller('homeCtrl', function($scope) {
  $scope.price = 12;
  $scope.discount = 0.3;

  $scope.cats = [
    {name: 'Bigglesworth'},
    {name: 'Mr. Fluffles'},
    {name: 'Gorby Puff Puff'}
  ];

  $scope.discountedPrice = function() {
    return $scope.price * (1 - $scope.discount);
  };
})

.controller('ordersCtrl', function($scope, Orders) {
  $scope.orders = Orders;
  $scope.newOrder = '';

  $scope.placeOrder = function() {
    if ($scope.orderForm.$invalid) {
      return alert('Please fill in your order');
    }
    Orders.$add($scope.newOrder, function() {
      $scope.newOrder = '';
    });
  };
})

.factory('Orders', function($firebase, firebaseURI) {
  return $firebase(new Firebase(firebaseURI+'orders'));
})

.filter('usd', function() {
  return function(str) {
    return '$'+Number(str).toFixed(2);
  };
})
