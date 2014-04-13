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

### *"HTML enhanced for web apps"*

– angularjs.org

### *"It's what Google's vision for what a browser would be like if it were built from the ground up (instead of just rendering documents."*

– Misko Hevery

### *"[the] Best way to understand angularjs is to see angular not so much as a javascript library but as enhanced HTML."*

– Amit Upadhyay - http://amitu.com/angularjs/

to            | jQuery approach | Angular approach
------------- | --------------- | ----------------
the DOM  | insert/change/remove manually | declare HTML once, Angular takes care of rendering
back-end/APIs | $.ajax | $http
one-way binding | `$('h1').text(headlineStr);` | `<h1>{{headlineStr}}</h1>`
example: click handlers | `$('a').click(handler);` | `<span ng-click="handler()">Cool</span>`
two-way binding | (none) | `<input type="text" ng-model="name" />`

## Structure of this talk

Did you hear? A Cat Cafe is coming to San Francisco. But cats are so difficult to manage! So we're going to build a CMS.

Not a Content Management System, a **Cat Management System**.

1. [Thinking with Angular](1-thinking-with-angular.md)
2. [Controllers](2-controllers.md)
3. [Dependency Injection](3-dependency-injection.md)
4. [Routing](4-routing.md)
5. [Models](5-models.md)
6. Pitfalls
7. Persistence
8. Epilogue

- Two-way binding with `ng-model`
- Directives
- Persistence with Firebase and AngularFire






