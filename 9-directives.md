## Directives

This entire talk, we've been using directives. Angular is built out of directives and directive creation is agruably the most essential yet hardest to grasp part of Angular. This section is going to cover writing a new custom directive, but it won't even come close to scratching the surface of what is possible, so if you're learning

```
.directive('blink', function() {
  return {
    restrict: 'E',
    transclude: true,
    link: function(scope, elem, attrs) {
      scope.visible = true;
      setInterval(function() {
        scope.visible = !scope.visible;
        scope.$digest();
      }, 1e3);
    },
    template: '<span ng-transclude ng-show="visible"></span>'
  };
})
```
