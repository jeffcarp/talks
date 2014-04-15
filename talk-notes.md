Abbreviated version of notes for the actual talk.

- Thank you to the meetup organizers, TJ and ...

# Logistics

- The talk will take about 50 minutes
- I'll stop for questions at the end
- Also feel free to ask during

```html
<!doctype html>
<html>
<head>
  <title>SF Cat Cafe</title>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min.js"></script>
</head>
<body>

  <h1>SF Cat Cafe</h1>

  <h2>Regular price: $10</h2>

  <h2>Today's discounted price is {{10 * (1 - 0.3)}}</h2>

</body>
</html>
```

- Now we'll serve this easily

```
servedir
```

- Go to localhost:5000
- Why does this render handlebars?
- We need ng-app
- Add ng-app to <body>

```
<body ng-app>
```

- Now Angular is attached to <body>
- What if we didn't want to hard code the discount into the template? (0.3)
- Change 0.3 to discount

```
<h2>Today's discounted price is {{10 * (1 - discount)}}</h2>
```

- We can use variables like this, but we need to define them on the current scope
- Create new file: app.js

```js
window.app = angular.module('app', []);
```

- Add app.js to <head>

```
<script src="app.js"></script>
```

- Add app name to ng-app

```
<body ng-app="app">
```

- Add current markup to homeCtrl

```
<div ng-controller="homeCtrl">
  <h1>SF Cat Cafe</h1>

  <h2>Regular price: $10</h2>

  <h2>Today's discounted price is {{10 * (1 - discount)}}</h2>
</div>
```

- Add homeCtrl

```
.controller('homeCtrl', function($scope) {
  $scope.discount = 0.3;
})
```

- Let's add price in as well

```
.controller('homeCtrl', function($scope) {
  $scope.price = 10;
  $scope.discount = 0.3;
})
```

- And update the template as well

```
<div ng-controller="homeCtrl">
  <h1>SF Cat Cafe</h1>

  <h2>Regular price: ${{price}}</h2>

  <h2>Today's discounted price is {{price * (1 - discount)}}</h2>
</div>
```

- You can assign functions to $scope as well and call them in the template
- Let's take more logic out of the template and put it in a a scope function

```
<h2>Today's discounted price is ${{discountedPrice()}}</h2>
```

```
$scope.discountedPrice = function() {
  return $scope.price * (1 - $scope.discount);
};
```

- Let's change the price to 12 and see what happens

```
$scope.price = 12;
```

- Now the discounted price is a repeating decimal
- What if we had a generalized way of displaying money?
  - Adds dollar sign automatically
  - Always rounds to 2 decimal places
- This would be good for a filter

[note] this was a directive before but decided it would be better as a filter. should probably move later in presentation since filters are not as important as other core concepts.

```
.filter('usd', function() {
  return function(str) {
    return '$'+Number(str).toFixed(2);
  };
})
```

```
    <h2>Regular price: {{price|usd}}</h2>

    <h2>Today's discounted price is {{discountedPrice()|usd}}</h2>
```

- Now let's add some cats
- Demonstrating how you render a list in Angular
- Use ng-repeat

```
$scope.cats = [
  {name: 'Bigglesworth'},
  {name: 'Mr. Fluffles'},
  {name: 'Gorby Puff Puff'}
];
```

```
<div ng-repeat="cat in cats">
  {{cat.name}}
</div>
```

- Take a look at generated HTML in Inspector
- Notice how each one has the ng-repeat attr
- Let's take a second to spruce up our CSS
- Add this to our head

```
<link rel="stylesheet" type="text/css" href="style.css" />
```

- Create a new file style.css
- Add styles

```
body {
  background-color: #eee;
}

#container {
  background-color: white;
  padding: 1em;
  margin: 0 auto;
  max-width: 640px;
}

.cat {
  display: inline-block;
}
```

- Let's add images to our cats
- Add the cats class to each cat

```
<div ng-repeat="cat in cats" class="cat">
```

- And wrap the image in a div

```
<div>
  <img src="http://placekitten.com/180/180" />
</div>
```

```
<div ng-controller="homeCtrl" id="container">
```

- Open up AngularJS Batarang
- Show price, discount, etc. in current scope
- This will be useful later

- Now let's add a separate page for ordering drinks
- That means we'll need some routing
- ngRoute is a separate library as of [...]
- Add it's script tag to <head>

```
<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.15/angular-route.min.js"></script>
```

- Add it to our module includes

```
window.app = angular.module('app', ['ngRoute'])
```

- Now add our first route definition
- Points to homeCtrl

```
.config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      controller: 'homeCtrl',
      templateUrl: 'home.html'
    })

})
```

- Now we need 2 things before this works:
- Move our template into home.html as we specified
- Tell Angular where to render the current template
- Now home.html looks like:

```
<h2>Regular price: {{price|usd}}</h2>

<h2>Today's discounted price is {{discountedPrice()|usd}}</h2>

<div ng-repeat="cat in cats" class="cat">
  <div>
    <img src="http://placekitten.com/180/180" />
  </div>
  {{cat.name}}
</div>
```

- And our index template looks like:

```
<div id="container">
  <h1>SF Cat Cafe</h1>

  <ng-view></ng-view>
</div>
```

- ng-view tells ngRoute where to insert the current template
- Now that we have one route set up and working, let's add another one
- Let's add the navigation inside the container

```
<nav>
  <a href="/">Home</a>
  <a href="/orders">Orders</a>
</nav>
```

- Now let's add another rule to the $routeProvider

```
.when('/orders', {
  controller: 'ordersCtrl',
  templateUrl: 'orders.html'
})
```

- Now we need to defile the controller ordersCtrl and the template orders.html

```
.controller('ordersCtrl', function($scope) {
  console.log('ordersCtrl');
})
```

- Create orders.html

```
<h1>Orders</h1>
```

- Go to site and navigate between pages
- Notice how URL bar changes nicely
- Notice how back button works

- The only letter in MVC we haven't covered yet is M
- Let's use a service for our orders
