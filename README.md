#Steply

asynchronous functional promises futures whatever (not sure yet)

##Installation

    $ npm install steply

##Core Methods




###execute, exec

calling `exec()` will push any targets, functions, and arguments to their respective stacks (hopefully that will make sense later)




###setFunction, fun

sets the function to be pushed onto the list of steps
```js

Stepply().fun(foo).exec() //execute foo
         .fun(bar).exec(); //once foo is done, execute bar

function foo() {...}
function bar() {...}
```




###setArguments, args

for when functions alone won't do it
```js

Stepply().args(1, 2, 3).fun(foo).exec() //execute foo(1, 2, 3)
         .args
         (4, 5, 6).exec();         //once foo is done, call it again with (4, 5, 6)

function foo(a, b, c) {...}
```




###setArgumentsArray, arr

very similar to `args`...

```js

Stepply().args([1, 2, 3]).fun(foo).exec() //execute foo(1, 2, 3)
         .args([4, 5, 6]).exec();         //once foo is done, call it again with (4, 5, 6)

function foo(a, b, c) {...}
```




###setThis, obj

set the target any functions will refer to as `this`

```js

var thing1 = {bar:"thing1's bar"};
var thing2 = {bar:"thing2's bar"};

Stepply().fun(foo)
    .obj(thing1).exec()  //logs "thing1's bar"
    .obj(thing2).exec(); //logs "thing2's bar"

function foo() {
    console.log(this.bar);
}
```




###setErrorHandler, err

set function for handling any thrown errors

```js

Stepply().fun(throwy).exec() //error thrown...
    .fun(foo).exec()         //skipped
    .fun(bar).exec()         //skipped
    .err(catchy)             //catches and handles error
    .fun(baz).exec();        //runs

function throwy() {
    throw new Error(...);
}

function catchy(error) {
    ...
}
```




##Combination Methods




###then

depending on the signature: sets target, sets arguments, sets function, and/or executes

```js

Stepply().then(target1, method1, 1, 2, 3)
         .then(target2, method2, 4, 5)

```

for more information see ... (TODO: deep dive into `then` signatures)




###log

logs the current arguments in the stack.  if it's called with an argument, the argument is used as a label

```js

Stepply().args(1, 2).log() //logs "1, 2"
         .args(3).log('a');//logs "a: 3"

```




###all

passes current arguments to every function in the paramaters.  next step is called after all functions complete

```js

Stepply().all(foo, bar, baz) // calls foo(), bar(), and baz() simultaneously
         .log("results");    // logs "results: [foo()'s results...], [bar()'s results...], [baz()'s results...]"

```




###wait

calls next step after some number of milliseconds

```js

Stepply().then(doSomething) //do something
         .wait(2000)        //do nothing for 2 seconds
         .then(doSomething) //do something again

```




###node

wrap node style function so that callbacks go to next step and errors are thrown

```js

Stepply().args("some.filepath").node(fs.stat).log(); //logs stat object for some.filepath

```




###nodeNoErr

like node, but for node functions who's callbacks don't ever error

```js

Stepply().args("some.filepath").nodeNoErr(fs.exists).log(); //logs if some.filepath exists

```




##Extending

TODO: figure out if this is something that doesn't require a pull request
