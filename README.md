angularjs-talk
==============

This README will serve as a guide through the talk...

Startup House
7pm, April 24, 2014

## Assumptions

- You know the basics of JavaScript
- You are interested in Angular

## Reasons to use Angular

- It's pretty cool

## We're going to build a CMS

A new cat cafe is coming to town, and you know how hard it is to wrangle cats, so we're going to create a **Cat Management System** to help us.

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

</body>
</html>
```

Inside our body, let's tell Angular where we want our app to live. We do this using an attribute called `ng-app`. "ng-app means anything inside this tag belongs to the app."

```html
<div ng-app>

  <h1>Our Cat Cafe</h1>

</div>
```

Now we need to X. How do we do that?

## Data Binding

(without controllers yet, just {{2 + 2}})

Now we need something to manage this state. How do we do that?

## Controllers

## Where to go from here

- [egghead.io AngularJS tutorials](https://egghead.io/technologies/angularjs)
