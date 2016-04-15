## Controllers

In Angular, scope is the way templates and controllers interact. Let's use a real controller so we can create an isolated scope in which to build more logic. We don't need the `.run(...` function we defined before, so delete it. We'll start by putting our markup under one controller, which we'll call `homeCtrl` for now.

```
<div ng-controller="homeCtrl">
  <h1>SF Cat Cafe</h1>

  <h2>Regular price: $10</h2>

  <h2>Today's discounted price is {{10 * (1 - discount)}}</h2>
</div>
```

Now Angular will be looking for a controller named `homeCtrl`, so let's define it. While we're at it, because we don't want any data hard-coded into our template, let's add price as well.

```
.controller('homeCtrl', function($scope) {
  $scope.price = 10;
  $scope.discount = 0.3;
})
```

And we'll update our template to remove the hard coded price.

```
<div ng-controller="homeCtrl">
  <h1>SF Cat Cafe</h1>

  <h2>Regular price: ${{price}}</h2>

  <h2>Today's discounted price is {{price * (1 - discount)}}</h2>
</div>
```

We still have too much logic in our template. `$scope` is useful for embedding data into templates, but we can also defined functions on `$scope` whose return value can be displayed in the template. So let's define a discounted price function in our controller and hook it up to our template.

```
$scope.discountedPrice = function() {
  return $scope.price * (1 - $scope.discount);
};
```

```
<h2>Today's discounted price is ${{discountedPrice()}}</h2>
```

So far we've seen that we can assign data to `$scope` in order to use it in the template. Let's see an example of an array on `$scope` and how we'd use that in the template. First, in our controller, let's define an array of cat objects.

```
$scope.cats = [
  {name: 'Mr. Bigglesworth'},
  {name: 'Cheshire Cat'},
  {name: 'Gorby Puff Puff'}
];
```

In order to display a list of items in your template, it's useful to use the directive `ng-repeat`. This copies the element it's defined on for every element in the object or array you specify.

```
<div ng-repeat="cat in cats">
  {{cat.name}}
</div>
```

If you open up your web inspector, you can see that it duplicated the outer div for each cat.

Next: [Dependency Injection](3-dependency-injection.md)
