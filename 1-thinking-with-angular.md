# Thinking with Angular

- Let's start off with a blank HTML page.

```html
<!doctype html>
<head>
  <title>Cat Cafe App</title>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min.js"></script>
</head>
<body>

  <h1>Our Cat Cafe</h1>

  <h2>Today's discount is: ${{5 * 0.3}}</h2>
  
  <h3>Today's guest cat is: {{guestCatName}}</h3>

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

Note: `ng-app` it doesn't have to live in `<body>`, it can just live on your sidebar, for instance. `<aside ng-app></aside>`. Angular will not touch the DOM outside of the element on which you declared `ng-app`.

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
