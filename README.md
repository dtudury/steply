#Steply

***.all is broken right now*** and rather than fix it I'm editing the readme... momma's don't let your babies grow up to be cowboy-developers

*asynchronous promise-like function sequencing for dummies* (like me)

this is ***very much*** a 0.x project. I write examples instead of tests, I document features I'm still in the process of implementing (and really, I only document at all as a brain-storming exercise), I knowingly push broken code, and I change my mind about what this project even is for daily... when that's no longer true I'll replace this terrifying paragraph with some salesy piece about how much better food tastes with this module in your project (and I'll move to 1.x)

[![Build Status](https://travis-ci.org/dtudury/steply.png)](https://travis-ci.org/dtudury/steply)

##Installation

    $ npm install steply

##Documentation

[API is roughly 20% done](//github.com/dtudury/steply/wiki/Steply) and the [code](//github.com/dtudury/steply/tree/master/lib) is **fairly** legible (says the dev who wrote it...;)

##Overview

Promises are awesome, I love promises... but I'm not an academic and *sometimes* I'd find myself having naive thoughts like "I **just** want to call a() and then when that's done, b()"...  or I'd find myself reading wikipedia pages on monads when all I really wanted was to call the next custom function with values calculated in the current custom function.

~~Basically~~ when the **Stepper** executes a method it returns its self.  every method called on **Stepper** is used to create a list of functions to be sequenced.  there are 5 basic **Stepper** methods:

- set the next function
- set the next arguments
- set the next target (the `this` the next function will use)
- push the current-next function+arguments+target to the stack of **steps**
- set and push an error handler to the stack
- The additional methods are *combination* methods which are attempts to expressively solve common use cases

Once the Stepper is chain called to setup the **steps** the stack is executed

- stacks are created for functions, arguments, and targets
- if a **Step** has a function, arguments, or target defined it is pushed onto its respective stack
- the top function, arguments, and target are combined and executed
- if there is no result, the next **Step** is run
- if there is a normal result, it's pushed onto the arguments stack, the next **Step** is run
- if the result is a **StepPauser** then we're dealing with an asynchronous method and we setup a *continue* method on the returned **StepPauser**
- when the async method is complete, it should call the *continue* method with any results. those results are appended to the arguments stack and the next **Step** is run


##Core Methods




###execute, exec, x

calling `exec()` will push any targets, functions, and arguments to their respective stacks (hopefully that will make sense later)

can also be passed a function or an array to be used for the current step




###setFunction, fun, f

sets the function to be pushed onto the list of steps
```js

Stepply().fun(foo).exec() //execute foo
         .fun(bar).exec(); //once foo is done, execute bar

function foo() {...}
function bar() {...}
```




###setArguments, args, a

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




###setThis, obj, t

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




###setErrorHandler, err, e

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
