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

#### *"HTML enhanced for web apps"*

– angularjs.org

#### *"It's what Google's vision for what a browser would be like if it were built from the ground up (instead of just rendering documents."*

– Misko Hevery

#### *"[the] Best way to understand angularjs is to see angular not so much as a javascript library but as enhanced HTML."*

– Amit Upadhyay - http://amitu.com/angularjs/

to            | jQuery approach | Angular approach
------------- | --------------- | ----------------
template state | in the DOM &#xca0;&#x256d;&#x256e;&#xca0; | assigned to $scope
the DOM  | insert/change/remove manually | declare HTML once, Angular takes care of rendering
back-end/APIs | $.ajax | $http
click handler example | `$('a').click(handler);` | `<span ng-click="handler()">Cool</span>`

jQuery approach:

- State stored in variables or in the DOM
- Attach event handlers manually
- Event handlers manage DOM themselves

Angular approach:

- Just manage your data structures and write the HTML once, Angular will take care of the rest for you

## Structure of this talk

Did you hear? A Cat Cafe is coming to San Francisco. But cats are so difficult to manage! So we're going to build a CMS.

Not a Content Management System, a **Cat Management System**.

1. [Thinking with Angular](1-thinking-with-angular.md)
2. [Controllers](https://github.com/jeffcarp/angularjs-talk/blob/master/2-controllers.md)
3. [Dependency Injection](https://github.com/jeffcarp/angularjs-talk/blob/master/3-dependency-injection.md)
4. [Routing](https://github.com/jeffcarp/angularjs-talk/blob/master/4-routing.md)
5. [Models](https://github.com/jeffcarp/angularjs-talk/blob/master/5-models.md)
6. Pitfalls
7. Persistence
8. Epilogue

- Two-way binding with `ng-model`
- Directives
- Persistence with Firebase and AngularFire






