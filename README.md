ng-talk
==============

This README will serve as a guide through the talk...

```
Prepared for:

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
- AngularFire

## ng-app

- Let's start off with a blank HTML page.

```html
<!doctype html>
<head>
  <title>Cat Cafe App</title>
</head>
<body>

  <!-- ... -->

</body>
</html>
```

Inside our body, let's tell Angular where we want our app to live. We do this using an attribute called `ng-app`. "ng-app means anything inside this tag belongs to the app."

```html
<div ng-app>

  <h1>Our Cat Cafe</h1>

  <!-- ... -->

</div>
```

Now we need to X. How do we do that?

## Data Binding

(without controllers yet, just {{2 + 2}})

Now we need something to manage this state. How do we do that?

## Controllers

## Where to go from here

- [egghead.io AngularJS tutorials](https://egghead.io/technologies/angularjs)
