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

Let's look at a simple callback example in <a href="code/03/01-simple-callback-example.html">`code/03/01-simple-callback-example.html`</a>.

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

_A Ninja Solution:_ use function properties <a href="code/03/02-collection-of-unique-functions.html">`code/03/02-collection-of-unique-functions.js`</a>

#### 3.2.2 Self-memoizing functions

**Memoization** is the process of building a function that is capable of remembering it's previously computed values. Whenever a function computes it's result, we store that result alongside the function's arguments.

Why bother? When another invocation of the function occurs for the same set of arguments, we can return the previously stored result instead of running all the calculations over again (a performance win)!

Memoization is helpful performance wise particularly when:

- performing calculations for animations
- searching data that doesn't change often
- time consuming math

In <a href="code/03/03-memoizing-previously-computed-values.html">`code/03/03-memoizing-previously-computed-values.html`</a> we will look at an example for computing prime numbers.

### 3.3 Defining Functions

A few ways to define functions in JavaScript:

- **Function declarations** and **Function expressions** - the two most common but subtly different ways of defining functions.

```javascript
// function definition
function myFun() {
  return 1;
}
```

- **Arrow functions** New to ES6, (often called _lambda functions_) - reduce syntactic clutter and solve common callback problems (more on this later):

```javascript
// arrow function
myArg => myArg * 2;
```

- **Function constructors** - a less often used way of defining functions that enables us to dynamically construct a new function from a string that can also be dynamically generated. The following example creates a function with two parameters, `a` and `b` that returns the sum of those two parameters.

```javascript
//function constructor

new Function("a", "b", "return a + b");
```

- **Generator Functions** - Also new to ES6, allows us to create functions that can be exited and reentered later in the application execution while keeping the values of their variables. They can be defined using function declarations, function expressions, and function contructors.

```javascript
// generator function

function* myGen() {
  yield 1;
}
```

We'll take a look at declarations, expressions, and arrow functions now. Generator functions will be revisited in chapter 6. Function constructors are considered a corner feature of JavaScript that will be skipped.

#### 3.3.1 Function Declarations and function expressions

These are the two most common ways of defining functions in JavaScript. They are very similar but subtle differences do exist.

**Function Declarations**

The most basic way of defining a function. Every function declaration starts with a mandatory `function` keyword, followed by a mandatory function name and a list of optional comma separated paramater names enclosed within a mandatory parentheses.

The function body is enclosed within an opening and closing brace. `{}`

A function declaration must be placed on it's own as a separate JavaScript statement, but can be contained within another function or bock of code.

```javascript
// function declaration

function myFunctionName(optionalArg, optionalArg2) {
  //optional statements
  myStatement1;
  myStatement2;
}
]
```

**Function Expressions**

Functions that appear as the right side of an assignment expression are called function expressions. They are great because they allow us to define functions exactly where we need them and make our code easier to understand.

```javascript
// function expression

var myFunc = function() {};
```

For function declarations, the function name is _mandatory_, whereas for function expressions it is totally _optional_.

For function expressions, like the one above, we can use the variable name to envoke the expression. `myFunc()`

Or, if it is an argument to another function we can envoke it using the parameter name:

```javascript
function doSomething(action) {
  action();
}
```

**Immediate Functions**

Function expressions can be placed in positions where we would normally expect a function identifier.

```javascript
// Immediate call to a function expression

(function() {})(3);
```

All you need is an expression that evaluates to a function followed by a pair of function call parentheses. This is called an _Immediately invoked function expression (IFFE)_.

> Why did we need the parentheses around the function itself? The JavaScript parser needs to be able to easily differentiate between function declarations and function expressions. Without the parentheses, when it hits the function keyword it will think it is dealing with a function declaration and throw an error since no name is given. Inside of a set of parentheses, it signals to the parser that we are evaluating an expression and not a statement.

#### 3.3.2 Arrow Functions

One of the main benefits to Arrow functions is syntactic sugar: they allow us to create functions in a shorter more succinct way.

```javascript
// regular functions

var values = [3, 4, 6, 1, 6, 7, 2];

values.sort(function(value1, value2) {
  return value1 - value2;
});

// arrow functions

values.sort((value1, value2) => value1 - value2);
```

Some rules to arrow function syntax:

- arrow function definition starts with an optional comma separated list of paramater names
- If there is only one paramater, parentheses are optional
- the fat-arrow operator is mandatory, which tells the JS engine we are dealing with an arrow function
- if it is a simple function, an expression can go on the other side and will be implicitly returned
- if the body is a block of code, you need to sue the return value as normal

### 3.4 Arguments and Function parameters

The terms _argument_ and _parameter_ are often confused or used interchangably when discussing functions. Formally they are defined as such:

- _Parameters_ are variables that we list as part of a function definition
- _Arguments_ are values that we pass to the function when we invoke it.

All types of functions can have paramaters. Arguments on the other hand are linked with the invocation of the function - they are values passed to a function at the time of invocation.

When arguments are provided to a function, they are assigned to parameters in the order specified.

If we have a different number of arguments than parameters, no error is raised. The excess arguments aren't assgined to paramater names. (You still have a way to access them, we'll talk about this later).

If we have more parameters than arguments, the paramaters will be set to `undefined`.

There are two newer ES6 features that we can use to deal with parameters: _Rest_ and _default paramaters_.

#### 3.4.1 Rest Paramaters

In the following example we have a function that multiplies the first argument with the largest of the remaining arguments.

```javascript
function multiMax(first, ...remainingNumbers) {
  var sorted = remainingNumbers.sort(function(a, b) {
    return b - a;
  });

  return first * sorted[0];
}

multiMax(3, 1, 2, 3); // >> 9
```

By prefixing the last-named argument of a function with an ellipsis (...) it turns it into an array called _the rest paramaters_ which contains the remaining passed-in arguments.

In the above function, the first argument is assigned to first, and all remaining arguments are placed in a new array called remainingNumbers.

> Note: only the last function paramater can be a rest paramater.

#### 3.4.2 Default paramaters

A lot of the time, especially when building dynamic UI components, we'll want to provide our users with some defualt options. You can use a default paramater when _almost_ all function calls use the same value for a particular paramater, but not all.

```javascript
function performAction(ninja, action = "skulking") {
  return `${ninja} ${action}`;
}

performAction("Adam");
// >> 'Adam skulking'

performAction("Zoe", "sneaking");
// >> 'Zoe sneaking'
```

### 3.5 Summary

- JavaScript is a functional language.
- Functions are first class objects.
- Callback functions are functions that other code will "call back" later.
- We can take advantage of the fact that functions can have properties and use them to store additional functions as properties or create a cache (memoization).
- There are different types of functions (declaration, expression, arrow, generator)
- Arrow functions allow us to write functions in a more succinct way.
- A paramater is a variable that we list as a part of a function definition.
- An argument is a value that we pass to the function when we invoke it.
- A functions paramater list and argument list can be different lengths.
- Rest paramaters and default paramaters can be used to work with paramaters of varied lengths, and to set defaults.

### 3.6 Exercises

Refer to <a href="code/03/04-exercises.js">`code/03/04-exercises.js`</a> for my answers!

1.  In the following code snippet, which functions are callback functions?

```javascript
numbers.sort(function sortAsc(a, b) {
  return a - b;
});

function ninja() {}
ninja();

var myButton = document.getElementById("myButton");
myButton.addEventListener("click", function handleClick() {
  alert("clicked");
});
```

2.  In the following snippet, categorize functions according to their type (function declaration, function expression or arrow function)

```javascript
numbers.sort(function sortAsc(a, b) {
  return a - b;
});

numbers.sort((a, b) => b - a);

(function() {})();

function outer() {
  function inner() {}
  return inner;
}

(function() {})();

(() => "Yoshi")();
```

3.  After executing the following code snippet, what are the values of variables `samurai` and `ninja`?

```javascript
var samurai = (() => "Tomoe")();

var ninja = (() => {
  "Yoshi";
})();
```

4.  Within the body of the `test` function, what are the values of paramaters `a`, `b`, and `c` for the two function calls?

```javascript
function test(a, b, ...c) {
  /* a, b, c*/
}

test(1, 2, 3, 4, 5);

test();
```

5.  After executing the following code snippet, what are the values of the `message1` and `message2` variables?

```javascript
function getNinjaWieldingWeapon(ninja, weapon = "katana") {
  return ninja + " " + katana;
}

var message1 = getNinjaWieldingWeapon("Yoshi");
var message2 = getNinjaWieldingWeapon("Yoshi", "wakizashi");
```

### Further Reading

<a href="http://ryanchristiani.com/functions-as-first-class-citizens-in-javascript/">Functions as First Class Citizens in JavaScript</a>
<a href="https://notes.hackeryou.com/lesson/59237d393de2047c06531b20/5ac38e019f86d2f20b0e6474">How do callbacks work</a>