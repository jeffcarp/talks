## Controllers

In Angular, scope is the way templates and controllers interact.

- Controllers manage $scope, among other things.
- Can be nested, but probably a better idea to use directives for that.

First, let's create a file `app.js` and initialize our Angular app.

```javascript
window.app = angular.module('app', []);
```

Now that we've decided to call our app 'app', we need to tell our `ng-app` directive.

```html
<body ng-app="app">
  ...
</body>
```

Now we're ready for a controller. Let's put all of our current elements in body into a controller called `homeCtrl`.

```html
<div ng-controller="homeCtrl">

  <h1>Our Cat Cafe</h1>

  <h2>Today's guest cat is: {{guestCatName}}</h2>

  <h3>Today's discount is: ${{5 * 0.3}}</h3>

</div>
```

And now we'll create a controller that will manage those scope variables.

```javascript
window.app = angular.module('app', []);

app.controller('homeCtrl', function($scope) {
  $scope.guestCatName = 'Charles Flufferton';
});
```

Now instead of Angular looking at our root scope, it's looking at the `$scope` that `welcomeCtrl` is managing.

On to [Dependency Injection](3-dependency-injection.md)
