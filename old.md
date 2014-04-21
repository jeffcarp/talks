1
======

Let's take a step back and look at our first directive: `ng-app`. Angular is centered around **directives**, which are functionality resembling a superset of HTML. Directives come in 4 forms:

```html
<!-- Elements -->
<cat-picture></cat-picture>

<!-- Attributes -->
<div cat-picture></div>

<!-- Classes -->
<div class="cat-picture"></div>

<!-- Comments -->
<!-- directive: cat-picture -->
```

The first two - Elements and Attributes - are the most common. We can write your own directives, which we'll see later down the road.

Angular also replaces or wraps some existing HTML elements with its own directives, for example, `<form>` is an Angular directive.

Directives can be used for many purposes:

- Creating re-usable components (like a file upload directive)
- Macro-expansion (if you find yourself repeating the same HTML structure)
- Extending built-in elements (like `<form>`)

#### Directives in practice

to            | jQuery approach | Angular approach
------------- | --------------- | ----------------
the DOM  | insert/change/remove manually | declare HTML once, Angular takes care of rendering
back-end/APIs | $.ajax | $http
one-way binding | `$('h1').text(headlineStr);` | `<h1>{{headlineStr}}</h1>` or `<h1 ng-bind="headlineStr"></h1>`
example: click handlers | `$('a').click(handler);` | `<span ng-click="handler()">Cool</span>`
two-way binding | (none) | `<input type="text" ng-model="name" />`

## Scope

Wherever you are in Angular, you're always within a scope. The scope directly within `ng-app` is called `$rootScope`. When you declare a controller, it creates its own scope.

In the case of our `guestCatName` variable above, we're not in a controller or directive, so the scope we're in is `$rootScope`. When we typed `{{guestCatName}}` in the root of our app, Angular tried looking up `$rootScope.guestCatName` and came up with `undefined`, which is why it rendered nothing.

But since we can evaulate simple JavaScript expressions in our templates, and assignment is one of those, what if we put `{{guestCatName = '?'}}` into our template?

```html
<h1>Our Cat Cafe</h1>

{{guestCatName = 'Charles Whiskerton'; ''}}

<h2>Today's guest cat is: {{guestCatName}}</h2>
```

We successfully set and retrieved something from inside our current scope (the $rootScope). For reasons you're probably well aware of, this kind of logic is frowned upon in templates, which is why we have the MVC paradigm. So let's move from the V to the C.

Next: [Controllers](2-controllers.md)

2
=======
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

Now let's take a look at our page. Our view's `{{guestCatName}}}` should be bound to our controller's `$scope.guestCatName`.

Now instead of Angular looking at our root scope, it's looking at the `$scope` that `welcomeCtrl` is managing.

On to [Dependency Injection](3-dependency-injection.md)

3
=====
- Now we want a cats page and a drinks page
- We use the module ngRoute to do this

```javascript
app.config(function($routeProvider) {
  
  $routeProvider.when('/', {
    templateUrl: 'index.html',
    controller: 'homeController'
  });
  
  $routeProvider.when('/', {
    templateUrl: 'index.html',
    controller: 'homeController'
  });
  
  $routeProvider.otherwise({
    redirectTo: '/'
  });
  
});
```

- Note dependency injection of `$routeProvider`
- Now that we've started using ngRoute, we need to tell it where to display the current template on our page.
- So let's slurp all our markup from our current page into `index.html`, and in its place in our main template we'll put an `<div ng-view></div>`, which tells Angular's routeProvider this is where to put the current template.

```html
<!doctype html>
<head>
  ...
</head>
<body>

  <div ng-view></div>

</body>
</html>
```

