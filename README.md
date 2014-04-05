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

- It's pretty cool

Did you hear? A Cat Cafe is coming to San Francisco.

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

Now, this just renders the handlebars to the page without transforming them. In order to tell Angular where we want it to live, we need to use our first directive, `ng-app`.

"ng-app means anything inside this tag belongs to the app."

So let's put `ng-app` in the body tag. 

```html
<body ng-app>
  ...
</body>
```

Your Angular app doesn't have to be the entire page, it can live just on your sidebar, for instance. `<aside ng-app></aside>`. Angular will not touch the DOM outside of the element on which you declared `ng-app`.

### The Angular way of thinking

Let's take a step back and look at the first directive we used: `ng-app`

Angular is centered around **directives**.

Not only does Angular utilize this 'superset' of HTML, it also replaces some existing HTML elements, for example, `<form>` is an Angular directive.

Directives come in 4 forms:

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

Directives can be used for many purposes:

- Creating re-usable components (like a file upload directive)
- Macro-expansion
- Extending built-in elements (like `<form></form>`)

## Scope

Wherever you are in Angular, you're always within a scope. In the case of our `guestCatName` variable above, we're not in a controller or directive or anything, so the scope it's in is `$rootScope`. When we typed `{{guestCatName}}` in the root of our app, Angular tried looking up `$rootScope.guestCatName` and came up with `undefined`, which is why it rendered nothing.

But we can evaulate simple expressions in our templates, and assignment is one of those. So what if we put `{{guestCatName = '?'}}` into our template?

```html
  <h1>Our Cat Cafe</h1>

  {{guestCatName = 'Charles Whiskerton'}}

  <h2>Today's guest cat is: {{guestCatName}}</h2>
```

We successfully set and retrieved something from our current scope. For reasons you're probably aware of, this kind of logic is frowned upon in templates, so let's move from the V to the C.

## Controllers

In Angular, scope is the way templates and controllers interact.

- Controllers manage $scope, among other things.
- Can be nested, but probably a better idea to use directives for that.

```html
<div ng-controller="">

  <div ng-controller="">
  </div>

</div>
```

## Let's talk about dependency injection

- Dependency injection -- or DI -- is a powerful way of requiring modules, similar to CommonJS, Browserify, AMD
- In Angular all you need to inject a dependency is to pass it as a parameter to your controller or service

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

## Factories, Services, etc.

- Services abstract your data, use them as the M in MVC
- All services are **singletons**

## Persistence with Firebase

## Tools to use

Maybe even during the presentation?

[Angular Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)

## What are our alternatives?

**Backbone** - [what using Backbone would give us]
**EmberJS** - [what using Ember would give us]

## Where to go from here

- [egghead.io AngularJS tutorials](https://egghead.io/technologies/angularjs)
