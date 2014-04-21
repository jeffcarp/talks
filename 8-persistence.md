## Persistence

Going back to our orders page, we've noticed that all the orders are wiped out every time we re-load the page, since the original orders are hard coded in the model. For the purposes of this talk, we'll implement persistence using Firebase, an API-as-a-service, and AngularFire, the adapter for creating Angular apps with Firebase easily. In order to start out with AngularFire, we'll need to include two more libraries before `app.js`.

```
<script src="https://cdn.firebase.com/v0/firebase.js"></script>
<script src="https://cdn.firebase.com/libs/angularfire/0.5.0/angularfire.min.js"></script>
```

Now that the Firebase module is available, we'll need to add it to our app's module dependencies.

```
window.app = angular.module('app', ['ngRoute', 'firebase'])
```

Now we need to add a constant value that we can inject into our services and controllers with the URI of our Firebase app. We'll put this in `app.js`.

```
.value('firebaseURI', 'https://catcafe.firebaseio.com/')
```

We can delete the existing Orders service. We'll add a new one that simply creates a new instance of a Firebase model.

```
.factory('Orders', function($firebase, firebaseURI) {
  return $firebase(new Firebase(firebaseURI+'orders'));
})
```

To get our controller to work with the new Firebase service, all we need to do is assign it as if it were our previous array.

```
$scope.orders = Orders;
```

And in the same controller, we need to modify our order adding method to work with the new Firebase model. We pass the newOrder to `Orders.$add`, and also a callback for after it's been saved.

```
Orders.$add($scope.newOrder, function() {
  $scope.newOrder = '';
});
```

Now if you go back to your page, you should be able to add orders and see them persist across page loads. If you're using the firebaseURI specified above, you should already see a bunch of items that other people have added. If you want your own Firebase to play with, visit their website and paste your new URI in instead.


