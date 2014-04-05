ng-talk
==============

This README will serve as a guide through the talk...

This talk was originally prepared for the SF HTML5 Livecode meetup group but I intend for this README to stand alone as an introduction.

```
HTML5 Live Code Meetup
7pm, Thursday April 24, 2014
Startup House, 934 Howard St., San Francisco, CA
```

## Assumptions

- You know the basics of JavaScript
- You are interested in Angular

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
</head>
<body>

</body>
</html>
```

Inside the body tag, let's tell Angular where we want our app to live. We do this using an attribute called `ng-app`. "ng-app means anything inside this tag belongs to the app."

```html
<div ng-app>

  <h1>Our Cat Cafe</h1>

</div>
```

Now we need to X. How do we do that?

## The Angular way of thinking

Let's take a step back and look at the first directive we used: `ng-app`

Angular is made up of directives. These can come in the form of attribtues (`<div ng-app></div>`), elements (`<ng-view></ng-view`>)

Not only does Angular utilize this 'superset' of HTML, it also replaces some existing HTML elements, for example, `<form>` is an Angular directive.

## Interpolation

(without controllers yet, just {{2 + 2}})

Now we need something to manage this state. How do we do that?

```html
<div>{{2 + 2}}</div>

<!-- renders as -->

<div>4</div>
```

```html
{{catName = 'Meowth'}}

<div>{{catName}}</div>

<!-- is the same as -->

<div ng-bind="catName"></div>

<!-- and renders as -->

<div>Meowth</div>
```

Wait, of course we need a cat's name.

## Data Binding

How does that fit into the rest of Angular? As we talked about before, almost everything in Angular is expressed as a directive.

When you wrap something in handlebars in an Angular expression, that's just shorthand for using `ng-bind`.

```html
<div>{{2 + 2}}</div>

<!-- is the same as -->

<div ng-bind="2 + 2"></div>
```

## Controllers

- Controllers manage
- Can be nested, but probably a better idea to use directives for that.

```html
<div ng-controller="">

  <div ng-controller="">
  </div>

</div>
```

## Let's talk about dependency injection

- DI is a powerful way of requiring modules, similar to CommonJS, Browserify, AMD
- In Angular all you need to inject a dependency is to pass it as a parameter to your controller or service

```javascript
// Angular reads the parameters and injects them for you to use
app.controller('catsCtrl', function($scope, $location, CatService) {

  $scope.inc = function(x) {
    return x + 1;
  };

  $scope.addACat = function(catName) {
    return CatService.add({
      name: catName
    });
  };
});
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

## Where to go from here

- [egghead.io AngularJS tutorials](https://egghead.io/technologies/angularjs)
