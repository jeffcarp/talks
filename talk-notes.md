## Talk Notes

- This is an abbreviated version of the notes for the actual talk.
- Thank you to the meetup organizers for putting this meetup together:
  - TJ
  - Silviu
  - Vera
  - Kasey
  - Ben

### Logistics

- The talk will take about 50 minutes
- I'll stop for questions at the end
- Also feel free to ask during

## Who am I

- Jeff Carpenter
- Work at Bloodhound, make a sales lead collecting app/dashboard
- Have been using Angular for about a year
- Comments, feedback, want to hack on something
  - @jcarp or hi@jeff.is
- Improvements, fixes
  - https://github.com/jeffcarp/angularjs-talk

### Objective

- To give you a brief overview of AngularJS and the tools to learn more.

### Style

- Most of this talk will take the following form:

1. Code the end result that we want, see that it breaks
2. Fill in the implementation and explain what's happening
3. Lather, rinse, repeat

- Audience participation
  - If you have a question, please ask it.
  - If you have something helpful to add, please do so.
  - Let's look at this talk as if it were a pair-pair-pair-pair-pair programming session

- Let's get started
- Did you hear a cat cafe is coming to SF?
  - We all know herding cats is kind of like... herding cats
  - Let's make a cat cafe management app
- First, let's lay down this simple HTML page
- Ask: "If you were to go to a cat cafe, what would you pay for admission?"
  - Use answer for price

### First things first

- Mad Libs
- I need:
  - A noun
  - An adjective
  - A percentage
  - A dollar amount

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

  <h3>Today's discounted price is ${{10 * (1 - 0.3)}}</h3>

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

- To quickly demonstrate $rootScope

```
.run(function($rootScope) {
  $rootScope.discount = 0.3;
})
```

- Change discount to 0.4
- Refresh, watch change
- Describe what .run is
- Delete .run
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

- Now let's add some cats
- Demonstrating how you render a list in Angular
- Use ng-repeat

```
$scope.cats = [
  {name: 'Mr. Bigglesworth'},
  {name: 'Cheshire Cat'},
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
- Let's talk about Dependency Injection

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
<h2>Regular price: ${{price}}</h2>

<h2>Today's discounted price is ${{discountedPrice()}}</h2>

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

- Now we need to define the controller ordersCtrl and the template orders.html

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
- Let's use a factory to create a service (model) for our orders
- We'll provide a method Orders.all() to start
- And put an example in there

```
.factory('Orders', function() {
  var Orders = {};
  var _orders = ['Latte'];

  Orders.all = function() {
    return _orders;
  };

  return Orders;
})
```

- And inject it into our orders controller
- Talk about dependency injection
- NB: Services you inject are singletons

```
.controller('ordersCtrl', function($scope, Orders) {
  $scope.orders = Orders.all();
})
```

- Now let's put the orders in a list

```
<div ng-repeat="order in orders">
  <span>{{order}}</span>
</div>
```

- Now let's dive into two-way binding
- We'll put this in the orders controller

```
$scope.newOrder = '';
```

- Two-way binding means that a change in our controller state ($scope) will update the DOM
  - And a change in the DOM will update our $scope

```
<input
  type="text"
  ng-model="newOrder"
  placeholder="Your order"
  />
```

- And add a corresponding style for the input

```css
input[type=text] {
  width: 100%;
  font-size: 16px;
  padding: 0.2em;
}
```

- Let's add an add function to our service and hook it up to our controller

```
Orders.add = function(newOrder) {
  _orders.push(newOrder);
  return newOrder;
};
```

- Here's the template

```
<button ng-click="placeOrder()">Place Order</button>
```

- And here's the controller method

```
$scope.placeOrder = function() {
  Orders.add($scope.newOrder);
  $scope.newOrder = '';
};
```

- Now crack open the AngularJS batarang
- Notice how $scope.newOrder updates as we type
- Notice how our $scope.placeOrder modified $scope as it said it would
  - $scope.orders now has length 2
  - $scope.newOrder is now blank again
- Let's make this into a real form so we can use ng-submit, which will let use use the enter key to submit
- Also replace the button with a real submit button

```
<form
  name="orderForm"
  ng-submit="placeOrder()">

  <input
    type="text"
    ng-model="newOrder"
    placeholder="Your order"
    />

  <input
    type="submit"
    value="Place Order"
    />
</form>
```

- Notice how we're able to add blank orders
- Let's add 'ng-required' to our input to demonstrate validation

```
<input
  type="text"
  ng-model="newOrder"
  placeholder="Your order"
  ng-required="true"
  />
```

- And validate our form in our controller method
- <form> is an Angular directive that overwrites the HTML form element
- You can do this too, modifying built-in HTML elements
- Giving name="" attribute to <form> assigns the form to that name in the scope
- .$valid is an attribute on a form object
- It picks up the 'required' attribute we used and uses it to determine if the form is valid

```
$scope.placeOrder = function() {
  if ($scope.orderForm.$invalid) {
    return alert('Please fill in your order');
  }
  Order.add($scope.newOrder);
  $scope.newOrder = '';
};
```

- Let's change pace back to the home page
- Let's change the price to 12 and see what happens

```
$scope.price = 12;
```

- Now the discounted price is a repeating decimal
- What if we had a generalized way of displaying money?
  - Adds dollar sign automatically
  - Always rounds to 2 decimal places
- This would be good for a filter

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

- Ok, so going back to the orders page, we see everything is wiped out after page load
- Let's make it persistent
- Normally we'd hook it up to a back-end
- For the purposes of this talk, let's use Firebase and its Angular adapter, AngularFire
- We need to require two more libraries for that (in index.html)

```
<script src="https://cdn.firebase.com/v0/firebase.js"></script>
<script src="https://cdn.firebase.com/libs/angularfire/0.5.0/angularfire.min.js"></script>
```

- And add 'firebase' to our app's module dependencies

```
window.app = angular.module('app', ['ngRoute', 'firebase'])
```

- And add our firebase URI as a constant in our app

```
.value('firebaseURI', 'https://catcafe.firebaseio.com/')
```

- Delete the existing Orders service
- And now rework our Orders service as a Firebase service

```
.factory('Orders', function($firebase, firebaseURI) {
  return $firebase(new Firebase(firebaseURI+'orders'));
})
```

- And change our orders controller to work with the new Service

```
$scope.orders = Orders;
```

```
Orders.$add($scope.newOrder, function() {
  $scope.newOrder = '';
});
```

- Now that we have Firebase working, let's test it out
- Get LAN IP address from Network Utility
- Append port 5000 (or what we're using)
- Add to header

```
<h3>Access: http://192.168.0.181:5000/orders</h3>
```

