## Let's talk about dependency injection

- Dependency injection -- or DI -- is a powerful way of requiring modules, similar to CommonJS, Browserify, AMD
- In Angular all you need to inject a dependency is to pass it as a parameter to your controller or service

We just saw DI in action above when we passed `$scope` into our `welcomeCtrl`.

```javascript
// Angular reads the parameters and injects them for you to use
app.controller('catsCtrl', function($scope, $location, CatService) {

  $scope.inc = function(x) {
    return x + 1;
  };

  $scope.addACat = function(catName) {
    CatService.add({
      name: catName
    });
  };
});
```

You can use DI with:

```javascript
// Providers

// Services
ourApp.factory('ourService', function(CatService) {
});

// Directives
ourApp.directive('ourDirective', function(CatService) {
});

// Filters
ourApp.filter('ourFilter', function(CatService) {
});

// Run
