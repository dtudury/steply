#Steply

asynchronous functional promises futures whatever (not sure yet)

##Installation

    $ npm install steply

##Methods

###setFunction, fun
```js

Stepply().fun(foo).exec() //execute foo
         .fun(bar).exec(); //once foo is done, execute bar

function foo() {...};
function bar() {...};
```

###setArguments, args

for when functions alone won't do it
```js

Stepply().args(1, 2, 3).fun(foo).exec() //execute foo(1, 2, 3)
         .args(4, 5, 6).exec();         //once foo is done, call it again with (4, 5, 6)

function foo(a, b, c) {...};
```

###setArgumentsArray, arr

very similar to `args`...
```js

Stepply().args([1, 2, 3]).fun(foo).exec() //execute foo(1, 2, 3)
         .args([4, 5, 6]).exec();         //once foo is done, call it again with (4, 5, 6)

function foo(a, b, c) {...};
```

##Extending
