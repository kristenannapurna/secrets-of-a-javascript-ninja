# Chapter 2: Building the page at runtime

## This chapter covers:

* steps in the lifecycle of a web application
* processing HTML to produce a web page
* order of executing JavaScript code
* Achieving interactivity with events
* the event loop

### 2.1 The Lifecycle Overview

The lifecycle of a web app has two steps: _page building_ and _event handling_.

![The lifecycle of a client web application](https://dpzbhybb2pdcj.cloudfront.net/maras/Figures/02fig01_alt.jpg)

1.  User enters a URL or clicks a link. On behalf of the user, the browser formulates a request that is sent to a server.
2.  The server processes the request.
3.  THe server sends a response that is normally composed of HTML, CSS & JS.
4.  The browser recieves the respons and starts building the page / sets up the user interface.
5.  Event loop begins / page is monitored for events, processing them one at a time.
6.  Upon user interaction with the page, event handlers are invoked.
7.  The user leaves the web page.

Let's jump to `code/02/reacting-to-events/` to look at an example.

### 2.2 The page-building phase

Building the web page comes in 2 distinct phases:

1.  Parsing the HTML and building the DOM
2.  Executing the JavaScript code.

The broswer can switch between these steps as many times as necessary.

#### Parsing the HTML / Building the DOM

The HTML the server sends back is used as a base on top of which the browser builds the page UI. It goes through each HTML element, one at a time, building the DOM (a structural representation of the HTML where each element is represeted as a `node`).

![](https://dpzbhybb2pdcj.cloudfront.net/maras/Figures/02fig04_alt.jpg)

* Each node except for the first one `html` has one parent.
* A node can have any number of children
* children of the same element are called _siblings_

> You can think of the HTML code as a _blueprint_ the browser follows when constructing the initial DOM of the page.

The browser can fix problems it finds in the HTML in order to create a valid DOM (for example, body elements are accidently placed in the head tags).

#### Executing JavaScript Code

Any code found in the `<script>` element is executed by the browser's JavaScript engine:

```
Firefox - Spidermonkey
Chrome / Opera - V8
Edge / IE - Chakra
```

In order for these engines to manipulate and modify the web page, the browsers provide an API that gives them access to a global object - the `window` object. This is the one object which all other global objects and variables and browser APIs are accessible.

One of the most important properties of the `window` object is the `document` object which represents the DOM of the current page.

Through the `document` object, we can use JavaScript to make all sorts of modifications to elements.

##### Global Code vs. Function Code

These two code types differ in their execution.

**global code**

* Global code is code placed _outside_ a function.
* Global code is executed automatically by the JS engine, line by line, as it is encountered

**function code**

* Function code is code placed _inside_ a function.
* function code, in order to be executed, needs to be called by something else (either global code or some other function, or the browser itself)

Let's jump back to `code/02/reacting-to-events/` to identify what is _function code_ and what is _global code_ in the example.

As the browser reaches the `script` node in the page-building phase, it pauses DOM construction and executes the JavaScript code instead.

In our code example, if we wanted to select the `ul#second` in the first set of script tags, it wouldn't work, because that element doesn't yet exist. (This is why script tags are normally put at the bottom of the page).

Once it hits the end of the first script tag, it switches back to building the DOM nodes.

During this process and for the whole lifecycle of the page, the global `window` object is accessible - so in the second script tag, we are able to access global functions and variables that were created earlier.

Once there are no more HTML elements to process, page building is complete - and the browser moves on to event handling.

### Event Handling

#### Event Handling Overview

The browser environment is what's called a _single threaded execution model_. Only one single piece of code can be executed at once.

**The Event Queue**

![](https://dpzbhybb2pdcj.cloudfront.net/maras/Figures/02fig08_alt.jpg)

All events (whether user generated or server generated like ajax) are placed in this queue in the order they are detected.

The event queue follows this protocol:

1.  The browser checks what's at the front of the event queue.
2.  If there are no events, it keeps checking.
3.  If there is an event, the browser executes the associated handler, if one exists.

_Important note: the mechanism that takes events and puts them **onto** the queue is separate from the thread that is handling events._

#### Events are Asynchronous

We can't predict when events will occur, and in what order. Events can include:

* Browser events
  * when a page finishes loading
* User events
  * mouse clicks
  * mouse moves
  * key presses
* Network events
  * Ajax resopnses
* Timer events
  * setTimeout
  * setInterval

The majority of our code is executed as the result of some event, so understanding this process is pretty important.

#### Registering Event Handlers

We have to let the browser know that we're interested in certain events. In client side applications, we can do this in two ways:

1.  Assigning functions to special properties

```javascript
window.onload = function() {};

document.body.onclick = function() {};
```

The drawback of the above is that it's only possible to register one function handler for a particular event.

2.  Using the built in `addEventListener` method

```javascript
document.body.addEventListener("mousemove", function() {});

document.body.addEventListener();
```

### Exercises (Hover to see my answer!)

1.  <a title="Parsing HTML/Building the DOM and Executing JavaScript Code.">What are the two phases of the lifecycle of a client side web application?</a>

2.  <a title="You can register multiple function handlers to the same event if you use the addEventListener method.">What is the main advantage of using the `addEventListener` method to register an event handler versus assigning a handler to a specific element property?</a>

3.  <a href="#" title="Only one event can be processed at a time.">How many events can be processed at once?<a>

4.  <a title = "The events are processed in the order that the broswer detects them.">In waht order are events from the event queue processed? </a>

## Bonus Content

<a href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">What the heck is the event loop anyway?</a> - Philip Roberts, JSConf EU 2014 (27 min)
