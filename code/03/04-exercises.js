// QUESTION 1. In the following code snippet, which functions are callback functions?

numbers.sort(function sortAsc(a, b) {
  return a - b;
});

function ninja() {}
ninja();

var myButton = document.getElementById("myButton");
myButton.addEventListener("click", function handleClick() {
  alert("clicked");
});

// sortAsc and handleClick are callback functions.

// ***************************
// QUESTION 2. In the following snippet, categorize functions according to their type (function declaration, function expression or arrow function)

// the callback is a named function expression
numbers.sort(function sortAsc(a, b) {
  return a - b;
});

// the callback is an arrow function
numbers.sort((a, b) => b - a);

// this is an immediately invoked function expression
(function() {})();

// this is a function definition inside a function definition
function outer() {
  function inner() {}
  return inner;
}

// this is an immediately envoked function expression
// ( function(){}());

// this is an immediately envoked arrow function
(() => "Yoshi")();

// ***************************
// QUESTION 3. After executing the following code snippet, what are the values of variables `samurai` and `ninja`?

var samurai = (() => "Tomoe")();
// >> 'Tomoe'  - the value of the return expression

var ninja = (() => {
  "Yoshi";
})();
// >> undefined, there is no return statement in the block

// ***************************
// QUESTION 4. Within the body of the `test` function, what are the values of paramaters `a`, `b`, and `c` for the two function calls?

function test(a, b, ...c) {
  /* a, b, c*/
}

test(1, 2, 3, 4, 5);
// a = 1, b = 2, c = [3, 4, 5]

test();
// a = undefined, b = undefined, c = []

// ***************************
// QUESTION 5. After executing the following code snippet, what are the values of the `message1` and `message2` variables?

function getNinjaWieldingWeapon(ninja, weapon = "katana") {
  return ninja + " " + katana;
}

var message1 = getNinjaWieldingWeapon("Yoshi");
// message1 = 'Yoshi katana'

var message2 = getNinjaWieldingWeapon("Yoshi", "wakizashi");
// message2 = 'Yoshi wakizashi'
