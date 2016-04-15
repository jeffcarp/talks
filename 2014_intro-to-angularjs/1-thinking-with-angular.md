# Starting out

Let's start off with an almost blank HTML page. In it we want to display our price ($10), minus a discount (30%), so we put that logic in handlebars and display it.

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

This just renders the handlebars to the page without transforming them. In order to tell Angular where we want it to live, we need to use our first directive, `ng-app`. `ng-app` means anything inside this tag belongs to the app. So let's put it in the body tag because we want our entire page to be an Angular app.

```html
<body ng-app>
```

Note: `ng-app` it doesn't have to live in `<body>`, it can just live on your sidebar, for instance. `<aside ng-app></aside>`. Angular will not touch the DOM outside of the element on which you declared `ng-app`.

Now, for various reasons you're probably all aware of, the discount logic we put in our template is a little too complex to live in a view. We also probably shouldn't hard-code these numbers in. So to start, let's use a variable, `discount`, to represent our discount.

```
<h2>Today's discounted price is {{10 * (1 - discount)}}</h2>
```

When we use a variable like this in an Angular template, Angular looks up the name on whatever $scope is bound to that template. Things like controllers and directives in Angular have their own scope, which is how the controller and view interact with each other. When we're not in a controller or a directive, we're in what's known as $rootScope, the scope that ng-app creates. So when we use the variable `discount` in our template, when Angular sees it, it looks it up on `$rootScope.discount`. Right now it comes back as `undefined`, so let's define something.

First, let's create our new app. We'll make a new file, `app.js`, and put this in it.

```js
window.app = angular.module('app', []);
```

Then we'll add an include tag to our `<head>`, right after our Angular script tag.

```
<script src="app.js"></script>
```

Now that we have a variable on the window object, let's tell our `ng-app` directive what global variable to look for.

```
<body ng-app="app">
```

Now to demonstrate how Angular looks up `$rootScope.discount`, let's add a .run() function to app.js. This is executed when Angular loads for the first time.

```
.run(function($rootScope) {
  $rootScope.discount = 0.3;
})
```

Try changing `$rootScope.discount` to `0.4` and see how it's updated in the view. This is one-way binding using scope in Angular. The view and its data do not know about each other directly, then only communicate through one object - $scope (or $rootScope in this case).

Next: [Controllers](2-controllers.md)
