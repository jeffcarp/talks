## Common pitfalls

### Using scalars with `ng-model`

Two-way binding relies on keeping a reference to the value you're modifying. So this will seem to work, but will not cut through an intermediate scope:

```javascript
app.controller('ctrl', function() {
  $scope.catName = "";
});
```

```html
<input type="text" ng-model="catName" />
```
### Code minification

Dependency injection relies on taking your controller or service function and running toString() on it to suss out it's dependencies. This doesn't work if your function signature looks like `function(a, b, c, d) { ... }`. You can get around this by using [ngmin](https://github.com/btford/ngmin), a JS minifier that keeps DI intact (by doing the below for you automatically), or by doing it manually by declaring your components in an array prefixed with each dependency.

```javascript
app.controller(['$scope', 'CatService', function($scope, CatService) {

}]);
```
