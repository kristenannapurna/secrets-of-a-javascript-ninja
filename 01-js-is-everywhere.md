# Chapter 1: JavaScript is Everywhere

Key Takeaways:

* the core language features of JS
* core items of a JS engine
* 3 best practices in JS development

## 1.1 Understanding the JavaScript Language

### What makes JavaScript Unique?

On the surface, JavaScript bears resemblance to other programming languages like C# and Java, but has some pretty big differences.

JavaScript is much more _functionally_ oriented.
Some things that are more unique to JavaScript:

* **_Functions are first class objects_**. Functions can be created through literals, referenced by variables, passed as function arguments, and returned as function values.

* **_Function Closures_**. A function becomes a "closure" when it maintaines (or closes over) the external variables used in it's body. A function can "remember" a variables value later on.

* **_Scopes_**. Until recently, JS didn't have block level variables and had to rely on global variables and function level variables. (the introduction of `let` and `const` changed this).

* **_Prototype-based Object Orientation_**. Many programming languages use class based object orientation. JavaScript uses prototypes. (More on this later)

Some things that JavaScript has in common with other languages:

* **_Generators_**. Functions that can generate multiple values. (again, more on this later)

* **_Promises_**. Give us control over asynchronous code

* **_Proxies_**. Allow us to control access to certain objects

* **_Advanced Array Methods_**. Methods that make array-handilng code more elegant.

* **_Maps_**. Create dictionary collections and sets, so that we can deal with collections of unique items

* **_Regular Expressions_**

* **_Modules_**

### How will JavaScript Evolve?

ES7/ES2016 has been finalized recently. It's a small upgrade in comparison to ES6.

Since browser support varies depending on features, transpiling your JavaScript will allow you to use the new stuff right away!

Today's most popular transpilers are **_Traceur_** and **_Babel_**.

## 1.2 Understanding the browser

JS can be executed in many envrionment but it started in the browser.

Some definitions:

* **The Document Object Model (DOM)**: The DOM is a representation of the UI of a client side web app or website. It's initially built from the HTML markup.

* **Events**: Most JS applications are _event-driven_ applications, meaning that the code waits for some sort of event to be executed (network events, timers, user-generated events like clicks and scrolls)

* **Browser API**: The browser itself offers an API that allows us to get info about devices, store data locally, and communicate with remote servers.

Browsers are not all built the same - they all have some bugs,missing APIs, and quirks that need to be dealt with. (An upcoming chapter will talk about browser support)

## 1.3 Using Best Practices

The book identifies 3 things that contribute to "Mastery" of the JavaScript language.

### 1. Debugging Skills

Every broswer offers dev tools that can be used to help debug JS applications.

### 2. Testing

For testing, this book makes use of a custom `assert` function which is used to test if a premise is `true` or `false`. It looks like this:

```javascript
assert(condition, message);
```

The first parameter is a condition that should be true, and the second is a message that will be displayed if it is not true.

```javascript
assert(a === 1, "Disaster! a is not 1!");
```

There is also a built in method called `console.assert()` which works in the same way.

```javascript
console.assert(false, "this assertion failed");
```

The message is only logged if the assertion failed.

### 3. Performance Analysis

JavaScript engines are pretty good at optimizing our code for us, but there are things that we can do to optimize our code ourselves. The book will make use of the `console.time()` method to collect information about code performance.

```javascript
// starts the timer
console.time("My Operation");

for (var n = 0; n < maxCount; n++) {
  // perform the operation to be measured
}

// stops the timer
console.timeEnd("My operation");
```

The `console.time()` method starts a timer with a name that you give it. Because a single operation executes too quickly to measure, performing the same chunk of code many times is needed in order to get a measurable value. `console.timeEnd()` method with the same name passed in as an argument will log the time that elapsed since the timer was started.
