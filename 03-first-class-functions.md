# Chapter 3: First class functions for the novice: definitions and arguments

## This Chapter Covers:

- Why understanding functions is so crucial
- How functions are first-class objects
- The ways to define a function
- The secrets of how parameters are assigned

The key to writing JavaScript well is understanding it as a _functional language_.

The most important thing to understand is that functions are _first-class objects_ or _first-class citizens_ (interchangable terms). What this means is that:

- functions coexist with and can be treated like any other JavaScript object
- they can be referenced by variables
- they can be declared with literals
- they can be passed as function parameters

### 3.1 What's the functional difference?

Except for the global JavaScript code executed in the page-building phase, all of the script code we write for our pages is within a function.

\***\* what actions can we take with objects? \*\***

```javascript
// you can assign a new object to a variable
var ninja = {};

// you can add an object to an array
ninjaArray.push({});

// you can assign an object as a property of another object
ninja.data = {};

// you can pass an object as an argument to a function
function hide(ninja) {
  ninja.visibility = false;
}

hide({});

// you can return an object as a value from a function
function returnNewNinja() {
  return {};
}

// objects can possess properties that can be dynamically created and assigned
var ninja = {};
ninja.name = "Steve";
```

**Unlike** many other programming languages, you can do almost the exact same things with functions as well.

#### 3.1.1 Functions as first-class objects

Functoins in JS posess all the capabilities of objects and are treated like any other object in the language.

When we say functions are _first class_ objects, this means that we can:

```javascript
//created via literals (function definition)
function ninjaFunction() {}

//assigned to variables (function expression)
var ninjaFunction = function() {};

//added to array entries
ninjaArray.push(function() {});

// added as properties of objects (methods)
ninja.data = function() {};

// passed as arguments to other functions
function call(ninjaFunction) {
  ninjaFunction();
}

call(function() {});

//returned as values from functions
function returnNewNinjaFunction() {
  return function() {};
}

//possess properties that can be dynamically created and assigned
var ninjaFunction = function() {};
ninjaFunction.name = "Dolores";
```

So - whatever we can do with objects, we can do with functions. Functions _are_ objects, with an additional capability of being _invokable_ (called or invoked in order to perform an action).

> > **What Is Functional Programming?**
> > Functional programming is a style of programming that is focused on solving problems by composing functions. It can help us to write code that is easier to test and modularize. For further reading on functional programming concepts, check out <a href="https://www.manning.com/books/functional-programming-in-javascript">Functional Programming in Javascript bt Luis Atencio</a>.

#### 3.1.2 Callback functions

Whenver a funciton is set up to be called at a later time, whether by the browser in the event-handling phase or by other code, we are setting up a _callback_.

Let's look at a simple callback example in `code/03/01-simple-callback-example.html`.

Important takeaways:

- the `getText` function is passed to the `useless` function as an argument.
- The `useless` function can reference the `getText` function through the `callback` parameter.
- By making the `callback()` call, the `getText` function is executed.

The code could have also been written like this:

```javascript
var text = "Domo arigato!";

function useless(ninjaCallback) {
  return ninjaCallback();
}

assert(
  useless(function() {
    return text;
  }) === text,
  `The useless function works! ${text}!`
);
```

One of the key features of JavaScript is being able to create functions anywhere an expression can appear. This is great because:

- it makes code compact and easy to understand by putting functions near where they are used
- it doesn't pollute the global namespace with unnecessary names

Callbacks can also be called by the browser, like an event handler.

#### Real World Example: Array.sort()

The `sort` method that all Arrays have access to allows us to define a comparison algorithm that tells the sort algorithm how the values should be ordered.

The sort method is given access to this function as a callback, and the algorithm will call the callback whenver it needs to make a comparison.

The callback is expectd to return a positive number if the order of the passed values should be reversed, a negative number if not, and zero if the values are equal.

```javascript
var values = [0, 3, 2, 5, 7, 4, 8, 1];

values.sort(function(value1, value2) {
  return value1 - value2;
});
```

### 3.2 Fun with Functions as Objects

Something cool is that we can attach properties to functions.

```javascript
var ninja = {};

ninja.name = "Zoe";

var wieldSword = function() {};
wieldSword.swordType = "katana";
```

Because of this capability, we can do some interesting things:

- Storing functions in a collection
- Memoization

#### 3.2.1 Storing Functions

Sometimes we want to store collections of unique functions that relate to each other - like a set of callbacks that should be invoked when a certain event occurs.

_The Challenge:_ how do we determine which functions are already in the collection so duplicates aren't added?

_A Naive Solution:_ store all the functions in an array and loop through, checking for duplicates (poor performance)

_A Ninja Solution:_ use function properties `code/03/02-collection-of-unique-functions.js`

#### 3.2.2 Self-memoizing functions

**Memoization** is the process of building a function that is capable of remembering it's previously computed values. Whenever a function computes it's result, we store that result alongside the function's arguments.

Why bother? When another invocation of the function occurs for the same set of arguments, we can return the previously stored result instead of running all the calculations over again (a performance win)!

Memoization is helpful performance wise particularly when:

- performing calculations for animations
- searching data that doesn't change often
- time consuming math

In `code/03/03-memoizing-previously-computed-values.html` we will look at an example for computing prime numbers.
