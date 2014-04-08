ng-talk
==============

This guide is being prepared as a handout for the SF HTML5 Livecode meetup group but I intend for it to stand alone as a light introduction to Angular.

```
HTML5 Live Code Meetup
7pm, Thursday April 24, 2014
Startup House, 934 Howard St., San Francisco, CA
```

## Assumptions

- You are familiar with JavaScript
- You are interested in Angular
- You enjoy the company of felines

## Reasons to use Angular

> HTML enhanced for web apps

angularjs.org

(what if you wanted a cat picture and could just write `<cat-picture></cat-picture>`?)

> It's what Google's vision for what a browser would be like if it were built from the ground up (instead of just rendering documents. 

Misko Hevery

- Write UI code declaratively. Your app code should not 

jQuery approach:

- State stored in variables or in the DOM
- Attach event handlers manually
- Event handlers manage DOM themselves

Angular approach:

- Just manage your data structures and write the HTML once, Angular will take care of the rest for you

> "Your UI code should be declarative, and your app code should be imperative"

## Did you hear? A Cat Cafe is coming to San Francisco.

But cats are so difficult to manage!

## We're going to build a CMS

Not a Content Management System

A **Cat Management System**

## Structure of this talk

- ng-app
- ng-controller
- ng-view
  - ng-bind || {{}}
  - ng-model
- app.directive()
- Persistence with Firebase and AngularFire

## ng-app

- Let's start off with a blank HTML page.

```html
<!doctype html>
<head>
  <title>Cat Cafe App</title>
  <!-- TODO: include Angular -->
  <script></script>
</head>
<body>

  <h1>Our Cat Cafe</h1>

  <h2>Today's guest cat is: {{guestCatName}}</h2>

  <h3>Today's discount is: ${{5 * 0.3}}</h3>

</body>
</html>
```

This just renders the handlebars to the page without transforming them. In order to tell Angular where we want it to live, we need to use our first directive, `ng-app`.

`ng-app` means anything inside this tag belongs to the app. So let's put `ng-app` in the body tag because we want our entire page to be an Angular app.

```html
<body ng-app>
  ...
</body>
```

However it doesn't have to live in `<body>`, it can just live on your sidebar, for instance. `<aside ng-app></aside>`. Angular will not touch the DOM outside of the element on which you declared `ng-app`.

### The Angular way of thinking

Let's take a step back and look at our first directive: `ng-app`

Angular is centered around **directives**, which are functionality resembling a 'superset' of HTML. Directives come in 4 forms:

```html
<!-- Elements -->
<form></form>

<!-- Attributes -->
<img ng-src="example.com/{{2 + 2}}/asdf.jpg" />

<!-- Classes -->
<div class="our-dir: 2 + 2;"></div>

<!-- Comments -->
<!-- directive: our-dir: 2 + 2 -->
```

However, the first two - Elements and Attributes - are the most common. We can write your own directives, which we'll see later down the road.

Angular also replaces or wraps some existing HTML elements with its own directives, for example, `<form>` is an Angular directive.

Directives can be used for many purposes:

- Creating re-usable components (like a file upload directive)
- Macro-expansion (if you find yourself repeating the same HTML structure)
- Extending built-in elements (like `<form>`)

## Scope

Wherever you are in Angular, you're always within a scope. The scope directly within `ng-app` is the `$rootScope`. Scopes can also be nested, like in the case of controllers.

In the case of our `guestCatName` variable above, we're not in a controller or directive, so the scope we're in is `$rootScope`. When we typed `{{guestCatName}}` in the root of our app, Angular tried looking up `$rootScope.guestCatName` and came up with `undefined`, which is why it rendered nothing.

But since we can evaulate simple JavaScript expressions in our templates, and assignment is one of those, what if we put `{{guestCatName = '?'}}` into our template?

```html
<h1>Our Cat Cafe</h1>

{{guestCatName = 'Charles Whiskerton'}}

<h2>Today's guest cat is: {{guestCatName}}</h2>
```

We successfully set and retrieved something from inside our current scope (the $rootScope). For reasons you're probably well aware of, this kind of logic is frowned upon in templates, which is why we have the MVC paradigm. So let's move from the V to the C.

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
```

[1] If you're minifying your code, you must use ng-min to preserve this functionality. If you can't use ng-min, you can declare controllers and services like this:

```javascript
app.controller('catsCtrl',
  ['$scope', '$location', 'CatService',
  function($scope, $location, CatService) {

  $scope.inc = function(x) {
    return x + 1;
  };

  // ...

}];
```

## Routing with ngRoute

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

## Factories, Services, etc.

- Services abstract your data, use them as the M in MVC
- All services are **singletons**

## Common pitfalls

### Using scalars with `ng-model`

Two-way binding relies on keeping a reference to the value you're modifying. So this will seem to work, but will not cut through an intermediate scope:

```javascript
app.controller('ctrl', function() {
  $scope.catName = "";
});
```

```html
<input type="text" ng-model="catName" >
```
### Code minification

Dependency injection relies on taking your controller or service function and running toString() on it to suss out it's dependencies. This doesn't work if your function signature looks like `function(a, b, c, d) { ... }`. You can get around this by using ng-min, a JS minifier that keeps DI intact, or by declaring your components in an array prefixed with each dependency.

```javascript
app.controller(['$scope', 'CatService', function($scope, CatService) {

}]);
```

## Persistence with Firebase

## Tools to use

Maybe even during the presentation?

[Angular Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)

## What are our alternatives?

- **Backbone** - [what using Backbone would give us]
- **EmberJS** - [what using Ember would give us]

## Where to go from here

- [egghead.io AngularJS tutorials](https://egghead.io/technologies/angularjs)
