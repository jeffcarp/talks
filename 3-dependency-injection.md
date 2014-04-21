## Let's talk about dependency injection

In this chapter we'll add some CSS to spruce up the styles of our currently barebones site, and while we do that we'll talk about dependency injection in Angular. First, we'll create a file `style.css` and add a reference to it in our main `index.html` file.

```
<link rel="stylesheet" type="text/css" href="style.css" />
```

And in `style.css` we'll fill out some styles.

```
body {
  background-color: #eee;
}

#container {
  background-color: white;
  padding: 1em;
  margin: 0 auto;
  max-width: 640px;
}

.cat {
  display: inline-block;
}
```

Dependency injection -- or DI -- is a powerful way of requiring modules, similar to CommonJS, Browserify, or AMD. In Angular all you need to inject a dependency is to pass it as a parameter to your controller or service.

On the previous page we saw DI in action above when we passed `$scope` into our `welcomeCtrl`. Many thing in Angular: controllers, filters, directives, services, factories, support dependency injection. We'll see more examples of this as we go on.

To make our above styles work, we'll need to add an ID to our controller.

```
<div ng-controller="homeCtrl" id="container">
```

And since no app would be complete without pictures of cats, let's add with each cat in our template (inside the `ng-repeat`).

```
<div>
  <img src="http://placekitten.com/180/180" />
</div>
```

Next: [Routing](4-routing.md)
