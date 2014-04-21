## Filters

Let's see how to build a simple filter. Filters are utilities that you want to use in templates and are too generalized to be controller methods. A good example of a built-in filter is the date filter:

```
<div ng-repeat="cat in cats">
  <h3>{{cat.name}}</h3>
  <p>Created: {{cat.created_at | date:'short' }}</p>
</div>
```

You use filters by piping a variable or the output of a function into it. You can pipe multiple filters together, and they are fed into each other from left to right.

Let's go back to the home page and look at our prices. There are a couple things we could improve.

- First, we always have to remember to include the dollar sign with each price, wouldn't it be nice if that could be added automatically?
- Second, there's a chance the price will be longer than 2 decimal points. We should round that automatically.

To define a custom filter, we pass our app a function that returns a function. This returned function is what the output is run through each time.

```
.filter('usd', function() {
  return function(str) {
    return '$'+Number(str).toFixed(2);
  };
})
```

Now we can change our template to reflect the utility afforded to us by our filter.

```
<h2>Regular price: {{price|usd}}</h2>

<h2>Today's discounted price is {{discountedPrice()|usd}}</h2>
```

Next: [Persistence](8-persistence.md)
