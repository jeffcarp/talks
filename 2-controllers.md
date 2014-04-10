## Controllers

In Angular, scope is the way templates and controllers interact.

- Controllers manage $scope, among other things.
- Can be nested, but probably a better idea to use directives for that.

Let's put all of our current elements in body into a controller called `welcomeCtrl`.

```html
<div ng-controller="welcomeCtrl">

  <h1>Our Cat Cafe</h1>

  <h2>Today's guest cat is: {{guestCatName}}</h2>

  <h3>Today's discount is: ${{5 * 0.3}}</h3>

</div>
```

And now we'll create a controller that will manage those scope variables.

```javascript

angular.module('omgcats')
  .controller('welcomeCtrl', function($scope) {

    $scope.guestCatName = 'Charles Flufferton';

  })
```

Now instead of Angular looking at our root scope, it's looking at the `$scope` that `welcomeCtrl` is managing.
