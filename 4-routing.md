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

