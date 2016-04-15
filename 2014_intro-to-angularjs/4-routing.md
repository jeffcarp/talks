## Routing with ngRoute

Now we're going to build another page for taking drink orders. Originally you could do this with Angular's built-in routing utility but it has since been moved into an external module, so we need to use an external library. Let's add it in between our Angular and `app.js` script tags.

```
<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.15/angular-route.min.js"></script>
```

Now we need to add it to our model includes.

```
window.app = angular.module('app', ['ngRoute'])
```

Our first route definition will be the page we were working on. In the process, we'll break out the template we were working on into a separate file.

```
.config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      controller: 'homeCtrl',
      templateUrl: 'home.html'
    })

})
```

Before this works, we need to do 2 more things. First, we need to move our template into `home.html`, as we specified in our `$routeProvider`.

```
<h2>Regular price: ${{price}}</h2>

<h2>Today's discounted price is ${{discountedPrice()}}</h2>

<div ng-repeat="cat in cats" class="cat">
  <div>
    <img src="http://placekitten.com/180/180" />
  </div>
  {{cat.name}}
</div>
```

In order for Angular to know where to insert `home.html`, we need to use a directive called `ng-view`. Wherever you put `ng-view` is where the current template will be rendered.

```
<div id="container">
  <h1>SF Cat Cafe</h1>

  <ng-view></ng-view>
</div>
```

Now that we have one route set up and working, let's add our drink ordering route. First, let's add a navigation section below our header so we can access it.

```
<nav>
  <a href="/">Home</a>
  <a href="/orders">Orders</a>
</nav>
```

Now we'll add another rule to our `$routeProvider`.

```
.when('/orders', {
  controller: 'ordersCtrl',
  templateUrl: 'orders.html'
})
```

Now since we specified two things, `ordersCtrl` and `orders.html`, that don't exist yet, let's create those. In `app.js`, we'll create a stub controller.

```
.controller('ordersCtrl', function($scope) {
  console.log('ordersCtrl');
})
```

And we'll create a new file called `orders.html` and put just a header in it for now.

```
<h1>Orders</h1>
```

Now we can go to the site and navigate between pages. If we weren't using `$locationProvider.html5Mode(true)`, Angular would use a hashbang for navigation. The back button should also work as expected.

So far we've covered everything in the MVC model except for M, so let's do that.

Next: [Models](5-models.md)


