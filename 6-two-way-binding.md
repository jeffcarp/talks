## Two-way binding

This topic is usually covered at the beginning of a lot of Angular talks. The structure of this talk naturally led to putting it here after we already established a model, but if it's seems like something that should be covered earlier feel free to submit an issue or a PR.

In order to add new orders, we're going to use an input element and use Angular's two-way binding to sync it up with our scope. Usually when we're using `$scope` to confer data from our model to our template, it's a one way relationship.

`$scope.foo = 'bar';` >>>> `<span>{{foo}}</span>`

Two-way binding simply goes both ways. Any change in the controller will be updated in the template, and any change in the template will be updated in the controller. This necessarily means that two-way binding is limited only to elements in the template that allow users to change their value, like an `<input>` or a `<textarea>`. We indicate this in the template by using the `ng-model=""` attribute on the input or textarea.

`$scope.foo = 'bar';` <--> `<input type="text" ng-model="foo" />`

In our Cat Cafe application, we're going to utilize two-way binding to allow users to order drinks. We'll have an input that takes their order, and when they press 'order' we'll add it to the orders model, which will then update the template. First, let's add the string that will be bound in our `ordersHtml`.

```
$scope.newOrder = '';
```

And in `orders.html`.

```
<input
  type="text"
  ng-model="newOrder"
  placeholder="Your order"
  />
```

Note: I sometimes use weird indentation for HTML elements. Please disregard if it does not suit your style.

In terms of CSS, we may want to add a declaration in `style.css` just to make it flow with the page better.

```css
input[type=text] {
  width: 100%;
  font-size: 16px;
  padding: 0.2em;
}
```

Right now we don't have a way of adding new orders to our Orders service. Let's add a method to `Orders` for that.

```
Orders.add = function(newOrder) {
  _orders.push(newOrder);
  return newOrder;
};
```

Let's place a simple button below our input to trigger the controller method we're about to write.

```
<button
  ng-click="placeOrder()"
  >Place Order</button>
```

And the corresponding controller method that adds the order and nulls out the scope variable.

```
$scope.placeOrder = function() {
  Orders.add($scope.newOrder);
  $scope.newOrder = '';
};
```

Now, if you've installed the AngularJS Batarang, crack it open and type some stuff into the input so you can see your scope change. Press the button and watch how our controller method does what we wrote it to do. In the case of building real forms, you'll probably want to use a form tag so that you can use the `ng-submit` directive, which will, among other things, allow you to press the enter key to submit the form. So let's make our baby form into a real form.

```
<form
  name="orderForm"
  ng-submit="placeOrder()">

  <input
    type="text"
    ng-model="newOrder"
    placeholder="Your order"
    />

  <input
    type="submit"
    value="Place Order"
    />
</form>
```

With this, we can add blank orders. In order to stop that, we can either add the HTML5 `required` attribute to our input, or we can use `ng-required`, which can be triggered conditionally. We'll use the Angular one so we can demonstrate form validation.

```
<input
  type="text"
  ng-model="newOrder"
  placeholder="Your order"
  ng-required="true"
  />
```

Now we'll validate the form in our controller method. Anytime we use the `<form>` tag in Angular, we're using a directive. Directives are the superset of HTML we were talking about before. This demonstrates how you can write Angular directives that directly modify the behavior of built-in HTML elements. Whenever you use the `<form>` tag and assign a `name=""` attribute to it, that name gets added to the current `$scope` so you can access your form (in our case, it will be `$scope.orderForm`. We'll access our form in order to see if it's valid or not. Right now the only thing that determines whether our form is valid is the `ng-required` that we added.

```
$scope.placeOrder = function() {
  if ($scope.orderForm.$invalid) {
    return alert('Please fill in your order');
  }
  Order.add($scope.newOrder);
  $scope.newOrder = '';
};
```

Next: [Filters](7-filters.md)
