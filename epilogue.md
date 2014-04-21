
## Tools to use

Maybe even during the presentation?

[Angular Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)

## What are our alternatives?

- **Backbone** - [what using Backbone would give us]
- **EmberJS** - [what using Ember would give us]

## Where to go from here

- [egghead.io AngularJS tutorials](https://egghead.io/technologies/angularjs)
- [YouTube: AngularJS Fundamentals In 60-ish Minutes by Dan Wahlin](https://www.youtube.com/watch?v=i9MHigUZKEM)

## Common Pitfalls

### Using primitives with `ng-model`

Two-way binding relies on keeping a reference to the value you're modifying. So this will seem to work, but will not cut through an intermediate scope:

```javascript
app.controller('ctrl', function() {
  $scope.catName = "";
});
```

```html
<input type="text" ng-model="catName" />
```

Solution: pass ng-model the attribute of an object.

> Whenever you have ng-model there's gotta be a dot in there somewhere. If you don't have a dot, you're doing it wrong.

https://www.youtube.com/watch?v=ZhfUv0spHCY&t=29m19s

### Code minification

Dependency injection relies on taking your controller or service function and running toString() on it to suss out it's dependencies. This doesn't work if your function signature looks like `function(a, b, c, d) { ... }`. You can get around this by using [ngmin](https://github.com/btford/ngmin), a JS minifier that keeps DI intact (by doing the below for you automatically), or by doing it manually by declaring your components in an array prefixed with each dependency.

```javascript
app.controller(['$scope', 'CatService', function($scope, CatService) {

}]);
```
