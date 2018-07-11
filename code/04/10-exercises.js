// 1. The following function calculates the sum of the passed-in arguments by using the `arguments` object:

// funciton sum(){
//   var sum = 0;
//   for(var i = 0; i < arguments.length; i++){
//     sum += arguments[i];
//   }
//   return sum;
// }

// By using the rest paramaters introduced in the previous chapter, rewrite the `sum` function so that it doesn't use the arguments object.

function sum(...numbers) {
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

// 2. After running the following code, what are the values of the variables `ninja` and `samurai`?

function getSamurai(samurai) {
  "use strict";

  arguments[0] = "Ishida";

  return samurai;
}

function getNinja(ninja) {
  arguments[0] = "Fuma";
  return ninja;
}

var samurai = getSamurai("Toyotomi"); // Toyotomi
var ninja = getNinja("Yoshi"); // Fuma

// 3. When running the following code, which of the assertions will pass?

function whoAmI1() {
  "use strict";
  return this;
}

function whoAmI2() {
  return this;
}

assert(whoAmI1() === window, "Window?"); // this is undefined
assert(whoAmI2() === window, "Window?"); // this is window

// 4. When runing the following code, which of the assertions will pass?

var ninja1 = {
  whoAmI: function() {
    return this;
  }
};

var ninja2 = {
  whoAmI: ninja1.whoAmI
};

var identify = ninja2.whoAmI;

assert(ninja1.whoAmI() === ninja1, "ninja1?"); // pass
assert(ninja2.whoAmI() === ninja1, "ninja1 again?"); // fail
assert(identify() === ninja1, "ninja1 again?"); // fail
assert(ninja1.whoAmI.call(ninja2) === ninja2, "ninja2 here?"); // true

// 5. When running the following code which of the assertions will pass?

function Ninja() {
  this.whoAmI = () => this;
}

var ninja1 = new Ninja();

var ninja2 = {
  whoAmI: ninja1.whoAmI
};

assert(ninja1.whoAmI() === ninja1, "ninja1 here?"); // pass
assert(ninja2.whoAmI() === ninja2, "ninja2 here?"); // fail

// 6. Which of the following assertions will pass?

function Ninja() {
  this.whoAmI = function() {
    return this;
  }.bind(this);
}

var ninja1 = new Ninja();

var ninja2 = {
  whoAmI: ninja1.whoAmI
};

assert(ninja1.whoAmI() === ninja1, "ninja1 here"); // true
assert(ninja2.whoAmI() === ninja2, "ninja2 here"); // false
